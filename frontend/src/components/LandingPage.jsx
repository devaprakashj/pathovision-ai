// LandingPage.jsx — PathoVision AI initial landing page for student project

const FEATURES = [
  { icon: '🔬', title: 'AI Cell Classification', desc: 'Upload any microscope image and get instant cell type predictions powered by deep learning.' },
  { icon: '📊', title: 'Confidence Analytics', desc: 'View top 3 predictions with confidence scores and visual charts for every analysis.' },
  { icon: '🧬', title: 'Cell Information', desc: 'Detailed biological role, function, and clinical relevance for every detected cell type.' },
  { icon: '📄', title: 'Cytology Report', desc: 'Auto-generate a professional pathology-style report with one click — printable too.' },
  { icon: '📈', title: 'Analytics Dashboard', desc: 'Track and visualize cell distribution across multiple scans with pie and bar charts.' },
  { icon: '🎯', title: 'Presentation Mode', desc: 'One-click demo mode built for hackathons and healthcare startup pitches.' },
]

const TEAM = [
  { name: 'Devaprakash J',    role: 'CSE (AIML) · III Year', emoji: '🤖' },
  { name: 'Ashwin Karthik',   role: 'CSE (AIML) · III Year', emoji: '💻' },
  { name: 'Barath S',         role: 'CSE (AIML) · III Year', emoji: '⚙️' },
  { name: 'Aravind',          role: 'CSE (AIML) · III Year', emoji: '🎨' },
]

const CELL_TYPES = ['columnar_epithelia','eosinophil','erythrocyte','hemosiderophage','lymphocyte','macrophage','mast_cell','neutrophil']

export default function LandingPage({ onEnter }) {
  return (
    <div className="min-h-screen bg-white text-slate-800">

      {/* ── Navbar ── */}
      <nav className="border-b border-slate-100 sticky top-0 bg-white/90 backdrop-blur z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow">
              <span className="text-white text-lg">🔬</span>
            </div>
            <span className="font-bold text-lg text-slate-800">PathoVision <span className="text-blue-600">AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#howitworks" className="hover:text-blue-600 transition-colors">How It Works</a>
            <a href="#team" className="hover:text-blue-600 transition-colors">Team</a>
          </div>
          <button onClick={onEnter} className="btn-primary text-sm py-2 px-5">
            Launch App →
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white">
        {/* background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center space-y-8">
          {/* badge */}
          <span className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-sm px-4 py-1.5 rounded-full font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Student Research Project · Roboflow + React + Flask
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            PathoVision <span className="text-blue-200">AI</span>
            <br />
            <span className="text-3xl md:text-4xl font-semibold text-white/80">Digital Pathology Assistant</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-white/75 leading-relaxed">
            An AI-powered web application that classifies microscope cell images in real-time using
            a custom-trained Roboflow model — built by students, for the future of healthcare.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onEnter}
              className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
            >
              🔬 Try the App
            </button>
            <a
              href="#howitworks"
              className="border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200"
            >
              Learn More ↓
            </a>
          </div>

          {/* Cell type pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {CELL_TYPES.map(c => (
              <span key={c} className="text-xs bg-white/10 border border-white/20 px-3 py-1 rounded-full text-white/70">
                {c.replace(/_/g,' ')}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '8', label: 'Cell Types Supported', icon: '🧬' },
            { value: '<2s', label: 'Analysis Time', icon: '⚡' },
            { value: '99%+', label: 'Top Confidence Seen', icon: '🎯' },
            { value: '100%', label: 'Open Source', icon: '🌍' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-3xl font-extrabold text-blue-600">{s.value}</div>
              <div className="text-sm text-slate-500 mt-1">{s.icon} {s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800">Everything you need</h2>
          <p className="text-slate-500 mt-2">A complete AI pathology pipeline built from scratch</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(f => (
            <div key={f.title} className="card hover:shadow-md hover:border-blue-200 transition-all duration-200 group">
              <span className="text-4xl group-hover:scale-110 transition-transform inline-block">{f.icon}</span>
              <h3 className="font-bold text-slate-800 mt-3 mb-1.5">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="howitworks" className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">How It Works</h2>
            <p className="text-slate-500 mt-2">Three simple steps to AI-powered cell analysis</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: '📤', title: 'Upload Image', desc: 'Drag & drop or select any microscope cell image (JPG, PNG, TIFF)' },
              { step: '02', icon: '🤖', title: 'AI Analyzes', desc: 'Our Roboflow-trained model classifies the cell type in under 2 seconds' },
              { step: '03', icon: '📄', title: 'Get Report', desc: 'View predictions, cell info, analytics charts, and download the cytology report' },
            ].map(s => (
              <div key={s.step} className="text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white text-2xl flex items-center justify-center mx-auto shadow-lg">
                  {s.icon}
                </div>
                <div className="text-xs font-bold text-blue-400 tracking-widest">STEP {s.step}</div>
                <h3 className="font-bold text-slate-800 text-lg">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-800">Tech Stack</h2>
          <p className="text-slate-500 mt-2">Built with modern, industry-standard tools</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { name: 'React 18', color: 'bg-cyan-50 border-cyan-200 text-cyan-700' },
            { name: 'Tailwind CSS', color: 'bg-teal-50 border-teal-200 text-teal-700' },
            { name: 'Flask', color: 'bg-slate-50 border-slate-200 text-slate-700' },
            { name: 'Roboflow API', color: 'bg-purple-50 border-purple-200 text-purple-700' },
            { name: 'Recharts', color: 'bg-blue-50 border-blue-200 text-blue-700' },
            { name: 'Python', color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
            { name: 'Vite', color: 'bg-violet-50 border-violet-200 text-violet-700' },
            { name: 'ResNet18', color: 'bg-orange-50 border-orange-200 text-orange-700' },
          ].map(t => (
            <span key={t.name} className={`px-5 py-2.5 rounded-xl border text-sm font-semibold ${t.color}`}>
              {t.name}
            </span>
          ))}
        </div>
      </section>

      {/* ── Team ── */}
      <section id="team" className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Our Team</h2>
            <p className="text-slate-500 mt-2">Students passionate about AI + Healthcare</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {TEAM.map(m => (
              <div key={m.name} className="card text-center w-48 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl mx-auto mb-3">
                  {m.emoji}
                </div>
                <p className="font-bold text-slate-800">{m.name}</p>
                <p className="text-xs text-slate-500 mt-1">{m.role}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-400 mt-8">
            <span className="font-semibold text-blue-500">
              Rajalakshmi Advanced Diagnostics &amp; Applied Radiomics (RADAR)
            </span>
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-16 text-center px-6">
        <h2 className="text-3xl font-bold mb-3">Ready to try it?</h2>
        <p className="text-white/70 mb-8 text-lg">Upload a cell image and see AI pathology in action</p>
        <button
          onClick={onEnter}
          className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 text-lg"
        >
          🔬 Launch PathoVision AI
        </button>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-100 py-6 text-center text-xs text-slate-400 space-y-1">
        <p className="font-semibold text-slate-500">Rajalakshmi Advanced Diagnostics &amp; Applied Radiomics (RADAR)</p>
        <p>© {new Date().getFullYear()} PathoVision AI · Devaprakash J · Ashwin Karthik · Barath S · Aravind · CSE (AIML) III Year</p>
        <p>For educational and research purposes only</p>
      </footer>

    </div>
  )
}
