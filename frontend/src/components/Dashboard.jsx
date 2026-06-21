const CELL_COLORS = {
  eosinophil:        'bg-pink-100 text-pink-700',
  erythrocyte:       'bg-red-100 text-red-700',
  neutrophil:        'bg-yellow-100 text-yellow-700',
  lymphocyte:        'bg-blue-100 text-blue-700',
  macrophage:        'bg-purple-100 text-purple-700',
  mast_cell:         'bg-orange-100 text-orange-700',
  hemosiderophage:   'bg-amber-100 text-amber-700',
  columnar_epithelia:'bg-teal-100 text-teal-700',
}

export default function Dashboard({ history }) {
  const totalScans    = history.length
  const avgConfidence = history.length
    ? (history.reduce((s, r) => s + r.confidence, 0) / history.length).toFixed(1)
    : 0
  const lastCell = history.at(-1)?.predicted_class ?? '—'
  const uniqueCells = new Set(history.map(r => r.predicted_class)).size

  const stats = [
    { label: 'Total Scans',      value: totalScans,         icon: '🔬', color: 'border-l-blue-500' },
    { label: 'Avg Confidence',   value: `${avgConfidence}%`, icon: '📊', color: 'border-l-green-500' },
    { label: 'Last Detection',   value: lastCell,            icon: '🧬', color: 'border-l-purple-500' },
    { label: 'Cell Types Found', value: uniqueCells,         icon: '🔭', color: 'border-l-orange-500' },
  ]

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">AI Classification Dashboard</h2>
          <p className="text-slate-500 text-sm mt-0.5">Real-time cell analysis powered by Roboflow</p>
        </div>
        <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-200 font-medium">
          Model: cell_classification-gvhkn/1
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className={`stat-card border-l-4 ${s.color}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{s.label}</p>
                <p className="text-2xl font-bold text-slate-800 mt-1 truncate">{s.value}</p>
              </div>
              <span className="text-2xl">{s.icon}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
