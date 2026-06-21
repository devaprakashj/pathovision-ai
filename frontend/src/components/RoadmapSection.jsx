const ROADMAP = [
  {
    icon: '🔭',
    title: 'Whole Slide Imaging',
    desc: 'Gigapixel WSI support with automatic region of interest detection across entire tissue sections.',
    status: 'Planned',
    statusColor: 'bg-slate-100 text-slate-600',
  },
  {
    icon: '🗺️',
    title: 'Cell Mapping',
    desc: 'Spatial distribution maps of cell populations across tissue slides with density visualization.',
    status: 'In Design',
    statusColor: 'bg-blue-100 text-blue-600',
  },
  {
    icon: '🔥',
    title: 'AI Heatmaps',
    desc: 'Grad-CAM attention heatmaps highlighting the exact morphological features driving each prediction.',
    status: 'In Design',
    statusColor: 'bg-blue-100 text-blue-600',
  },
  {
    icon: '🩺',
    title: 'Pathologist Copilot',
    desc: 'AI assistant that assists pathologists with second opinions, anomaly flagging, and report drafting.',
    status: 'Research',
    statusColor: 'bg-purple-100 text-purple-600',
  },
  {
    icon: '🎓',
    title: 'Education Platform',
    desc: 'Interactive cytology atlas and quiz module for medical students and lab technicians.',
    status: 'Planned',
    statusColor: 'bg-slate-100 text-slate-600',
  },
]

export default function RoadmapSection() {
  return (
    <section id="roadmap" className="card space-y-5">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🚀</span>
        <div>
          <h3 className="font-bold text-slate-800 text-lg">Future Digital Pathology</h3>
          <p className="text-xs text-slate-500">Product roadmap — PathoVision AI vision</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ROADMAP.map(item => (
          <div key={item.title} className="bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 rounded-xl p-5 transition-all duration-200 group">
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${item.statusColor}`}>{item.status}</span>
            </div>
            <h4 className="font-bold text-slate-800 mb-1.5">{item.title}</h4>
            <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
