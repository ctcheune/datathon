import { usePatientData } from '../usePatientData';
import TrajectoryChart from './TrajectoryChart';
import { Patient } from '../patientData';

type PatientDashboardProps = {
  patient: Patient;
  onBack: () => void;
};

export default function PatientDashboard({ patient, onBack }: PatientDashboardProps) {
  const data = usePatientData();
  const { vitals, labs, imaging, riskDrivers } = patient.clinicalSnapshot;

  function statusClass(status: 'normal' | 'watch' | 'abnormal' | 'critical') {
    return `status-${status}`;
  }

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div className="patient-info-header">
          <button onClick={onBack} className="back-button" aria-label="Back to patient list">
            {'<- Back to Census'}
          </button>
          <div className="patient-header-details">
            <h1>{patient.name}</h1>
            <div className="patient-meta">
              <span className="meta-item">{patient.mrn}</span>
              <span className="meta-separator">|</span>
              <span className="meta-item">{patient.age}y {patient.gender}</span>
              <span className="meta-separator">|</span>
              <span className="meta-item">{patient.diagnosis}</span>
              <span className="meta-separator">|</span>
              <span className="meta-item">{patient.location}</span>
            </div>
          </div>
        </div>
        <div className="status-indicator">
          <span className="status-dot"></span>
          <span>Live</span>
        </div>
      </header>

      <section className="charts-grid">
        <TrajectoryChart
          title="ICU Admission Probability"
          data={data.icuProbability}
          color="#3b82f6"
          ariaLabel="Graph showing the probability of ICU admission over time"
        />
        <TrajectoryChart
          title="Mortality Probability"
          data={data.mortalityProbability}
          color="#ef4444"
          ariaLabel="Graph showing the probability of mortality over time"
        />
        <TrajectoryChart
          title="Palliative Care Probability"
          data={data.palliativeCareProbability}
          color="#8b5cf6"
          ariaLabel="Graph showing the probability of palliative care over time"
        />
      </section>

      <section className="clinical-evidence" aria-label="Clinical evidence driving risk classification">
        <header className="section-header">
          <h2>Clinical Evidence by Risk Category</h2>
          <span className={`risk-pill risk-${patient.riskLevel.toLowerCase()}`}>{patient.riskLevel} Risk</span>
        </header>

        <div className="evidence-grid">
          <article className="evidence-card">
            <h3>Vital Signs</h3>
            <ul className="metric-list">
              {vitals.map((metric) => (
                <li key={metric.label} className="metric-row">
                  <div>
                    <p className="metric-label">{metric.label}</p>
                    <p className="metric-ref">Ref: {metric.reference}</p>
                  </div>
                  <div className="metric-value-wrap">
                    <span className="metric-value">{metric.value}</span>
                    <span className={`metric-chip ${statusClass(metric.status)}`}>{metric.status}</span>
                  </div>
                </li>
              ))}
            </ul>
          </article>

          <article className="evidence-card">
            <h3>Laboratory Markers</h3>
            <ul className="metric-list">
              {labs.map((metric) => (
                <li key={metric.label} className="metric-row">
                  <div>
                    <p className="metric-label">{metric.label}</p>
                    <p className="metric-ref">Ref: {metric.reference}</p>
                  </div>
                  <div className="metric-value-wrap">
                    <span className="metric-value">{metric.value}</span>
                    <span className={`metric-chip ${statusClass(metric.status)}`}>{metric.status}</span>
                  </div>
                </li>
              ))}
            </ul>
          </article>

          <article className="evidence-card">
            <h3>Imaging Findings</h3>
            <ul className="finding-list">
              {imaging.map((study) => (
                <li key={`${study.modality}-${study.finding}`} className="finding-row">
                  <p className="finding-title">{study.modality}</p>
                  <p className="finding-text">{study.finding}</p>
                  <span className={`metric-chip ${statusClass(study.status)}`}>{study.status}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="evidence-card evidence-card-wide">
            <h3>Why this patient is {patient.riskLevel.toLowerCase()} risk</h3>
            <ul className="drivers-list">
              {riskDrivers.map((driver) => (
                <li key={driver}>{driver}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <footer className="dashboard-footer">
        <p>AI model predictions based on clinical care data | Updated every 2 seconds</p>
      </footer>
    </main>
  );
}
