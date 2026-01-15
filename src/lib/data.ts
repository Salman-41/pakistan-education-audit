// Pakistan Education Dataset - Pre-processed data for visualizations
// Source: 2013-2016 Education Performance Dataset

// Optimized color palette for light theme with good contrast
export const REGION_PALETTE: Record<string, string> = {
  Punjab: "#16a34a", // Green
  Sindh: "#dc2626", // Red
  KP: "#2563eb", // Blue
  Balochistan: "#ca8a04", // Amber/Gold
  ICT: "#6b7280", // Gray
  FATA: "#be185d", // Pink
  AJK: "#0891b2", // Cyan
  GB: "#ea580c", // Orange
};

export interface ProvinceStats {
  province: string;
  educationScore: { mean: number; std: number; min: number; max: number };
  learningScore: { mean: number; std: number; min: number; max: number };
  gpi: { mean: number; std: number };
  icc: { mean: number; std: number };
  sfs: { mean: number; std: number };
  cityCount: number;
}

export interface CityData {
  city: string;
  province: string;
  year: number;
  educationScore: number;
  learningScore: number;
  gpi: number;
  icc: number;
  sfs: number;
  population: number;
  retentionScore: number;
}

export interface CorrelationData {
  metric1: string;
  metric2: string;
  value: number;
}

// Provincial summary statistics (pre-computed from notebook)
export const provincialStats: ProvinceStats[] = [
  {
    province: "ICT",
    educationScore: { mean: 78.4, std: 5.2, min: 71.2, max: 85.6 },
    learningScore: { mean: 72.1, std: 4.8, min: 65.3, max: 79.2 },
    gpi: { mean: 0.98, std: 0.05 },
    icc: { mean: 0.89, std: 0.08 },
    sfs: { mean: 0.8, std: 0.4 },
    cityCount: 1,
  },
  {
    province: "Punjab",
    educationScore: { mean: 68.2, std: 12.4, min: 42.1, max: 82.3 },
    learningScore: { mean: 61.5, std: 11.8, min: 38.2, max: 76.4 },
    gpi: { mean: 0.91, std: 0.12 },
    icc: { mean: 0.72, std: 0.18 },
    sfs: { mean: 2.1, std: 1.8 },
    cityCount: 36,
  },
  {
    province: "Sindh",
    educationScore: { mean: 54.8, std: 18.2, min: 28.4, max: 78.1 },
    learningScore: { mean: 48.2, std: 16.4, min: 22.1, max: 71.3 },
    gpi: { mean: 0.78, std: 0.21 },
    icc: { mean: 0.58, std: 0.24 },
    sfs: { mean: 3.4, std: 2.6 },
    cityCount: 29,
  },
  {
    province: "KP",
    educationScore: { mean: 58.4, std: 14.6, min: 32.8, max: 74.2 },
    learningScore: { mean: 52.8, std: 13.2, min: 28.4, max: 68.6 },
    gpi: { mean: 0.72, std: 0.18 },
    icc: { mean: 0.61, std: 0.21 },
    sfs: { mean: 4.8, std: 3.2 },
    cityCount: 25,
  },
  {
    province: "Balochistan",
    educationScore: { mean: 38.2, std: 16.8, min: 18.2, max: 62.4 },
    learningScore: { mean: 32.4, std: 14.6, min: 12.8, max: 54.2 },
    gpi: { mean: 0.52, std: 0.24 },
    icc: { mean: 0.34, std: 0.22 },
    sfs: { mean: 5.2, std: 3.8 },
    cityCount: 32,
  },
  {
    province: "FATA",
    educationScore: { mean: 42.6, std: 12.4, min: 24.8, max: 58.2 },
    learningScore: { mean: 36.8, std: 11.2, min: 18.4, max: 52.4 },
    gpi: { mean: 0.48, std: 0.22 },
    icc: { mean: 0.38, std: 0.18 },
    sfs: { mean: 6.8, std: 4.2 },
    cityCount: 7,
  },
  {
    province: "AJK",
    educationScore: { mean: 62.4, std: 8.6, min: 48.2, max: 72.8 },
    learningScore: { mean: 56.2, std: 7.8, min: 42.4, max: 66.2 },
    gpi: { mean: 0.88, std: 0.08 },
    icc: { mean: 0.68, std: 0.14 },
    sfs: { mean: 1.2, std: 0.8 },
    cityCount: 10,
  },
  {
    province: "GB",
    educationScore: { mean: 58.8, std: 10.2, min: 42.4, max: 68.4 },
    learningScore: { mean: 52.4, std: 9.4, min: 38.2, max: 62.8 },
    gpi: { mean: 0.82, std: 0.12 },
    icc: { mean: 0.54, std: 0.18 },
    sfs: { mean: 0.6, std: 0.4 },
    cityCount: 7,
  },
];

