/**
 * Real-World Use Cases
 *
 * This file demonstrates practical applications of @malwayson/humanize-number
 * in real-world scenarios.
 */

import {
  convertTemperature,
  humanizeData,
  humanizeDistance,
  humanizeDuration,
  humanizeNumber,
  humanizeObject,
  humanizePercentage,
  humanizeRange,
  humanizeSpeed,
  humanizeTemperature,
  humanizeWeight,
  presets,
  sortHumanized,
} from "../src/index";

console.log("=== Real-World Use Cases ===\n");

// ==================== 1. DASHBOARD METRICS ====================

console.log("1. 📊 Dashboard Metrics");
console.log("-----------------------");

const dashboardMetrics = {
  activeUsers: 12567,
  totalStorage: 5368709120,
  avgResponseTime: 0.245,
  uptime: 2592000,
  errorRate: 0.0023,
  bandwidth: 52428800,
};

const formattedDashboard = humanizeObject(dashboardMetrics, {
  activeUsers: ["generic", presets.compact],
  totalStorage: ["data"],
  avgResponseTime: ["duration"],
  uptime: ["duration"],
  errorRate: ["percentage"],
  bandwidth: ["data"],
});

console.log("Dashboard Overview:");
Object.entries(formattedDashboard).forEach(([key, value]) => {
  const label = key.replace(/([A-Z])/g, " $1").trim();
  console.log(`  ${label}: ${value}`);
});
console.log();

// ==================== 2. FILE UPLOAD PROGRESS ====================

console.log("2. 📤 File Upload Progress");
console.log("--------------------------");

function displayUploadProgress(uploaded: number, total: number) {
  const percentage = uploaded / total;
  const progress = humanizePercentage(percentage);
  const uploadedSize = humanizeData(uploaded);
  const totalSize = humanizeData(total);
  const remaining = humanizeData(total - uploaded);

  console.log(`Progress: ${progress}`);
  console.log(`Uploaded: ${uploadedSize} of ${totalSize}`);
  console.log(`Remaining: ${remaining}`);
  console.log(`Range: ${humanizeRange(uploaded, total, "data")}`);
}

console.log("File: large-video.mp4");
displayUploadProgress(52428800, 104857600); // 50 MB of 100 MB
console.log();

// ==================== 3. SYSTEM MONITORING ====================

console.log("3. 🖥️  System Monitoring");
console.log("-----------------------");

interface ServerMetrics {
  name: string;
  memory: number;
  cpu: number;
  disk: number;
  network: number;
  uptime: number;
}

const servers: ServerMetrics[] = [
  {
    name: "Web Server 1",
    memory: 8589934592,
    cpu: 0.65,
    disk: 512000000000,
    network: 125000000,
    uptime: 1209600,
  },
  {
    name: "Web Server 2",
    memory: 17179869184,
    cpu: 0.42,
    disk: 1000000000000,
    network: 89000000,
    uptime: 2592000,
  },
  {
    name: "Database Server",
    memory: 34359738368,
    cpu: 0.89,
    disk: 2000000000000,
    network: 234000000,
    uptime: 5184000,
  },
];

servers.forEach((server) => {
  console.log(`\n${server.name}:`);
  console.log(`  Memory: ${humanizeData(server.memory)}`);
  console.log(`  CPU: ${humanizePercentage(server.cpu)}`);
  console.log(`  Disk: ${humanizeData(server.disk)}`);
  console.log(`  Network: ${humanizeData(server.network)}/s`);
  console.log(
    `  Uptime: ${humanizeDuration(server.uptime, { verboseUnits: true })}`
  );
});
console.log();

// ==================== 4. E-COMMERCE PRODUCT DISPLAY ====================

console.log("4. 🛒 E-Commerce Product Display");
console.log("--------------------------------");

interface Product {
  name: string;
  price: number;
  weight: number;
  dimensions: string;
  inStock: number;
  sold: number;
}

const products: Product[] = [
  {
    name: "Laptop Pro 15",
    price: 1299.99,
    weight: 1800,
    dimensions: "35x24x2 cm",
    inStock: 1234,
    sold: 5678,
  },
  {
    name: "Wireless Mouse",
    price: 29.99,
    weight: 85,
    dimensions: "12x7x4 cm",
    inStock: 5432,
    sold: 23456,
  },
  {
    name: "External SSD 1TB",
    price: 149.99,
    weight: 45,
    dimensions: "10x6x1 cm",
    inStock: 876,
    sold: 3456,
  },
];

