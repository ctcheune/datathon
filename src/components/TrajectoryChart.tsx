import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { DataPoint } from '../usePatientData';

type TrajectoryChartProps = {
  title: string;
  data: DataPoint[];
  color: string;
  ariaLabel: string;
};

export default function TrajectoryChart({
  title,
  data,
  color,
  ariaLabel,
}: TrajectoryChartProps) {
  const currentProbability = data[data.length - 1]?.probability ?? 0;
  const baselineColor = 'rgba(148, 163, 184, 0.5)';

  return (
    <article className="chart-card" aria-label={ariaLabel}>
      <header className="chart-header">
        <h2>{title}</h2>
        <div className="probability-display">
          <span className="probability-value">
            {(currentProbability * 100).toFixed(1)}%
          </span>
          <span className="probability-label">Current</span>
        </div>
      </header>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
            <XAxis
              dataKey="time"
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              label={{ value: 'Time', position: 'insideBottom', offset: -5, fill: '#94a3b8' }}
            />
            <YAxis
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
              domain={[0, 1]}
              label={{ value: 'Probability', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                border: '1px solid rgba(148, 163, 184, 0.3)',
                borderRadius: '8px',
                color: '#e5e7eb',
              }}
              formatter={(value: number) => `${(value * 100).toFixed(2)}%`}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <Legend wrapperStyle={{ paddingTop: '8px' }} />
            <Line
              type="monotone"
              dataKey="baseline"
              stroke={baselineColor}
              strokeWidth={1.5}
              strokeDasharray="5 5"
              dot={false}
              isAnimationActive={false}
              name="Baseline"
            />
            <Line
              type="monotone"
              dataKey="probability"
              stroke={color}
              strokeWidth={2.5}
              dot={false}
              isAnimationActive={false}
              name="Current Trajectory"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
