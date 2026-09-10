import React, { useEffect, useMemo, useState } from 'react'
import AddResourceForm from '../components/AddResourceForm'
import SectionColumn from '../components/SectionColumn'
import {
  createResource,
  createSection,
  deleteResource,
  getResources,
  getSections,
} from '../api/resourceApi'

export default function Dashboard() {
  const [sections, setSections] = useState([])
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [sectionsData, resourcesData] = await Promise.all([getSections(), getResources()])
      setSections(sectionsData)
      setResources(resourcesData)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAll()
  }, [])

  const groupedBySection = useMemo(() => {
    const map = {}

    sections.forEach((section) => {
      map[section.name] = []
    })

    resources.forEach((resource) => {
      const key = resource.section?.name || 'Uncategorized'
      if (!map[key]) map[key] = []
      map[key].push(resource)
    })

    return map
  }, [sections, resources])

  const onCreateResource = async (formData) => {
    await createResource(formData)
    await fetchAll()
  }

  const onCreateSection = async (payload) => {
    await createSection(payload)
    await fetchAll()
  }

  const onDeleteResource = async (id) => {
    await deleteResource(id)
    await fetchAll()
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Personal Resource Organizer</h1>
        <p className="text-slate-500 mt-1">Save links, documents, GitHub repos, and video reels by section.</p>
      </header>

      <div className="mb-6">
        <AddResourceForm
          sections={sections}
          onCreate={onCreateResource}
          onCreateSection={onCreateSection}
        />
      </div>

      {loading ? (
        <p className="text-slate-500">Loading dashboard...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Object.entries(groupedBySection).map(([sectionName, items]) => (
            <SectionColumn
              key={sectionName}
              title={sectionName}
              items={items}
              onDelete={onDeleteResource}
            />
          ))}
        </div>
      )}
    </div>
  )
}
