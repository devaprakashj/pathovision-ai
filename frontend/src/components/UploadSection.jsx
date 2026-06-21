import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export default function UploadSection({ onAnalyze, loading, error }) {
  const [preview, setPreview] = useState(null)
  const [file, setFile]       = useState(null)

  const onDrop = useCallback(accepted => {
    const f = accepted[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.bmp', '.tiff'] },
    maxFiles: 1,
    maxSize: 20 * 1024 * 1024, // 20 MB
  })

  function handleAnalyze() {
    if (file) onAnalyze(file)
  }

  function handleReset() {
    setFile(null)
    setPreview(null)
  }

  return (
    <section id="upload" className="card space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">📤</span>
        <div>
          <h3 className="font-bold text-slate-800 text-lg">Image Upload</h3>
          <p className="text-xs text-slate-500">Upload a microscope cell image for AI analysis</p>
        </div>
      </div>

      {/* Drop zone */}
      {!preview ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50'}`}
        >
          <input {...getInputProps()} />
          <div className="text-5xl mb-3">🔬</div>
          <p className="font-semibold text-slate-700">
            {isDragActive ? 'Drop the image here' : 'Drag & drop a cell image'}
          </p>
          <p className="text-sm text-slate-400 mt-1">or click to browse — JPG, PNG, TIFF up to 20MB</p>
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden border border-slate-200">
          <img src={preview} alt="Preview" className="w-full object-contain max-h-64 bg-black" />
          {/* scan animation while loading */}
          {loading && (
            <div className="scan-overlay">
              <div className="scan-line" />
              <div className="absolute inset-0 bg-blue-900/20 flex items-center justify-center">
                <div className="bg-white/90 rounded-xl px-6 py-3 text-blue-700 font-semibold text-sm flex items-center gap-2">
                  <span className="animate-spin">⚙️</span> Analyzing cell...
                </div>
              </div>
            </div>
          )}
          <button
            onClick={handleReset}
            className="absolute top-2 right-2 bg-white/90 hover:bg-white text-slate-600 rounded-full w-8 h-8 flex items-center justify-center text-xs shadow"
          >✕</button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm flex items-center gap-2">
          <span>⚠️</span> {error}
        </div>
      )}

      {/* Analyze button */}
      <button
        onClick={handleAnalyze}
        disabled={!file || loading}
        className={`w-full btn-primary flex items-center justify-center gap-2
          ${(!file || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? (
          <><span className="animate-spin">⚙️</span> Analyzing...</>
        ) : (
          <><span>🧬</span> Analyze Cell Image</>
        )}
      </button>

      {/* Supported types */}
      <div className="border-t border-slate-100 pt-3">
        <p className="text-xs text-slate-400 font-medium mb-2">Supported cell types:</p>
        <div className="flex flex-wrap gap-1.5">
          {['columnar_epithelia','eosinophil','erythrocyte','hemosiderophage',
            'lymphocyte','macrophage','mast_cell','neutrophil'].map(c => (
            <span key={c} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{c}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
