import React from 'react'

const typeBadge = {
  web_link: 'bg-blue-100 text-blue-700',
  document: 'bg-amber-100 text-amber-700',
  repository: 'bg-emerald-100 text-emerald-700',
  video_reel: 'bg-pink-100 text-pink-700',
}

export default function ResourceCard({ resource, onDelete }) {
  return (
    <div className="rounded-xl border border-slate-200 p-3 hover:shadow-md transition bg-white">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-medium text-slate-800">{resource.title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${typeBadge[resource.type] || 'bg-slate-100 text-slate-700'}`}>
          {resource.type}
        </span>
      </div>

      {resource.description && (
        <p className="text-sm text-slate-600 mt-2">{resource.description}</p>
      )}

      <div className="mt-3 space-y-1">
        {resource.url && (
          <a
            href={resource.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-indigo-600 hover:underline break-all"
          >
            {resource.url}
          </a>
        )}

        {resource.type === 'document' && resource.file?.storedName && (
          <a
            href={`http://localhost:5000/uploads/${resource.file.storedName}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-indigo-600 hover:underline"
          >
            Open document ({resource.file.originalName})
          </a>
        )}
      </div>

      <div className="mt-3 flex justify-end">
        <button
          onClick={() => onDelete(resource._id)}
          className="text-xs text-red-600 hover:text-red-700 font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