// Key insights from the analysis
export const keyInsights = {
  totalCities: 147,
  timespan: "2013-2016",
  topPerformer: "ICT",
  bottomPerformer: "Balochistan",
  gpiGap: 0.46, // Difference between highest and lowest provincial GPI
  iccCorrelation: 0.42, // Correlation between infrastructure and learning
  resilienceNodes: 12, // Districts with high retention despite high SFS
  positiveDeviants: 8, // Low infra, high learning districts
};

// Correlation matrix for systems view
export const correlationMatrix: CorrelationData[] = [
  { metric1: "Education Score", metric2: "Learning Score", value: 0.86 },
  { metric1: "Education Score", metric2: "ICC", value: 0.58 },
  { metric1: "Education Score", metric2: "GPI", value: 0.62 },
  { metric1: "Education Score", metric2: "SFS", value: -0.34 },
  { metric1: "Learning Score", metric2: "ICC", value: 0.42 },
  { metric1: "Learning Score", metric2: "GPI", value: 0.48 },
  { metric1: "Learning Score", metric2: "SFS", value: -0.28 },
  { metric1: "ICC", metric2: "GPI", value: 0.54 },
  { metric1: "ICC", metric2: "SFS", value: -0.18 },
  { metric1: "GPI", metric2: "SFS", value: -0.22 },
];

// Sample city data for visualizations
export const sampleCities: CityData[] = [
  {
    city: "Islamabad",
    province: "ICT",
    year: 2016,
    educationScore: 82.4,
    learningScore: 76.2,
    gpi: 0.98,
    icc: 0.92,
    sfs: 0.4,
    population: 2001000,
    retentionScore: 88.2,
  },
  {
    city: "Lahore",
    province: "Punjab",
    year: 2016,
    educationScore: 78.2,
    learningScore: 72.4,
    gpi: 0.94,
    icc: 0.84,
    sfs: 1.8,
    population: 11126000,
    retentionScore: 82.4,
  },
  {
    city: "Karachi",
    province: "Sindh",
    year: 2016,
    educationScore: 72.8,
    learningScore: 68.2,
    gpi: 0.88,
    icc: 0.76,
    sfs: 4.2,
    population: 14910000,
    retentionScore: 74.8,
  },
  {
    city: "Peshawar",
    province: "KP",
    year: 2016,
    educationScore: 68.4,
    learningScore: 62.8,
    gpi: 0.82,
    icc: 0.72,
    sfs: 5.4,
    population: 1970000,
    retentionScore: 71.2,
  },
  {
    city: "Quetta",
    province: "Balochistan",
    year: 2016,
    educationScore: 58.2,
    learningScore: 48.6,
    gpi: 0.64,
    icc: 0.52,
    sfs: 6.2,
    population: 1001000,
    retentionScore: 62.4,
  },
  {
    city: "Multan",
    province: "Punjab",
    year: 2016,
    educationScore: 64.8,
    learningScore: 58.2,
    gpi: 0.86,
    icc: 0.68,
    sfs: 2.4,
    population: 1872000,
    retentionScore: 72.8,
  },
  {
    city: "Faisalabad",
    province: "Punjab",
    year: 2016,
    educationScore: 66.2,
    learningScore: 60.4,
    gpi: 0.88,
    icc: 0.72,
    sfs: 1.6,
    population: 3204000,
    retentionScore: 74.2,
  },
  {
    city: "Hyderabad",
    province: "Sindh",
    year: 2016,
    educationScore: 62.4,
    learningScore: 54.8,
    gpi: 0.78,
    icc: 0.62,
    sfs: 3.8,
    population: 1732000,
    retentionScore: 68.4,
  },
  {
    city: "Rawalpindi",
    province: "Punjab",
    year: 2016,
    educationScore: 74.2,
    learningScore: 68.6,
    gpi: 0.92,
    icc: 0.82,
    sfs: 2.2,
    population: 2098000,
    retentionScore: 78.6,
  },
  {
    city: "Gujranwala",
    province: "Punjab",
    year: 2016,
    educationScore: 62.8,
    learningScore: 56.4,
    gpi: 0.84,
    icc: 0.66,
    sfs: 1.4,
    population: 2027000,
    retentionScore: 70.2,
  },
  {
    city: "Sukkur",
    province: "Sindh",
    year: 2016,
    educationScore: 48.2,
    learningScore: 42.6,
    gpi: 0.68,
    icc: 0.48,
    sfs: 2.8,
    population: 499000,
    retentionScore: 58.4,
  },
  {
    city: "Bahawalpur",
    province: "Punjab",
    year: 2016,
    educationScore: 56.4,
    learningScore: 48.8,
    gpi: 0.76,
    icc: 0.58,
    sfs: 1.8,
    population: 762000,
    retentionScore: 64.2,
  },
  {
    city: "Mardan",
    province: "KP",
    year: 2016,
    educationScore: 58.8,
    learningScore: 52.4,
    gpi: 0.72,
    icc: 0.58,
    sfs: 4.8,
    population: 358000,
    retentionScore: 66.8,
  },
  {
    city: "Swat",
    province: "KP",
    year: 2016,
    educationScore: 52.4,
    learningScore: 46.2,
    gpi: 0.62,
    icc: 0.48,
    sfs: 5.8,
    population: 2309000,
    retentionScore: 58.2,
  },
  {
    city: "Turbat",
    province: "Balochistan",
    year: 2016,
    educationScore: 32.4,
    learningScore: 26.8,
    gpi: 0.42,
    icc: 0.28,
    sfs: 5.6,
    population: 203000,
    retentionScore: 42.4,
  },
  {
    city: "Khuzdar",
    province: "Balochistan",
    year: 2016,
    educationScore: 36.8,
    learningScore: 30.2,
    gpi: 0.48,
    icc: 0.32,
    sfs: 4.8,
    population: 142000,
    retentionScore: 46.2,
  },
  {
    city: "Muzaffarabad",
    province: "AJK",
    year: 2016,
    educationScore: 68.2,
    learningScore: 62.4,
    gpi: 0.92,
    icc: 0.74,
    sfs: 0.8,
    population: 125000,
    retentionScore: 76.4,
  },
  {
    city: "Gilgit",
    province: "GB",
    year: 2016,
    educationScore: 64.8,
    learningScore: 58.6,
    gpi: 0.86,
    icc: 0.62,
    sfs: 0.4,
    population: 217000,
    retentionScore: 72.8,
  },
];

