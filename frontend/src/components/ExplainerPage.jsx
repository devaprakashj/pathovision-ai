// ExplainerPage.jsx — Animated A-to-Z project explanation with sample images
import { useState, useEffect, useRef } from 'react'

const SLIDES = [
  {
    id: 'title',
    type: 'hero',
    title: 'PathoVision AI',
    subtitle: 'An AI-Powered Digital Pathology Assistant',
    body: 'A complete end-to-end system that classifies microscope cell images in real-time using deep learning — built by students, for the future of healthcare.',
    emoji: '🔬',
    bg: 'from-blue-700 via-blue-600 to-indigo-700',
  },
  {
    id: 'problem',
    type: 'points',
    title: 'The Problem We Are Solving',
    emoji: '⚠️',
    bg: 'from-red-600 to-rose-700',
    points: [
      { icon: '🏥', text: 'India has only 1 pathologist per 2 lakh population — a critical shortage' },
      { icon: '⏳', text: 'Manual cell identification under a microscope takes hours of expert time' },
      { icon: '❌', text: 'Human fatigue and subjectivity can lead to diagnostic errors' },
      { icon: '🌏', text: 'Rural hospitals have no access to trained pathologists at all' },
    ],
  },
  {
    id: 'solution',
    type: 'points',
    title: 'Our Solution',
    emoji: '✅',
    bg: 'from-green-600 to-emerald-700',
    points: [
      { icon: '🤖', text: 'AI model trained on 23,493 clinical cell images identifies cell type automatically' },
      { icon: '⚡', text: 'Results delivered in under 2 seconds — from image upload to full report' },
      { icon: '🌐', text: 'Browser-based — works on any device, no hardware required' },
      { icon: '📄', text: 'Auto-generates a professional cytology report with clinical recommendations' },
    ],
  },
  {
    id: 'dataset',
    type: 'dataset',
    title: 'Our Dataset',
    subtitle: '23,493 Annotated Cell Images · 8 Cell Types · Sourced from Roboflow Universe (Equine Cytology)',
    emoji: '🗄️',
    bg: 'from-slate-700 to-slate-800',
    data: [
      { name: 'Macrophage',          count: 7345, color: '#8b5cf6', pct: 100 },
      { name: 'Lymphocyte',          count: 5050, color: '#3b82f6', pct: 69 },
      { name: 'Erythrocyte',         count: 4389, color: '#ef4444', pct: 60 },
      { name: 'Junk / Debris',       count: 2482, color: '#64748b', pct: 34 },
      { name: 'Hemosiderophage',     count: 1496, color: '#f59e0b', pct: 20 },
      { name: 'Neutrophil',          count: 1427, color: '#eab308', pct: 19 },
      { name: 'Mast Cell',           count: 940,  color: '#f97316', pct: 13 },
      { name: 'Eosinophil',          count: 324,  color: '#ec4899', pct: 4  },
      { name: 'Columnar Epithelia',  count: 40,   color: '#14b8a6', pct: 1  },
    ],
  },
  {
    id: 'cells',
    type: 'cells',
    title: 'Cell Types We Classify',
    subtitle: 'Each cell type has unique morphology, biological role, and clinical significance',
    emoji: '🧬',
    bg: 'from-indigo-700 to-violet-700',
    cells: [
      { name: 'Eosinophil',         img: '/samples/eosinophil.jpg',         role: 'Allergic & parasitic response' },
      { name: 'Erythrocyte',        img: '/samples/erythrocyte.jpg',        role: 'Oxygen transport (RBC)' },
      { name: 'Hemosiderophage',    img: '/samples/hemosiderophage.jpg',    role: 'Iron recycling macrophage' },
      { name: 'Lymphocyte',         img: '/samples/lymphocyte.jpg',         role: 'Adaptive immunity (T & B cells)' },
      { name: 'Macrophage',         img: '/samples/macrophage.jpg',         role: 'Phagocytosis & tissue repair' },
      { name: 'Mast Cell',          img: '/samples/mast_cell.jpg',          role: 'Histamine release / allergy' },
      { name: 'Neutrophil',         img: '/samples/neutrophil.jpg',         role: 'First responder to infection' },
      { name: 'Columnar Epithelia', img: '/samples/columnar_epithelia.jpg', role: 'Gland & organ lining cells' },
    ],
  },
  {
    id: 'tech',
    type: 'tech',
    title: 'Technology Stack',
    subtitle: 'Built with modern, industry-standard tools across three layers',
    emoji: '🛠️',
    bg: 'from-cyan-700 to-blue-700',
    layers: [
      {
        label: 'Frontend',
        color: 'bg-cyan-500',
        items: ['React 18', 'Tailwind CSS', 'Vite', 'Recharts', 'Axios', 'react-dropzone'],
      },
      {
        label: 'Backend',
        color: 'bg-blue-500',
        items: ['Python 3.12', 'Flask', 'Flask-CORS', 'Pillow', 'python-dotenv'],
      },
      {
        label: 'AI / ML',
        color: 'bg-violet-500',
        items: ['Roboflow Inference API', 'PyTorch', 'ResNet18', 'torchvision', 'Roboflow Universe'],
      },
    ],
  },
  {
    id: 'flow',
    type: 'flow',
    title: 'How It Works',
    subtitle: 'End to end — image in, report out — under 2 seconds',
    emoji: '⚡',
    bg: 'from-teal-600 to-emerald-700',
    steps: [
      { icon: '📤', label: 'User uploads cell image', sub: 'Drag & drop or click to browse · JPG / PNG / TIFF' },
      { icon: '⚙️', label: 'Flask backend receives', sub: 'Resizes & converts to JPEG · base64 encodes' },
      { icon: '🤖', label: 'Roboflow AI analyzes', sub: 'cell_classification-gvhkn/1 model runs inference' },
      { icon: '📊', label: 'Predictions returned', sub: 'Cell type + confidence % + top 3 classes' },
      { icon: '📄', label: 'Report generated', sub: 'Cell info · analytics · printable cytology report' },
    ],
  },
  {
    id: 'features',
    type: 'features',
    title: 'Application Features',
    subtitle: 'A complete digital pathology pipeline in one web app',
    emoji: '✨',
    bg: 'from-orange-600 to-amber-600',
    features: [
      { icon: '🏠', title: 'Landing Page',        desc: 'Professional healthcare UI with team info and RADAR branding' },
      { icon: '📤', title: 'Image Upload',         desc: 'Drag & drop with scan animation and image preview' },
      { icon: '🎯', title: 'AI Classification',    desc: 'Predicted cell type · confidence % · top 3 predictions' },
      { icon: '🧬', title: 'Cell Info Panel',      desc: 'Biological function · role · clinical relevance per cell' },
      { icon: '📈', title: 'Analytics Dashboard',  desc: 'Pie + bar charts tracking distribution across all scans' },
      { icon: '📄', title: 'Cytology Report',      desc: 'Auto-generated printable professional pathology report' },
      { icon: '🎬', title: 'Presentation Mode',    desc: 'Full-screen pitch deck with live demo slide built in' },
    ],
  },
  {
    id: 'roadmap',
    type: 'roadmap',
    title: 'Future Roadmap',
    subtitle: 'Where PathoVision AI is headed — aligned with enterprise digital pathology',
    emoji: '🚀',
    bg: 'from-purple-700 to-violet-800',
    items: [
      { icon: '🔭', title: 'Whole Slide Imaging',   desc: 'Gigapixel WSI support — same space as Vyuhaa Spark',     status: 'Planned' },
      { icon: '🗺️', title: 'Cell Mapping',           desc: 'Spatial density maps across tissue sections',            status: 'Planned' },
      { icon: '🔥', title: 'AI Heatmaps',            desc: 'Grad-CAM attention — visualize what the model sees',     status: 'In Design' },
      { icon: '🩺', title: 'Pathologist Copilot',    desc: 'AI second opinion assistant for clinical pathologists',  status: 'Research' },
      { icon: '🎓', title: 'Education Platform',     desc: 'Cytology atlas + quiz module for medical students',      status: 'Planned' },
    ],
  },
  {
    id: 'team',
    type: 'team',
    title: 'The Team',
    subtitle: 'CSE (AIML) · III Year · RIT',
    emoji: '👨‍💻',
    bg: 'from-slate-700 to-slate-900',
    center: 'Rajalakshmi Advanced Diagnostics & Applied Radiomics (RADAR)',
    members: [
      { name: 'Devaprakash J',  emoji: '🤖' },
      { name: 'Ashwin Karthik', emoji: '💻' },
      { name: 'Barath S',       emoji: '⚙️' },
      { name: 'Aravind',        emoji: '🎨' },
    ],
  },
]