products.forEach((product) => {
  console.log(`\n${product.name}:`);
  console.log(`  Price: $${product.price}`);
  console.log(`  Weight: ${humanizeWeight(product.weight)}`);
  console.log(`  Dimensions: ${product.dimensions}`);
  console.log(
    `  In Stock: ${humanizeNumber(
      product.inStock,
      "generic",
      presets.compact
    )} units`
  );
  console.log(
    `  Total Sold: ${humanizeNumber(
      product.sold,
      "generic",
      presets.compact
    )} units`
  );
});
console.log();

// ==================== 5. FITNESS TRACKING APP ====================

console.log("5. 💪 Fitness Tracking App");
console.log("--------------------------");

interface Workout {
  date: string;
  type: string;
  duration: number;
  distance: number;
  caloriesBurned: number;
  avgSpeed: number;
  avgHeartRate: number;
}

const workouts: Workout[] = [
  {
    date: "2024-11-01",
    type: "Running",
    duration: 3600,
    distance: 10000,
    caloriesBurned: 650,
    avgSpeed: 2.78,
    avgHeartRate: 145,
  },
  {
    date: "2024-11-03",
    type: "Cycling",
    duration: 5400,
    distance: 30000,
    caloriesBurned: 850,
    avgSpeed: 5.56,
    avgHeartRate: 132,
  },
  {
    date: "2024-11-05",
    type: "Swimming",
    duration: 2700,
    distance: 2000,
    caloriesBurned: 450,
    avgSpeed: 0.74,
    avgHeartRate: 125,
  },
];

workouts.forEach((workout) => {
  console.log(`\n${workout.date} - ${workout.type}:`);
  console.log(
    `  Duration: ${humanizeDuration(workout.duration, { verboseUnits: true })}`
  );
  console.log(`  Distance: ${humanizeDistance(workout.distance)}`);
  console.log(`  Calories: ${workout.caloriesBurned} kcal`);
  console.log(
    `  Avg Speed: ${humanizeSpeed(workout.avgSpeed, { unitSystem: "metric" })}`
  );
  console.log(`  Avg Heart Rate: ${workout.avgHeartRate} bpm`);
});
console.log();

// ==================== 6. WEATHER APPLICATION ====================

console.log("6. 🌤️  Weather Application");
console.log("--------------------------");

interface WeatherData {
  city: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  visibility: number;
}

const weatherCities: WeatherData[] = [
  {
    city: "New York",
    temperature: 22,
    feelsLike: 20,
    humidity: 0.68,
    pressure: 1013,
    windSpeed: 5.56,
    visibility: 10000,
  },
  {
    city: "Los Angeles",
    temperature: 28,
    feelsLike: 27,
    humidity: 0.45,
    pressure: 1015,
    windSpeed: 3.33,
    visibility: 15000,
  },
  {
    city: "Chicago",
    temperature: 15,
    feelsLike: 12,
    humidity: 0.72,
    pressure: 1010,
    windSpeed: 8.33,
    visibility: 8000,
  },
];

console.log("For US Users:");
weatherCities.forEach((weather) => {
  const tempF = convertTemperature(
    weather.temperature,
    "celsius",
    "fahrenheit"
  );
  const feelsLikeF = convertTemperature(
    weather.feelsLike,
    "celsius",
    "fahrenheit"
  );

  console.log(`\n${weather.city}:`);
  console.log(
    `  Temperature: ${humanizeTemperature(tempF, {
      temperatureScale: "fahrenheit",
    })}`
  );
  console.log(
    `  Feels Like: ${humanizeTemperature(feelsLikeF, {
      temperatureScale: "fahrenheit",
    })}`
  );
  console.log(`  Humidity: ${humanizePercentage(weather.humidity)}`);
  console.log(
    `  Wind: ${humanizeSpeed(weather.windSpeed, { unitSystem: "imperial" })}`
  );
  console.log(
    `  Visibility: ${humanizeDistance(weather.visibility, {
      unitSystem: "imperial",
    })}`
  );
});
console.log();

// ==================== 7. CLOUD STORAGE MANAGER ====================

console.log("7. ☁️  Cloud Storage Manager");
console.log("---------------------------");

interface StorageBreakdown {
  category: string;
  size: number;
  files: number;
}

const storageData: StorageBreakdown[] = [
  { category: "Documents", size: 2147483648, files: 1234 },
  { category: "Photos", size: 15728640000, files: 5678 },
  { category: "Videos", size: 53687091200, files: 234 },
  { category: "Music", size: 8589934592, files: 3456 },
  { category: "Other", size: 1073741824, files: 987 },
];

