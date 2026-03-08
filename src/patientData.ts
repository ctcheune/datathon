export type Patient = {
  id: string;
  mrn: string;
  name: string;
  age: number;
  gender: 'M' | 'F';
  diagnosis: string;
  admissionDate: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  location: string;
  clinicalSnapshot: ClinicalSnapshot;
};

export type ClinicalStatus = 'normal' | 'watch' | 'abnormal' | 'critical';

export type ClinicalMetric = {
  label: string;
  value: string;
  reference: string;
  status: ClinicalStatus;
};

export type ImagingFinding = {
  modality: string;
  finding: string;
  status: ClinicalStatus;
};

export type ClinicalSnapshot = {
  vitals: ClinicalMetric[];
  labs: ClinicalMetric[];
  imaging: ImagingFinding[];
  riskDrivers: string[];
};

const FIRST_NAMES_M = ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Christopher'];
const FIRST_NAMES_F = ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];

const DIAGNOSES = [
  'Acute Myocardial Infarction',
  'Congestive Heart Failure',
  'Chronic Obstructive Pulmonary Disease',
  'Pneumonia',
  'Sepsis',
  'Acute Respiratory Failure',
  'Diabetes Mellitus Type 2',
  'Acute Kidney Injury',
  'Stroke (CVA)',
  'Atrial Fibrillation',
  'Hypertensive Crisis',
  'Pulmonary Embolism',
  'COVID-19 Pneumonia',
  'Gastrointestinal Bleeding',
  'Urinary Tract Infection',
];

const LOCATIONS = [
  'Medical Ward 3A',
  'Medical Ward 3B',
  'Medical Ward 4A',
  'Medical Ward 4B',
  'Cardiac Care Unit',
  'Telemetry Unit',
  'Medical Ward 5A',
  'Medical Ward 5B',
  'Step-Down Unit',
];

function generateMRN(index: number): string {
  const base = 100000 + index;
  return `MRN-${base}`;
}

function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateAdmissionDate(): string {
  const daysAgo = Math.floor(Math.random() * 30);
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
}

function randomInRange(min: number, max: number, decimals = 0): number {
  const value = min + Math.random() * (max - min);
  return Number(value.toFixed(decimals));
}