// ─── Slide renderers ───────────────────────────────────────────────────────

function HeroSlide({ slide }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8 space-y-6">
      <div className="text-8xl animate-bounce">{slide.emoji}</div>
      <h1 className="text-6xl font-extrabold text-white drop-shadow">{slide.title}</h1>
      <p className="text-2xl text-white/80 font-semibold">{slide.subtitle}</p>
      <p className="max-w-2xl text-lg text-white/60 leading-relaxed">{slide.body}</p>
      <div className="flex gap-3 flex-wrap justify-center mt-4">
        {['23,493 Images','8 Cell Types','React + Flask','Roboflow AI','<2s Analysis'].map(t => (
          <span key={t} className="bg-white/15 border border-white/25 text-white text-sm px-4 py-1.5 rounded-full">{t}</span>
        ))}
      </div>
    </div>
  )
}

function PointsSlide({ slide }) {
  const [visible, setVisible] = useState([])
  useEffect(() => {
    slide.points.forEach((_, i) => {
      setTimeout(() => setVisible(v => [...v, i]), i * 400 + 300)
    })
  }, [slide.id])

  return (
    <div className="flex flex-col items-center justify-center h-full px-8 space-y-8">
      <div className="text-center">
        <div className="text-6xl mb-3">{slide.emoji}</div>
        <h2 className="text-4xl font-bold text-white">{slide.title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
        {slide.points.map((p, i) => (
          <div key={i} className={`bg-white/10 border border-white/20 rounded-2xl p-5 flex items-start gap-4 transition-all duration-500 ${visible.includes(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <span className="text-3xl">{p.icon}</span>
            <p className="text-white/90 text-base leading-relaxed">{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function DatasetSlide({ slide }) {
  const [animate, setAnimate] = useState(false)
  useEffect(() => { setTimeout(() => setAnimate(true), 200) }, [])

  return (
    <div className="flex flex-col h-full px-8 py-6 space-y-5 overflow-y-auto">
      <div className="text-center">
        <div className="text-5xl mb-2">{slide.emoji}</div>
        <h2 className="text-3xl font-bold text-white">{slide.title}</h2>
        <p className="text-white/60 text-sm mt-1">{slide.subtitle}</p>
      </div>
      <div className="space-y-3 max-w-2xl mx-auto w-full">
        {slide.data.map((d, i) => (
          <div key={d.name} className="flex items-center gap-3">
            <span className="text-white/70 text-sm w-36 text-right flex-shrink-0">{d.name}</span>
            <div className="flex-1 h-7 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full flex items-center pl-3 text-xs text-white font-bold transition-all duration-700"
                style={{ width: animate ? `${Math.max(d.pct, 3)}%` : '0%', background: d.color, transitionDelay: `${i * 80}ms` }}
              >
                {d.count.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-white/50 text-sm">Total: <span className="font-bold text-white">23,493</span> images · Source: Roboflow Universe (Equine Cytology Dataset)</p>
    </div>
  )
}

function CellsSlide({ slide }) {
  const [sel, setSel] = useState(null)
  return (
    <div className="flex flex-col h-full px-6 py-6 space-y-4 overflow-y-auto">
      <div className="text-center">
        <div className="text-4xl mb-1">{slide.emoji}</div>
        <h2 className="text-3xl font-bold text-white">{slide.title}</h2>
        <p className="text-white/60 text-sm">{slide.subtitle}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {slide.cells.map(c => (
          <button
            key={c.name}
            onClick={() => setSel(sel?.name === c.name ? null : c)}
            className={`rounded-2xl overflow-hidden border-2 transition-all duration-200 text-left
              ${sel?.name === c.name ? 'border-white scale-105 shadow-2xl' : 'border-white/20 hover:border-white/60'}`}
          >
            <img src={c.img} alt={c.name} className="w-full h-28 object-cover bg-black" onError={e => { e.target.style.display='none' }} />
            <div className="bg-black/40 backdrop-blur px-3 py-2">
              <p className="text-white font-semibold text-sm">{c.name}</p>
              <p className="text-white/60 text-xs">{c.role}</p>
            </div>
          </button>
        ))}
      </div>
      {sel && (
        <div className="bg-white/10 border border-white/20 rounded-2xl p-4 text-center">
          <p className="text-white font-bold text-lg">{sel.name}</p>
          <p className="text-white/70 text-sm mt-1">{sel.role}</p>
        </div>
      )}
    </div>
  )
}

function TechSlide({ slide }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8 space-y-6">
      <div className="text-center">
        <div className="text-5xl mb-2">{slide.emoji}</div>
        <h2 className="text-3xl font-bold text-white">{slide.title}</h2>
        <p className="text-white/60 text-sm mt-1">{slide.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-4xl">
        {slide.layers.map(l => (
          <div key={l.label} className="bg-white/10 border border-white/20 rounded-2xl p-5 space-y-3">
            <div className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold ${l.color}`}>{l.label}</div>
            <div className="flex flex-wrap gap-2">
              {l.items.map(item => (
                <span key={item} className="bg-white/10 border border-white/20 text-white/80 text-xs px-2.5 py-1 rounded-full">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FlowSlide({ slide }) {
  const [step, setStep] = useState(-1)
  useEffect(() => {
    slide.steps.forEach((_, i) => setTimeout(() => setStep(i), i * 600 + 400))
  }, [slide.id])

  return (
    <div className="flex flex-col items-center justify-center h-full px-8 space-y-6">
      <div className="text-center">
        <div className="text-5xl mb-2">{slide.emoji}</div>
        <h2 className="text-3xl font-bold text-white">{slide.title}</h2>
        <p className="text-white/60 text-sm">{slide.subtitle}</p>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-3 w-full max-w-4xl">
        {slide.steps.map((s, i) => (
          <div key={i} className="flex md:flex-col items-center gap-2 md:gap-1 flex-1">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all duration-500 flex-shrink-0
              ${step >= i ? 'bg-white text-slate-800 scale-110 shadow-lg' : 'bg-white/10 text-white/40'}`}>
              {s.icon}
            </div>
            {i < slide.steps.length - 1 && (
              <div className={`hidden md:block w-full h-0.5 transition-all duration-500 ${step > i ? 'bg-white' : 'bg-white/20'}`} />
            )}
            <div className={`text-center transition-all duration-500 ${step >= i ? 'opacity-100' : 'opacity-30'}`}>
              <p className="text-white text-xs font-bold">{s.label}</p>
              <p className="text-white/50 text-xs hidden md:block">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FeaturesSlide({ slide }) {
  return (
    <div className="flex flex-col h-full px-6 py-6 space-y-4 overflow-y-auto">
      <div className="text-center">
        <div className="text-4xl mb-1">{slide.emoji}</div>
        <h2 className="text-3xl font-bold text-white">{slide.title}</h2>
        <p className="text-white/60 text-sm">{slide.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto w-full">
        {slide.features.map(f => (
          <div key={f.title} className="bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl p-4 transition-all duration-200">
            <div className="text-3xl mb-2">{f.icon}</div>
            <p className="text-white font-bold mb-1">{f.title}</p>
            <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function RoadmapSlide({ slide }) {
  return (
    <div className="flex flex-col h-full px-6 py-6 space-y-4 overflow-y-auto">
      <div className="text-center">
        <div className="text-4xl mb-1">{slide.emoji}</div>
        <h2 className="text-3xl font-bold text-white">{slide.title}</h2>
        <p className="text-white/60 text-sm">{slide.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto w-full">
        {slide.items.map(item => (
          <div key={item.title} className="bg-white/10 border border-white/20 rounded-2xl p-4">
            <div className="flex items-start justify-between mb-2">
              <span className="text-3xl">{item.icon}</span>
              <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">{item.status}</span>
            </div>
            <p className="text-white font-bold mb-1">{item.title}</p>
            <p className="text-white/60 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function TeamSlide({ slide }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8 space-y-8">
      <div className="text-center">
        <div className="text-6xl mb-3">{slide.emoji}</div>
        <h2 className="text-4xl font-bold text-white">{slide.title}</h2>
        <p className="text-white/60 mt-1">{slide.subtitle}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-5">
        {slide.members.map(m => (
          <div key={m.name} className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center w-40">
            <div className="text-5xl mb-3">{m.emoji}</div>
            <p className="text-white font-bold">{m.name}</p>
          </div>
        ))}
      </div>
      <div className="text-center">
        <p className="text-white/50 text-sm">Presented at</p>
        <p className="text-white font-semibold mt-1">{slide.center}</p>
      </div>
      <a href="https://github.com/devaprakashj/pathovision-ai" target="_blank" rel="noreferrer"
        className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">
        🔗 github.com/devaprakashj/pathovision-ai
      </a>
    </div>
  )
}

function renderSlide(slide) {
  switch(slide.type) {
    case 'hero':     return <HeroSlide slide={slide} />
    case 'points':   return <PointsSlide slide={slide} />
    case 'dataset':  return <DatasetSlide slide={slide} />
    case 'cells':    return <CellsSlide slide={slide} />
    case 'tech':     return <TechSlide slide={slide} />
    case 'flow':     return <FlowSlide slide={slide} />
    case 'features': return <FeaturesSlide slide={slide} />
    case 'roadmap':  return <RoadmapSlide slide={slide} />
    case 'team':     return <TeamSlide slide={slide} />
    default:         return null
  }
}

// ─── Main ExplainerPage ────────────────────────────────────────────────────

export default function ExplainerPage({ onClose }) {
  const [current, setCurrent] = useState(0)
  const slide = SLIDES[current]

  function prev() { setCurrent(c => Math.max(0, c - 1)) }
  function next() { setCurrent(c => Math.min(SLIDES.length - 1, c + 1)) }

  // keyboard navigation
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next()
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   prev()
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current])

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-900">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-black/40 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold">🔬 PathoVision AI</span>
          <span className="text-slate-400 text-sm hidden md:block">— Project Explainer</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 text-sm">{current + 1} / {SLIDES.length}</span>
          <button onClick={onClose} className="bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-1.5 rounded-lg transition-colors">
            ✕ Close
          </button>
        </div>
      </div>

      {/* Slide */}
      <div key={slide.id} className={`flex-1 bg-gradient-to-br ${slide.bg} overflow-hidden`}>
        {renderSlide(slide)}
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-between px-6 py-3 bg-black/40 flex-shrink-0">
        <button onClick={prev} disabled={current === 0}
          className="bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white px-5 py-2 rounded-lg text-sm transition-colors">
          ← Prev
        </button>

        {/* dot indicators */}
        <div className="flex gap-1.5 flex-wrap justify-center max-w-xs">
          {SLIDES.map((s, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-200 ${i === current ? 'w-5 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60'}`}
            />
          ))}
        </div>

        <button onClick={next} disabled={current === SLIDES.length - 1}
          className="bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white px-5 py-2 rounded-lg text-sm transition-colors">
          Next →
        </button>
      </div>
    </div>
  )
}
