const CELL_EMOJI = {
  eosinophil:        '🔴',
  erythrocyte:       '🩸',
  neutrophil:        '🟡',
  lymphocyte:        '🔵',
  macrophage:        '🟣',
  mast_cell:         '🟠',
  hemosiderophage:   '🟤',
  columnar_epithelia:'🟢',
}

function ConfidenceBar({ value, color = 'bg-blue-500' }) {
  return (
    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
      <div
        className={`h-full ${color} rounded-full conf-bar`}
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

function confidenceColor(v) {
  if (v >= 80) return 'text-green-600'
  if (v >= 50) return 'text-yellow-600'
  return 'text-red-500'
}

function confidenceLabel(v) {
  if (v >= 80) return { label: 'High', bg: 'bg-green-100 text-green-700 border-green-200' }
  if (v >= 50) return { label: 'Medium', bg: 'bg-yellow-100 text-yellow-700 border-yellow-200' }
  return { label: 'Low', bg: 'bg-red-100 text-red-700 border-red-200' }
}

export default function ResultPanel({ result, loading }) {
  if (loading) {
    return (
      <div className="card flex flex-col items-center justify-center min-h-64 space-y-4">
        <div className="w-16 h-16 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
        <p className="text-slate-500 font-medium">AI is analyzing the cell...</p>
        <p className="text-xs text-slate-400">Connecting to Roboflow Inference API</p>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="card flex flex-col items-center justify-center min-h-64 text-center space-y-3">
        <span className="text-6xl opacity-20">🧬</span>
        <p className="text-slate-400 font-medium">No analysis yet</p>
        <p className="text-xs text-slate-300">Upload a cell image to get started</p>
      </div>
    )
  }

  const { predicted_class, confidence, top3 } = result
  const cl = confidenceLabel(confidence)

  return (
    <section className="card space-y-5">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🧬</span>
        <div>
          <h3 className="font-bold text-slate-800 text-lg">AI Classification Result</h3>
          <p className="text-xs text-slate-500">Powered by Roboflow cell_classification-gvhkn/1</p>
        </div>
      </div>

      {/* Primary result */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{CELL_EMOJI[predicted_class] ?? '🔬'}</span>
            <div>
              <p className="text-xs text-blue-500 font-medium uppercase tracking-wide">Predicted Cell Type</p>
              <p className="font-bold text-slate-800 text-xl capitalize">{predicted_class.replace(/_/g,' ')}</p>
            </div>
          </div>
          <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${cl.bg}`}>
            {cl.label} Confidence
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1">
            <ConfidenceBar value={confidence} color="bg-blue-600" />
          </div>
          <span className={`text-2xl font-bold ${confidenceColor(confidence)}`}>{confidence}%</span>
        </div>
      </div>

      {/* Top 3 */}
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Top 3 Predictions</p>
        <div className="space-y-2.5">
          {top3.map((p, i) => (
            <div key={p.class} className="flex items-center gap-3">
              <span className="text-xs text-slate-400 w-4 font-bold">#{i + 1}</span>
              <span className="text-base">{CELL_EMOJI[p.class] ?? '🔬'}</span>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700 capitalize">{p.class.replace(/_/g,' ')}</span>
                  <span className="text-sm font-bold text-slate-600">{p.confidence}%</span>
                </div>
                <ConfidenceBar
                  value={p.confidence}
                  color={i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-blue-300' : 'bg-slate-300'}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
