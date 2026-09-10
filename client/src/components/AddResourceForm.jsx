import React, { useState } from 'react'

export default function AddResourceForm({ sections, onCreate, onCreateSection }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    section: '',
    url: '',
    type: '',
    tags: '',
    file: null,
  })
  const [newSection, setNewSection] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData()
    data.append('title', form.title)
    data.append('description', form.description)
    data.append('section', form.section)
    if (form.url) data.append('url', form.url)
    if (form.type) data.append('type', form.type)
    if (form.tags) {
      const tagsArray = form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean)
      data.append('tags', JSON.stringify(tagsArray))
    }
    if (form.file) data.append('file', form.file)

    await onCreate(data)

    setForm({
      title: '',
      description: '',
      section: '',
      url: '',
      type: '',
      tags: '',
      file: null,
    })
  }

  const handleCreateSection = async () => {
    if (!newSection.trim()) return
    await onCreateSection({ name: newSection.trim() })
    setNewSection('')
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800 mb-3">Add Resource</h2>

      <div className="flex gap-2 mb-4">
        <input
          value={newSection}
          onChange={(e) => setNewSection(e.target.value)}
          placeholder="Create section (e.g., Work Docs)"
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="button"
          onClick={handleCreateSection}
          className="rounded-lg bg-slate-800 text-white px-3 py-2 text-sm hover:bg-slate-700"
        >
          Add Section
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          required
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />

        <select
          required
          value={form.section}
          onChange={(e) => setForm((prev) => ({ ...prev, section: e.target.value }))}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">Select Section</option>
          {sections.map((section) => (
            <option key={section._id} value={section._id}>
              {section.name}
            </option>
          ))}
        </select>

        <input
          placeholder="URL (for links/repos/reels)"
          value={form.url}
          onChange={(e) => setForm((prev) => ({ ...prev, url: e.target.value }))}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2"
        />

        <select
          value={form.type}
          onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">Auto Detect Type</option>
          <option value="web_link">Web Link</option>
          <option value="repository">GitHub Repository</option>
          <option value="video_reel">Video Reel</option>
          <option value="document">Document</option>
        </select>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setForm((prev) => ({ ...prev, file: e.target.files?.[0] || null }))}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />

        <input
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2 min-h-[90px]"
        />

        <button
          type="submit"
          className="md:col-span-2 rounded-lg bg-indigo-600 text-white py-2.5 text-sm font-medium hover:bg-indigo-500"
        >
          Save Resource
        </button>
      </form>
    </div>
  )
}
