const CELL_DESCRIPTIONS = {
  eosinophil:        'Bilobed nucleus with large eosinophilic granules; key in allergic and parasitic responses.',
  erythrocyte:       'Biconcave anucleate disc; primary oxygen transport vehicle via hemoglobin.',
  neutrophil:        'Multi-lobed nucleus with fine granules; most abundant WBC and first infection responder.',
  lymphocyte:        'Large round nucleus; mediates humoral (B) and cell-mediated (T) adaptive immunity.',
  macrophage:        'Large phagocytic cell with irregular nucleus; tissue macrophage derived from monocytes.',
  mast_cell:         'Round cell with basophilic granules rich in histamine; key in allergic reactions.',
  hemosiderophage:   'Macrophage engorged with hemosiderin iron granules; marker of prior hemorrhage.',
  columnar_epithelia:'Tall columnar cells lining glandular and luminal surfaces; involved in secretion.',
}

const RECOMMENDATIONS = {
  eosinophil:        'Correlate with complete blood count (CBC) and clinical history for allergy or parasitic workup.',
  erythrocyte:       'Evaluate red cell morphology; consider hemoglobin and hematocrit values.',
  neutrophil:        'Assess for bacterial infection; obtain CBC with differential and culture if indicated.',
  lymphocyte:        'Correlate with clinical presentation; consider viral panel or lymphoma workup if elevated.',
  macrophage:        'Evaluate for granulomatous disease; consider TB, fungal studies or autoimmune panel.',
  mast_cell:         'Assess tryptase levels; consider referral to allergy/immunology for mastocytosis workup.',
  hemosiderophage:   'Correlate with imaging; consider BAL analysis and pulmonary consult.',
  columnar_epithelia:'Evaluate tissue origin; correlate with histopathology for adenocarcinoma exclusion.',
}

export default function CytologyReport({ result }) {
  const { predicted_class, confidence, top3, cell_info } = result
  const date = new Date().toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' })

  function handlePrint() { window.print() }

  return (
    <section className="card space-y-5" id="report">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📄</span>
          <div>
            <h3 className="font-bold text-slate-800 text-lg">AI Cytology Report</h3>
            <p className="text-xs text-slate-500">Generated: {date}</p>
          </div>
        </div>
        <button onClick={handlePrint} className="no-print btn-secondary text-sm py-2 px-4 flex items-center gap-1.5">
          🖨️ Print Report
        </button>
      </div>

      {/* Report body */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-slate-200 p-6 space-y-5">
        {/* Institution header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <p className="font-bold text-blue-700 text-lg">PathoVision AI Laboratory</p>
            <p className="text-xs text-slate-500">Digital Pathology — Automated Cell Analysis</p>
          </div>
          <div className="text-right text-xs text-slate-500">
            <p>Report ID: PV-{Date.now().toString().slice(-6)}</p>
            <p>Model: cell_classification-gvhkn/1</p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ReportField label="Primary Diagnosis" value={predicted_class.replace(/_/g,' ')} highlight />
          <ReportField label="Confidence Score" value={`${confidence}%`} highlight />
          <ReportField label="Cell Description" value={CELL_DESCRIPTIONS[predicted_class] ?? cell_info.function} />
          <ReportField label="Clinical Interpretation" value={cell_info.clinical_relevance} />
        </div>

        {/* Differential */}
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Differential Analysis</p>
          <div className="flex flex-wrap gap-2">
            {top3.map((p, i) => (
              <div key={p.class} className={`flex items-center gap-2 rounded-lg px-3 py-1.5 border text-sm
                ${i === 0 ? 'bg-blue-50 border-blue-200 text-blue-700 font-semibold' : 'bg-white border-slate-200 text-slate-600'}`}>
                <span>#{i + 1}</span>
                <span className="capitalize">{p.class.replace(/_/g,' ')}</span>
                <span className="font-bold">{p.confidence}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendation */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1">Clinical Recommendation</p>
          <p className="text-sm text-amber-800">{RECOMMENDATIONS[predicted_class] ?? 'Correlate with clinical findings.'}</p>
        </div>

        {/* Disclaimer in report */}
        <p className="text-xs text-slate-400 border-t border-slate-200 pt-3 italic">
          ⚠️ This AI-generated report is for educational and research purposes only. It does not constitute a medical diagnosis. 
          All results must be verified by a qualified pathologist.
        </p>
      </div>
    </section>
  )
}

function ReportField({ label, value, highlight }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-3">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-sm leading-relaxed capitalize ${highlight ? 'font-bold text-blue-700 text-base' : 'text-slate-700'}`}>
        {value}
      </p>
    </div>
  )
}
