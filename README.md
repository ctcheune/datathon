# Patient Trajectory Monitor

A minimalist real-time dashboard displaying AI model predictions for patient outcomes.

## Features

- **Live Dashboard**: Real-time visualization of patient trajectory predictions
- **Three Key Metrics**:
  - ICU Admission Probability
  - Mortality Probability
  - Palliative Care Probability
- **AI Model Simulation**: Simulates ML model predictions based on clinical care data
- **Responsive Design**: Works on desktop and mobile devices

## Getting started

1. Install Node.js 18+.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the dev server:
   ```
   npm run dev
   ```

## Scripts

- `npm run dev` - start development server
- `npm run build` - type-check and build for production
- `npm run preview` - preview production build

## Technology Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Recharts** - Data visualization library

## Data Simulation

The dashboard uses simulated patient data to demonstrate AI model predictions. Data updates every 2 seconds with realistic probability trajectories. This is for demonstration purposes only and does not use real patient data.

## Copilot Customization

This workspace includes:
- Custom instructions: [.github/copilot-instructions.md](.github/copilot-instructions.md)
- Custom agents in [.github/agents](.github/agents)
  - Reviewer - Code review specialist
  - Planner - Feature planning
  - Debugger - Issue diagnosis
  - Docs - Documentation maintenance

These files enable workspace-level Copilot customization in VS Code.

## Disclaimer

This is a demonstration application with simulated data. Not intended for clinical use.