function buildClinicalSnapshot(
  riskLevel: Patient['riskLevel'],
  diagnosis: string
): ClinicalSnapshot {
  const profile = {
    Low: {
      hr: randomInRange(68, 92),
      map: randomInRange(75, 95),
      rr: randomInRange(14, 20),
      spo2: randomInRange(95, 99),
      lactate: randomInRange(0.8, 1.8, 1),
      wbc: randomInRange(5.0, 10.5, 1),
      creatinine: randomInRange(0.7, 1.2, 2),
      crp: randomInRange(2, 12),
      imagingStatus: 'normal' as ClinicalStatus,
    },
    Medium: {
      hr: randomInRange(88, 108),
      map: randomInRange(68, 82),
      rr: randomInRange(18, 24),
      spo2: randomInRange(92, 96),
      lactate: randomInRange(1.6, 2.8, 1),
      wbc: randomInRange(10.0, 14.5, 1),
      creatinine: randomInRange(1.1, 1.8, 2),
      crp: randomInRange(14, 58),
      imagingStatus: 'watch' as ClinicalStatus,
    },
    High: {
      hr: randomInRange(102, 126),
      map: randomInRange(58, 72),
      rr: randomInRange(22, 32),
      spo2: randomInRange(87, 93),
      lactate: randomInRange(2.6, 4.2, 1),
      wbc: randomInRange(13.5, 21.0, 1),
      creatinine: randomInRange(1.8, 3.0, 2),
      crp: randomInRange(56, 145),
      imagingStatus: 'abnormal' as ClinicalStatus,
    },
    Critical: {
      hr: randomInRange(118, 148),
      map: randomInRange(48, 62),
      rr: randomInRange(28, 40),
      spo2: randomInRange(78, 89),
      lactate: randomInRange(4.0, 8.2, 1),
      wbc: randomInRange(18.0, 30.0, 1),
      creatinine: randomInRange(2.8, 5.0, 2),
      crp: randomInRange(130, 280),
      imagingStatus: 'critical' as ClinicalStatus,
    },
  }[riskLevel];

  const vitals: ClinicalMetric[] = [
    {
      label: 'Heart Rate',
      value: `${profile.hr} bpm`,
      reference: '60-100 bpm',
      status: riskLevel === 'Low' ? 'normal' : riskLevel === 'Medium' ? 'watch' : 'abnormal',
    },
    {
      label: 'MAP',
      value: `${profile.map} mmHg`,
      reference: '>= 65 mmHg',
      status: profile.map < 60 ? 'critical' : profile.map < 65 ? 'abnormal' : 'normal',
    },
    {
      label: 'Respiratory Rate',
      value: `${profile.rr} /min`,
      reference: '12-20 /min',
      status: profile.rr > 30 ? 'critical' : profile.rr > 22 ? 'abnormal' : profile.rr > 20 ? 'watch' : 'normal',
    },
    {
      label: 'SpO2',
      value: `${profile.spo2}%`,
      reference: '>= 94%',
      status: profile.spo2 < 85 ? 'critical' : profile.spo2 < 90 ? 'abnormal' : profile.spo2 < 94 ? 'watch' : 'normal',
    },
  ];

  const labs: ClinicalMetric[] = [
    {
      label: 'Lactate',
      value: `${profile.lactate} mmol/L`,
      reference: '0.5-2.0',
      status: profile.lactate >= 4 ? 'critical' : profile.lactate >= 2.5 ? 'abnormal' : profile.lactate > 2 ? 'watch' : 'normal',
    },
    {
      label: 'WBC',
      value: `${profile.wbc} x10⁹/L`,
      reference: '4.0-11.0',
      status: profile.wbc >= 20 ? 'critical' : profile.wbc >= 14 ? 'abnormal' : profile.wbc > 11 ? 'watch' : 'normal',
    },
    {
      label: 'Creatinine',
      value: `${profile.creatinine} mg/dL`,
      reference: '0.6-1.3',
      status:
        profile.creatinine >= 3 ? 'critical' : profile.creatinine >= 2 ? 'abnormal' : profile.creatinine > 1.3 ? 'watch' : 'normal',
    },
    {
      label: 'CRP',
      value: `${profile.crp} mg/L`,
      reference: '< 10',
      status: profile.crp >= 150 ? 'critical' : profile.crp >= 60 ? 'abnormal' : profile.crp >= 10 ? 'watch' : 'normal',
    },
  ];

  const imagingByRisk: Record<Patient['riskLevel'], ImagingFinding[]> = {
    Low: [
      { modality: 'CXR', finding: 'No acute infiltrate or pleural effusion.', status: 'normal' },
      { modality: 'CT Chest', finding: 'Mild bibasal atelectasis only.', status: 'watch' },
    ],
    Medium: [
      { modality: 'CXR', finding: 'Patchy lower lobe opacity, likely early consolidation.', status: 'watch' },
      { modality: 'POCUS', finding: 'Mild B-lines with small IVC variability.', status: 'watch' },
    ],
    High: [
      { modality: 'CXR', finding: 'Bilateral multifocal infiltrates with interstitial edema.', status: 'abnormal' },
      { modality: 'CT Chest', finding: 'Progressive ground-glass opacities and dependent consolidation.', status: 'abnormal' },
    ],
    Critical: [
      { modality: 'CXR', finding: 'Diffuse bilateral opacification consistent with severe pulmonary edema/ARDS.', status: 'critical' },
      { modality: 'CT Abd/Pelvis', finding: 'Hypoperfusion pattern concerning for shock physiology.', status: 'critical' },
    ],
  };

  const riskDrivers: Record<Patient['riskLevel'], string[]> = {
    Low: [
      'Hemodynamics stable with preserved MAP and oxygenation.',
      `Primary diagnosis (${diagnosis}) currently responding to treatment.`,
      'Inflammatory and organ dysfunction markers within acceptable range.',
    ],
    Medium: [
      'Early signs of physiologic stress (tachycardia or mild hypoxemia).',
      'Moderately elevated inflammatory markers suggest possible clinical deterioration.',
      `Diagnosis burden (${diagnosis}) warrants closer trend monitoring.`,
    ],
    High: [
      'Persistent hypoxemia and rising respiratory workload increase ICU risk.',
      'Lab pattern indicates evolving organ dysfunction and systemic inflammation.',
      `Imaging shows progression compatible with worsening ${diagnosis.toLowerCase()}.`,
    ],
    Critical: [
      'Shock physiology with poor perfusion markers and unstable vitals.',
      'Severe oxygenation failure with high immediate need for intensive support.',
      'Multisystem injury profile and imaging findings are compatible with life-threatening deterioration.',
    ],
  };

  return {
    vitals,
    labs,
    imaging: imagingByRisk[riskLevel].map((entry) => ({
      ...entry,
      status: entry.status === 'watch' && profile.imagingStatus !== 'normal' ? profile.imagingStatus : entry.status,
    })),
    riskDrivers: riskDrivers[riskLevel],
  };
}

function generatePatient(index: number): Patient {
  const gender = Math.random() > 0.5 ? 'M' : 'F';
  const firstName = gender === 'M' ? randomChoice(FIRST_NAMES_M) : randomChoice(FIRST_NAMES_F);
  const lastName = randomChoice(LAST_NAMES);
  const age = 18 + Math.floor(Math.random() * 75);
  const diagnosis = randomChoice(DIAGNOSES);
  
  // Risk level weighted toward lower risks
  const riskRoll = Math.random();
  let riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  if (riskRoll < 0.4) riskLevel = 'Low';
  else if (riskRoll < 0.7) riskLevel = 'Medium';
  else if (riskRoll < 0.9) riskLevel = 'High';
  else riskLevel = 'Critical';

  return {
    id: `patient-${index}`,
    mrn: generateMRN(index),
    name: `${lastName}, ${firstName}`,
    age,
    gender,
    diagnosis,
    admissionDate: generateAdmissionDate(),
    riskLevel,
    location: randomChoice(LOCATIONS),
    clinicalSnapshot: buildClinicalSnapshot(riskLevel, diagnosis),
  };
}

export function generatePatients(count: number): Patient[] {
  return Array.from({ length: count }, (_, i) => generatePatient(i + 1));
}
