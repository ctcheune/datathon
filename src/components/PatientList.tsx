import { useMemo, useState } from 'react';
import { Patient } from '../patientData';

type PatientListProps = {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
};

type SortField = 'mrn' | 'name' | 'age' | 'diagnosis' | 'admissionDate' | 'riskLevel' | 'location';
type SortDirection = 'asc' | 'desc';

export default function PatientList({ patients, onSelectPatient }: PatientListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('mrn');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [filterRisk, setFilterRisk] = useState<string>('all');

  const filteredAndSortedPatients = useMemo(() => {
    let filtered = patients;

    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.mrn.toLowerCase().includes(search) ||
          p.diagnosis.toLowerCase().includes(search)
      );
    }

    // Apply risk filter
    if (filterRisk !== 'all') {
      filtered = filtered.filter((p) => p.riskLevel === filterRisk);
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      let aVal: string | number = a[sortField];
      let bVal: string | number = b[sortField];

      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [patients, searchTerm, sortField, sortDirection, filterRisk]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'risk-low';
      case 'Medium':
        return 'risk-medium';
      case 'High':
        return 'risk-high';
      case 'Critical':
        return 'risk-critical';
      default:
        return '';
    }
  };

  return (
    <div className="patient-list-container">
      <header className="emr-header">
        <div className="emr-header-content">
          <h1>Patient Census Dashboard</h1>
          <div className="header-meta">
            <span className="patient-count">{filteredAndSortedPatients.length} patients</span>
          </div>
        </div>
      </header>

      <div className="filters-bar">
        <input
          type="search"
          placeholder="Search by name, MRN, or diagnosis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="filter-group">
          <label htmlFor="risk-filter">Risk Level:</label>
          <select
            id="risk-filter"
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="risk-filter"
          >
            <option value="all">All Patients</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="patient-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('mrn')} className="sortable">
                MRN {sortField === 'mrn' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('name')} className="sortable">
                Patient Name {sortField === 'name' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('age')} className="sortable">
                Age {sortField === 'age' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th>Sex</th>
              <th onClick={() => handleSort('diagnosis')} className="sortable">
                Diagnosis {sortField === 'diagnosis' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('admissionDate')} className="sortable">
                Admission {sortField === 'admissionDate' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('riskLevel')} className="sortable">
                Risk {sortField === 'riskLevel' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('location')} className="sortable">
                Location {sortField === 'location' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedPatients.map((patient) => (
              <tr
                key={patient.id}
                onClick={() => onSelectPatient(patient)}
                className="patient-row"
              >
                <td className="mrn-cell">{patient.mrn}</td>
                <td className="name-cell">{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td className="diagnosis-cell">{patient.diagnosis}</td>
                <td>{patient.admissionDate}</td>
                <td>
                  <span className={`risk-badge ${getRiskColor(patient.riskLevel)}`}>
                    {patient.riskLevel}
                  </span>
                </td>
                <td className="location-cell">{patient.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
