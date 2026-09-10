import React from 'react'
import ResourceCard from './ResourceCard'

export default function SectionColumn({ title, items, onDelete }) {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
        <span className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-600">{items.length}</span>
      </div>

      <div className="space-y-3">
        {items.map((resource) => (
          <ResourceCard key={resource._id} resource={resource} onDelete={onDelete} />
        ))}
      </div>
    </section>
  )
}
