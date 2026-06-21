import { useState } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import UploadSection from './components/UploadSection'
import ResultPanel from './components/ResultPanel'
import CellInfoPanel from './components/CellInfoPanel'
import AnalyticsDashboard from './components/AnalyticsDashboard'
import CytologyReport from './components/CytologyReport'
import RoadmapSection from './components/RoadmapSection'
import PresentationMode from './components/PresentationMode'
import Disclaimer from './components/Disclaimer'
import LandingPage from './components/LandingPage'
import ExplainerPage from './components/ExplainerPage'
import axios from 'axios'

export default function App() {
  const [result, setResult]           = useState(null)
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState(null)
  const [history, setHistory]         = useState([])
  const [presentMode, setPresentMode] = useState(false)
  const [showLanding, setShowLanding] = useState(true)
  const [showExplainer, setShowExplainer] = useState(false)

  async function handleAnalyze(file) {
    setLoading(true)
    setError(null)
    setResult(null)

    const formData = new FormData()
    formData.append('image', file)

    try {
      const { data } = await axios.post('/api/classify', formData)
      setResult(data)
      setHistory(prev => [...prev, data])
    } catch (err) {
      setError(err.response?.data?.error || 'Analysis failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (presentMode) {
    return <PresentationMode onExit={() => setPresentMode(false)} result={result} onAnalyze={handleAnalyze} loading={loading} />
  }

  if (showExplainer) {
    return <ExplainerPage onClose={() => setShowExplainer(false)} />
  }

  // Show landing page first
  if (showLanding) {
    return <LandingPage onEnter={() => setShowLanding(false)} />
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onPresent={() => setPresentMode(true)} onExplain={() => setShowExplainer(true)} />

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Dashboard stats */}
        <Dashboard history={history} />

        {/* Upload + Results row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UploadSection onAnalyze={handleAnalyze} loading={loading} error={error} />
          <ResultPanel result={result} loading={loading} />
        </div>

        {/* Cell info */}
        {result && <CellInfoPanel cellType={result.predicted_class} info={result.cell_info} />}

        {/* Analytics */}
        {history.length > 0 && <AnalyticsDashboard history={history} />}

        {/* Cytology report */}
        {result && <CytologyReport result={result} />}

        {/* Roadmap */}
        <RoadmapSection />

        {/* Disclaimer */}
        <Disclaimer />
      </main>
    </div>
  )
}
