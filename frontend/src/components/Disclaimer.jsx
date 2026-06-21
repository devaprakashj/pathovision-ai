export default function Disclaimer() {
  return (
    <footer className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-4 items-start">
      <span className="text-3xl flex-shrink-0">⚠️</span>
      <div>
        <p className="font-bold text-amber-800 mb-1">Medical Disclaimer</p>
        <p className="text-sm text-amber-700 leading-relaxed">
          PathoVision AI is intended <strong>exclusively for educational and research purposes</strong>. 
          It does not replace professional medical diagnosis, clinical judgment, or the expertise of a 
          licensed pathologist. All AI-generated predictions must be reviewed and verified by a qualified 
          healthcare professional before any clinical decision is made. Do not use this tool for 
          patient care without appropriate oversight.
        </p>
        <p className="text-xs text-amber-500 mt-2">
          © {new Date().getFullYear()} PathoVision AI · Model: cell_classification-gvhkn/1 · Powered by Roboflow
        </p>
      </div>
    </footer>
  )
}
