export default function Navbar({ onPresent, onExplain }) {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow">
            <span className="text-white text-xl">🔬</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 leading-tight">PathoVision AI</h1>
            <p className="text-xs text-blue-600 font-medium">Digital Pathology Assistant</p>
          </div>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#upload" className="hover:text-blue-600 transition-colors">Analysis</a>
          <a href="#analytics" className="hover:text-blue-600 transition-colors">Analytics</a>
          <a href="#roadmap" className="hover:text-blue-600 transition-colors">Roadmap</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <span className="hidden md:flex items-center gap-1.5 text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-200 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            AI Active
          </span>
          <button onClick={onPresent} className="btn-primary text-sm py-2 px-4">
            🎯 Present
          </button>
          <button onClick={onExplain} className="btn-secondary text-sm py-2 px-4">
            📖 Explain
          </button>
        </div>
      </div>
    </nav>
  )
}
