import { useState, useEffect } from 'react';

export type DataPoint = {
  time: number;
  probability: number;
  baseline: number;
};

export type PatientData = {
  icuProbability: DataPoint[];
  mortalityProbability: DataPoint[];
  palliativeCareProbability: DataPoint[];
};

const INITIAL_TIME_POINTS = 30;
const UPDATE_INTERVAL = 2000; // 2 seconds

// Simulate AI model predictions with realistic trajectories
function generateInitialData(): PatientData {
  const icuData: DataPoint[] = [];
  const mortalityData: DataPoint[] = [];
  const palliativeData: DataPoint[] = [];

  let icuBase = 0.25;
  let mortalityBase = 0.15;
  let palliativeBase = 0.12;
  let icuBaseline = 0.08;
  let mortalityBaseline = 0.04;
  let palliativeBaseline = 0.02;

  for (let i = 0; i < INITIAL_TIME_POINTS; i++) {
    icuBase += (Math.random() - 0.48) * 0.02;
    mortalityBase += (Math.random() - 0.5) * 0.015;
    palliativeBase += (Math.random() - 0.5) * 0.01;
    icuBaseline += (Math.random() - 0.5) * 0.004;
    mortalityBaseline += (Math.random() - 0.5) * 0.003;
    palliativeBaseline += (Math.random() - 0.5) * 0.002;

    icuData.push({
      time: i,
      probability: Math.max(0, Math.min(1, icuBase)),
      baseline: Math.max(0, Math.min(1, icuBaseline)),
    });

    mortalityData.push({
      time: i,
      probability: Math.max(0, Math.min(1, mortalityBase)),
      baseline: Math.max(0, Math.min(1, mortalityBaseline)),
    });

    palliativeData.push({
      time: i,
      probability: Math.max(0, Math.min(1, palliativeBase)),
      baseline: Math.max(0, Math.min(1, palliativeBaseline)),
    });
  }

  return {
    icuProbability: icuData,
    mortalityProbability: mortalityData,
    palliativeCareProbability: palliativeData,
  };
}

function generateNextDataPoint(
  prevData: DataPoint[],
  trend: number
): DataPoint {
  const lastPoint = prevData[prevData.length - 1];
  const newTime = lastPoint.time + 1;
  const drift = (Math.random() - 0.5) * 0.03;
  const baselineDrift = (Math.random() - 0.5) * 0.015;
  const newProbability = Math.max(
    0,
    Math.min(1, lastPoint.probability + trend + drift)
  );
  const newBaseline = Math.max(
    0,
    Math.min(1, lastPoint.baseline + baselineDrift)
  );

  return {
    time: newTime,
    probability: newProbability,
    baseline: newBaseline,
  };
}

export function usePatientData() {
  const [data, setData] = useState<PatientData>(generateInitialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const icuTrend = Math.random() > 0.5 ? 0.008 : -0.003;
        const mortalityTrend = Math.random() > 0.6 ? 0.005 : -0.002;
        const palliativeTrend = Math.random() > 0.55 ? 0.004 : -0.002;

        const newIcuPoint = generateNextDataPoint(
          prev.icuProbability,
          icuTrend
        );
        const newMortalityPoint = generateNextDataPoint(
          prev.mortalityProbability,
          mortalityTrend
        );
        const newPalliativePoint = generateNextDataPoint(
          prev.palliativeCareProbability,
          palliativeTrend
        );

        return {
          icuProbability: [...prev.icuProbability.slice(-29), newIcuPoint],
          mortalityProbability: [
            ...prev.mortalityProbability.slice(-29),
            newMortalityPoint,
          ],
          palliativeCareProbability: [
            ...prev.palliativeCareProbability.slice(-29),
            newPalliativePoint,
          ],
        };
      });
    }, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return data;
}
