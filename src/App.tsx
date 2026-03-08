import { useState, useMemo } from 'react';
import { generatePatients, Patient } from './patientData';
import PatientList from './components/PatientList';
import PatientDashboard from './components/PatientDashboard';

export default function App() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const patients = useMemo(() => generatePatients(100), []);

  if (selectedPatient) {
    return (
      <PatientDashboard
        patient={selectedPatient}
        onBack={() => setSelectedPatient(null)}
      />
    );
  }

  return <PatientList patients={patients} onSelectPatient={setSelectedPatient} />;
}