const totalSize = storageData.reduce((sum, item) => sum + item.size, 0);
const totalFiles = storageData.reduce((sum, item) => sum + item.files, 0);

console.log(`Total Storage: ${humanizeData(totalSize)}`);
console.log(
  `Total Files: ${humanizeNumber(totalFiles, "generic", presets.compact)}\n`
);

console.log("Breakdown:");
storageData.forEach((item) => {
  const percentage = item.size / totalSize;
  console.log(`  ${item.category}:`);
  console.log(
    `    Size: ${humanizeData(item.size)} (${humanizePercentage(percentage)})`
  );
  console.log(
    `    Files: ${humanizeNumber(item.files, "generic", presets.compact)}`
  );
});
console.log();

// ==================== 8. API RESPONSE TIME MONITORING ====================

console.log("8. ⚡ API Response Time Monitoring");
console.log("----------------------------------");

interface ApiEndpoint {
  endpoint: string;
  avgResponseTime: number;
  maxResponseTime: number;
  minResponseTime: number;
  requests: number;
  errors: number;
}

const endpoints: ApiEndpoint[] = [
  {
    endpoint: "/api/users",
    avgResponseTime: 0.125,
    maxResponseTime: 0.456,
    minResponseTime: 0.023,
    requests: 125678,
    errors: 234,
  },
  {
    endpoint: "/api/products",
    avgResponseTime: 0.089,
    maxResponseTime: 0.321,
    minResponseTime: 0.015,
    requests: 234567,
    errors: 123,
  },
  {
    endpoint: "/api/orders",
    avgResponseTime: 0.234,
    maxResponseTime: 1.234,
    minResponseTime: 0.045,
    requests: 89456,
    errors: 567,
  },
];

endpoints.forEach((api) => {
  const errorRate = api.errors / api.requests;
  console.log(`\n${api.endpoint}:`);
  console.log(`  Avg: ${humanizeDuration(api.avgResponseTime)}`);
  console.log(
    `  Range: ${humanizeRange(
      api.minResponseTime,
      api.maxResponseTime,
      "duration"
    )}`
  );
  console.log(
    `  Requests: ${humanizeNumber(api.requests, "generic", presets.compact)}`
  );
  console.log(`  Errors: ${api.errors} (${humanizePercentage(errorRate)})`);
});
console.log();

// ==================== 9. DATA CENTER STATISTICS ====================

console.log("9. 🏢 Data Center Statistics");
console.log("----------------------------");

const dataCenterStats = {
  totalServers: 1234,
  totalStorage: 5368709120000, // 5 PB
  totalMemory: 17592186044416, // 16 TB
  powerConsumption: 2500, // kW
  coolingCapacity: 3500, // kW
  networkBandwidth: 100000000000, // 100 Gbps
  uptime: 0.9999,
};

console.log("Data Center Overview:");
console.log(
  `  Servers: ${humanizeNumber(
    dataCenterStats.totalServers,
    "generic",
    presets.compact
  )}`
);
console.log(`  Storage: ${humanizeData(dataCenterStats.totalStorage)}`);
console.log(`  Memory: ${humanizeData(dataCenterStats.totalMemory)}`);
console.log(`  Power: ${dataCenterStats.powerConsumption} kW`);
console.log(`  Cooling: ${dataCenterStats.coolingCapacity} kW`);
console.log(
  `  Network: ${humanizeData(dataCenterStats.networkBandwidth, {
    precision: 0,
  })}/s`
);
console.log(
  `  Uptime: ${humanizePercentage(dataCenterStats.uptime, { precision: 4 })}`
);
console.log();

// ==================== 10. SORTING FILE SIZES ====================

console.log("10. 📂 Sorting Files by Size");
console.log("----------------------------");

const files = [
  "document.pdf - 2 MB",
  "video.mp4 - 1.5 GB",
  "photo.jpg - 500 KB",
  "archive.zip - 250 MB",
  "database.db - 5 GB",
  "presentation.pptx - 15 MB",
];

console.log("Unsorted:");
files.forEach((file) => console.log(`  ${file}`));

const sortedFiles = sortHumanized(
  files.map((f) => f.split(" - ")[1]),
  "data"
).map((size, index) => {
  const fileName = files.find((f) => f.includes(size))?.split(" - ")[0];
  return `${fileName} - ${size}`;
});

console.log("\nSorted by size:");
sortedFiles.forEach((file) => console.log(`  ${file}`));
console.log();

console.log("✅ Real-world use cases completed!");
console.log(
  "\n🎉 All examples demonstrate practical applications of @malwayson/humanize-number v2.0"
);
