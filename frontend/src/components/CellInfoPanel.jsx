const CELL_COLOR_MAP = {
  eosinophil:        'from-pink-50 to-rose-50 border-pink-200',
  erythrocyte:       'from-red-50 to-rose-50 border-red-200',
  neutrophil:        'from-yellow-50 to-amber-50 border-yellow-200',
  lymphocyte:        'from-blue-50 to-indigo-50 border-blue-200',
  macrophage:        'from-purple-50 to-violet-50 border-purple-200',
  mast_cell:         'from-orange-50 to-amber-50 border-orange-200',
  hemosiderophage:   'from-amber-50 to-yellow-50 border-amber-200',
  columnar_epithelia:'from-teal-50 to-emerald-50 border-teal-200',
}

export default function CellInfoPanel({ cellType, info }) {
  const gradient = CELL_COLOR_MAP[cellType] ?? 'from-slate-50 to-gray-50 border-slate-200'

  const fields = [
    { icon: '⚙️',  label: 'Cell Function',      text: info.function },
    { icon: '🧬',  label: 'Biological Role',     text: info.biological_role },
    { icon: '🏥',  label: 'Clinical Relevance',  text: info.clinical_relevance },
  ]

  return (
    <section className={`rounded-2xl border bg-gradient-to-r ${gradient} p-6`}>
      <div className="flex items-center gap-2 mb-5">
        <span className="text-2xl">📋</span>
        <div>
          <h3 className="font-bold text-slate-800 text-lg">Cell Information Panel</h3>
          <p className="text-xs text-slate-500 capitalize">
            Detected: <span className="font-semibold">{cellType.replace(/_/g, ' ')}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {fields.map(f => (
          <div key={f.label} className="bg-white/70 backdrop-blur rounded-xl p-4 border border-white/80 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{f.icon}</span>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">{f.label}</p>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
