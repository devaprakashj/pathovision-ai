import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts'

const COLORS = ['#3b82f6','#ef4444','#f59e0b','#8b5cf6','#10b981','#f97316','#ec4899','#14b8a6']

function buildDistribution(history) {
  const counts = {}
  history.forEach(r => {
    counts[r.predicted_class] = (counts[r.predicted_class] ?? 0) + 1
  })
  return Object.entries(counts).map(([name, value]) => ({ name: name.replace(/_/g,' '), value }))
}

export default function AnalyticsDashboard({ history }) {
  const data = buildDistribution(history)

  return (
    <section id="analytics" className="card space-y-6">
      <div className="flex items-center gap-2">
        <span className="text-2xl">📊</span>
        <div>
          <h3 className="font-bold text-slate-800 text-lg">Cell Analytics Dashboard</h3>
          <p className="text-xs text-slate-500">Distribution across {history.length} scan{history.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie chart */}
        <div>
          <p className="text-sm font-semibold text-slate-600 mb-3">Cell Distribution (Pie)</p>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent*100).toFixed(0)}%`} labelLine={false}>
                {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar chart */}
        <div>
          <p className="text-sm font-semibold text-slate-600 mb-3">Cell Count (Bar)</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 50 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-35} textAnchor="end" interval={0} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" radius={[6,6,0,0]}>
                {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Distribution table */}
      <div className="border-t border-slate-100 pt-4">
        <p className="text-sm font-semibold text-slate-600 mb-3">Cell Distribution Summary</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {data.map((d, i) => (
            <div key={d.name} className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
              <span className="text-xs text-slate-600 capitalize truncate">{d.name}</span>
              <span className="text-xs font-bold text-slate-800 ml-auto">{d.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
