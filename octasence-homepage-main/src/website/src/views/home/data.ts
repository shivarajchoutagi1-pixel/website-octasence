/* eslint-disable simple-import-sort/imports */
import { Database, File, Globe, Monitor, Star, HandCoins } from 'lucide-react';
/* eslint-enable simple-import-sort/imports */

export const accordionItems = {
  infrastructure: [
    {
      title: 'AI-Agent Monitoring',
      content:
        'Real-time sensor monitoring and anomaly detection across infrastructure assets. Our AI agents continuously analyze structural data streams to identify early warning signs.',
    },
    {
      title: 'IoT Sensor Networks',
      content:
        'Rugged wireless sensors capturing strain, displacement, vibration, groundwater, and environmental signals across mines, tunnels, dams, and bridges.',
    },
    {
      title: 'Infrastructure Digital Twin',
      content:
        'Interactive 2D/3D dashboards visualizing infrastructure health and sensor data in real time. Engineers gain full situational awareness of every monitored asset.',
    },
  ],
  analytics: [
    {
      title: 'Predictive Failure Analytics',
      content:
        'Machine learning models detect structural risks before failures occur, reducing unplanned downtime and protecting lives across critical infrastructure.',
    },
    {
      title: 'Hazard Detection & Alerts',
      content:
        'Automated alerts delivered via dashboard, SMS, or email when anomalies occur. Configurable thresholds ensure the right team is notified instantly.',
    },
    {
      title: 'Engineering Reports',
      content:
        'Automated engineering-grade reports generated from sensor data, enabling compliance and informed decision-making for infrastructure operators.',
    },
  ],
};

export const statItems = [
  {
    label: 'Countries Enagaged',
    key: 'industrial_sites',
    value: 5,
    icon: Globe,
    color: '#145DFF',
  },
  {
    label: 'AI Models Developed',
    key: 'pilot_deployments',
    value: 12,
    icon: Star,
    color: '#10B981',
  },
  {
    label: 'IoT Pipelines Developed',
    key: 'iot_sensors',
    value: 25,
    icon: Monitor,
    color: '#F59E0B',
  },
  {
    label: 'Data Samples Processed',
    key: 'ai_analyses',
    value: 50000,
    icon: Database,
    color: '#EF4444',
  },
  {
    label: 'Simulated Risk Reports',
    key: 'engineering_reports',
    value: 200,
    icon: File,
    color: '#8B5CF6',
  },
  {
    label: 'Partners',
    key: 'partners',
    value: 8,
    icon: HandCoins,
    color: '#06B6D4',
  },
];
