export const accidentTrendData = [
  { month: 'Jan', accidents: 320 },
  { month: 'Feb', accidents: 290 },
  { month: 'Mar', accidents: 415 },
  { month: 'Apr', accidents: 380 },
  { month: 'May', accidents: 460 },
  { month: 'Jun', accidents: 510 },
  { month: 'Jul', accidents: 490 },
  { month: 'Aug', accidents: 530 },
  { month: 'Sep', accidents: 480 },
  { month: 'Oct', accidents: 420 },
  { month: 'Nov', accidents: 395 },
  { month: 'Dec', accidents: 440 },
];

export const peakHourData = [
  { hour: '00', accidents: 45 },
  { hour: '01', accidents: 30 },
  { hour: '02', accidents: 25 },
  { hour: '03', accidents: 20 },
  { hour: '04', accidents: 28 },
  { hour: '05', accidents: 55 },
  { hour: '06', accidents: 120 },
  { hour: '07', accidents: 210 },
  { hour: '08', accidents: 290 },
  { hour: '09', accidents: 180 },
  { hour: '10', accidents: 140 },
  { hour: '11', accidents: 130 },
  { hour: '12', accidents: 160 },
  { hour: '13', accidents: 150 },
  { hour: '14', accidents: 145 },
  { hour: '15', accidents: 170 },
  { hour: '16', accidents: 220 },
  { hour: '17', accidents: 310 },
  { hour: '18', accidents: 280 },
  { hour: '19', accidents: 195 },
  { hour: '20', accidents: 130 },
  { hour: '21', accidents: 100 },
  { hour: '22', accidents: 85 },
  { hour: '23', accidents: 60 },
];

export const severityData = [
  { name: 'Slight', value: 58, color: '#22c55e' },
  { name: 'Serious', value: 29, color: '#f59e0b' },
  { name: 'Fatal', value: 13, color: '#ef4444' },
];

export const districtMarkers = [
  { name: 'Delhi', lat: 28.6139, lng: 77.209, risk: 92, severity: 'Critical' },
  { name: 'Mumbai', lat: 19.076, lng: 72.8777, risk: 87, severity: 'Critical' },
  { name: 'Bengaluru', lat: 12.9716, lng: 77.5946, risk: 74, severity: 'High' },
  { name: 'Chennai', lat: 13.0827, lng: 80.2707, risk: 68, severity: 'High' },
  { name: 'Hyderabad', lat: 17.385, lng: 78.4867, risk: 62, severity: 'High' },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639, risk: 79, severity: 'Critical' },
  { name: 'Pune', lat: 18.5204, lng: 73.8567, risk: 55, severity: 'Medium' },
  { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714, risk: 48, severity: 'Medium' },
  { name: 'Jaipur', lat: 26.9124, lng: 75.7873, risk: 42, severity: 'Medium' },
  { name: 'Lucknow', lat: 26.8467, lng: 80.9462, risk: 71, severity: 'High' },
  { name: 'Bhopal', lat: 23.2599, lng: 77.4126, risk: 38, severity: 'Low' },
  { name: 'Patna', lat: 25.5941, lng: 85.1376, risk: 65, severity: 'High' },
  { name: 'Chandigarh', lat: 30.7333, lng: 76.7794, risk: 32, severity: 'Low' },
  { name: 'Kochi', lat: 9.9312, lng: 76.2673, risk: 44, severity: 'Medium' },
  { name: 'Nagpur', lat: 21.1458, lng: 79.0882, risk: 57, severity: 'Medium' },
];

export const dashboardStats = {
  totalAccidents: 12847,
  highRiskZones: 38,
  avgRisk: 61.4,
  mostDangerousDistrict: 'Delhi NCR',
};