// Positive deviants - high learning with low infrastructure
export const positiveDeviants = [
  {
    city: "Chilas",
    province: "GB",
    icc: 0.28,
    learningScore: 58.4,
    efficiency: 2.08,
  },
  {
    city: "Ghanche",
    province: "GB",
    icc: 0.32,
    learningScore: 62.2,
    efficiency: 1.94,
  },
  {
    city: "Hunza",
    province: "GB",
    icc: 0.38,
    learningScore: 68.4,
    efficiency: 1.8,
  },
  {
    city: "Haripur",
    province: "KP",
    icc: 0.42,
    learningScore: 64.8,
    efficiency: 1.54,
  },
  {
    city: "Abbottabad",
    province: "KP",
    icc: 0.48,
    learningScore: 68.2,
    efficiency: 1.42,
  },
];

// Temporal trends (Year-over-Year)
export const temporalTrends = {
  years: [2013, 2014, 2015, 2016],
  provinces: {
    Punjab: [64.2, 65.8, 67.2, 68.2],
    Sindh: [52.4, 53.2, 54.1, 54.8],
    KP: [54.8, 56.2, 57.4, 58.4],
    Balochistan: [36.4, 36.8, 37.4, 38.2],
    ICT: [75.2, 76.4, 77.8, 78.4],
    FATA: [40.2, 41.4, 42.0, 42.6],
    AJK: [58.8, 60.2, 61.4, 62.4],
    GB: [55.2, 56.8, 57.8, 58.8],
  },
};

// Infrastructure impact on GPI
export const infraGpiCorrelation = [
  { factor: "Boundary Wall", correlation: 0.52 },
  { factor: "Toilet Facility", correlation: 0.48 },
  { factor: "Drinking Water", correlation: 0.38 },
  { factor: "Electricity", correlation: 0.32 },
  { factor: "Building Condition", correlation: 0.28 },
];

// Ghost enrollment zones - high enrollment, low learning
export const ghostEnrollmentZones = [
  {
    city: "Jacobabad",
    province: "Sindh",
    enrollmentScore: 72.4,
    learningScore: 38.2,
    gap: 34.2,
  },
  {
    city: "Shikarpur",
    province: "Sindh",
    enrollmentScore: 68.2,
    learningScore: 36.8,
    gap: 31.4,
  },
  {
    city: "Kashmore",
    province: "Sindh",
    enrollmentScore: 64.8,
    learningScore: 34.2,
    gap: 30.6,
  },
  {
    city: "Dera Ghazi Khan",
    province: "Punjab",
    enrollmentScore: 62.4,
    learningScore: 38.4,
    gap: 24.0,
  },
  {
    city: "Rajanpur",
    province: "Punjab",
    enrollmentScore: 58.2,
    learningScore: 36.2,
    gap: 22.0,
  },
];
