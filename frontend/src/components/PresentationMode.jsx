import { useState } from 'react'
import UploadSection from './UploadSection'
import ResultPanel from './ResultPanel'
import CellInfoPanel from './CellInfoPanel'

const SLIDES = [
  {
    id: 'intro',
    title: 'PathoVision AI',
    subtitle: 'AI-Powered Digital Pathology Assistant',
    body: 'Classifying microscopic cells in seconds using deep learning trained on clinical cytology data.',
    emoji: '🔬',
    bg: 'from-blue-700 to-indigo-800',
  },
  {
    id: 'problem',
    title: 'The Problem',
    subtitle: 'Manual cytology is slow and scarce',
    body: 'Pathologist shortage, diagnosis delays, and human fatigue lead to diagnostic errors costing lives.',
    emoji: '⚠️',
    bg: 'from-red-600 to-rose-700',
  },
  {
    id: 'solution',
    title: 'The Solution',
    subtitle: 'Real-time AI cell classification',
    body: 'Upload a microscope image → AI identifies the cell type in under 2 seconds with confidence scores and clinical context.',
    emoji: '✅',
    bg: 'from-green-600 to-emerald-700',
  },
  {
    id: 'demo',
    title: 'Live Demo',
    subtitle: 'Try it now',
    body: null,
    emoji: '🎯',
    bg: 'from-slate-800 to-slate-900',
  },
  {
    id: 'market',
    title: 'Market Opportunity',
    subtitle: '$6.1B digital pathology market by 2030',
    body: 'CAGR 12.4% · Hospital networks · Research labs · Telemedicine platforms',
    emoji: '📈',
    bg: 'from-purple-700 to-violet-800',
  },
]

export default function PresentationMode({ onExit, result, onAnalyze, loading }) {
  const [current, setCurrent] = useState(0)
  const slide = SLIDES[current]

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-900">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-black/40 no-print">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-lg">🔬 PathoVision AI</span>
          <span className="text-slate-400 text-sm">— Presentation Mode</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 text-sm">{current + 1} / {SLIDES.length}</span>
          <button onClick={onExit} className="bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-1.5 rounded-lg transition-colors">
            ✕ Exit
          </button>
        </div>
      </div>

      {/* Slide content */}
      <div className={`flex-1 bg-gradient-to-br ${slide.bg} overflow-y-auto`}>
        {slide.id !== 'demo' ? (
          <div className="flex items-center justify-center min-h-full px-8 py-10 text-center">
            <div className="max-w-2xl space-y-6">
              <div className="text-8xl">{slide.emoji}</div>
              <h2 className="text-5xl font-bold text-white">{slide.title}</h2>
              <p className="text-2xl text-white/80 font-medium">{slide.subtitle}</p>
              <p className="text-lg text-white/60 leading-relaxed">{slide.body}</p>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-4xl mx-auto px-6 py-8 space-y-6">
            <h2 className="text-3xl font-bold text-white text-center">🎯 Live Demo</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <UploadSection onAnalyze={onAnalyze} loading={loading} error={null} />
              <ResultPanel result={result} loading={loading} />
            </div>
            {result && <CellInfoPanel cellType={result.predicted_class} info={result.cell_info} />}
          </div>
        )}
      </div>

      {/* Nav */}
      <div className="flex items-center justify-center gap-4 py-4 bg-black/40 no-print">
        <button
          disabled={current === 0}
          onClick={() => setCurrent(c => c - 1)}
          className="bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white px-6 py-2 rounded-lg transition-colors"
        >← Prev</button>

        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-white scale-125' : 'bg-white/30'}`}
            />
          ))}
        </div>

        <button
          disabled={current === SLIDES.length - 1}
          onClick={() => setCurrent(c => c + 1)}
          className="bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white px-6 py-2 rounded-lg transition-colors"
        >Next →</button>
      </div>
    </div>
  )
}
