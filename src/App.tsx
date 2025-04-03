import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Thermometer, Clock, Battery, User, AirVent, CookingPot as Oven, Refrigerator, Fan, Lightbulb } from 'lucide-react';

interface ApplianceData {
  name: string;
  usage: number;
  icon: React.ReactNode;
  recommendation: string;
}

function App() {
  const [inputValues, setInputValues] = useState({
    temperature: 20,
    timeOfDay: 12,
    energyUsage: 50,
    userPresence: true
  });

  const [showResults, setShowResults] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [applianceData, setApplianceData] = useState<ApplianceData[]>([]);

  const calculateApplianceData = () => {
    // This is where we would normally call the fuzzy logic API
    // For now, we'll simulate the response based on input values
    const calculateUsage = (base: number, temp: number, time: number, energy: number, presence: boolean) => {
      let usage = base;
      
      // Adjust for temperature
      if (temp > 30) usage += 20;
      else if (temp < 10) usage -= 10;
      
      // Adjust for time of day
      if (time >= 9 && time <= 17) usage += 10;
      
      // Adjust for energy usage
      if (energy > 70) usage -= 15;
      
      // Adjust for presence
      if (!presence) usage = Math.min(usage, 20);
      
      return Math.min(Math.max(usage, 0), 100);
    };

    const newData = [
      {
        name: 'AC',
        usage: calculateUsage(50, inputValues.temperature, inputValues.timeOfDay, inputValues.energyUsage, inputValues.userPresence),
        icon: <AirVent className="w-6 h-6" />,
        recommendation: "Consider optimizing AC usage during peak hours"
      },
      {
        name: 'Oven',
        usage: calculateUsage(40, inputValues.temperature, inputValues.timeOfDay, inputValues.energyUsage, inputValues.userPresence),
        icon: <Oven className="w-6 h-6" />,
        recommendation: "Usage is moderate, good energy management"
      },
      {
        name: 'Refrigerator',
        usage: calculateUsage(60, inputValues.temperature, inputValues.timeOfDay, inputValues.energyUsage, inputValues.userPresence),
        icon: <Refrigerator className="w-6 h-6" />,
        recommendation: "Consider checking door seals and temperature settings"
      },
      {
        name: 'Fan',
        usage: calculateUsage(30, inputValues.temperature, inputValues.timeOfDay, inputValues.energyUsage, inputValues.userPresence),
        icon: <Fan className="w-6 h-6" />,
        recommendation: "Efficient usage, keep it up!"
      },
      {
        name: 'Light',
        usage: calculateUsage(25, inputValues.temperature, inputValues.timeOfDay, inputValues.energyUsage, inputValues.userPresence),
        icon: <Lightbulb className="w-6 h-6" />,
        recommendation: "Great energy-saving practices"
      }
    ];

    setApplianceData(newData);
    setShowResults(true);
    setShowGraph(false);
  };

  const chartData = applianceData.map(item => ({
    name: item.name,
    usage: item.usage
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Smart Home Energy Dashboard</h1>
        
        {/* Input Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Thermometer className="text-blue-500" />
              <span className="font-medium">Temperature</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={inputValues.temperature}
              onChange={(e) => setInputValues({...inputValues, temperature: Number(e.target.value)})}
              className="w-full"
            />
            <span className="text-sm text-gray-600">{inputValues.temperature}°C</span>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="text-blue-500" />
              <span className="font-medium">Time of Day</span>
            </div>
            <input
              type="range"
              min="0"
              max="24"
              value={inputValues.timeOfDay}
              onChange={(e) => setInputValues({...inputValues, timeOfDay: Number(e.target.value)})}
              className="w-full"
            />
            <span className="text-sm text-gray-600">{inputValues.timeOfDay}:00</span>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Battery className="text-blue-500" />
              <span className="font-medium">Energy Usage</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={inputValues.energyUsage}
              onChange={(e) => setInputValues({...inputValues, energyUsage: Number(e.target.value)})}
              className="w-full"
            />
            <span className="text-sm text-gray-600">{inputValues.energyUsage}%</span>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <User className="text-blue-500" />
              <span className="font-medium">User Presence</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={inputValues.userPresence}
                onChange={(e) => setInputValues({...inputValues, userPresence: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-600">
                {inputValues.userPresence ? 'Present' : 'Absent'}
              </span>
            </label>
          </div>
        </div>

        {/* Calculate Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={calculateApplianceData}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition-colors"
          >
            Calculate
          </button>
        </div>

        {/* Appliance Status Cards */}
        {showResults && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {applianceData.map((appliance) => (
                <div key={appliance.name} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-blue-500">{appliance.icon}</div>
                    <h3 className="text-lg font-medium">{appliance.name}</h3>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Usage</span>
                      <span className="text-sm font-medium">{appliance.usage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 rounded-full h-2"
                        style={{ width: `${appliance.usage}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{appliance.recommendation}</p>
                </div>
              ))}
            </div>

            {/* Show Graph Button */}
            <div className="flex justify-center mb-8">
              <button
                onClick={() => setShowGraph(true)}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition-colors"
              >
                Show Graph
              </button>
            </div>

            {/* Energy Usage Chart */}
            {showGraph && (
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <h2 className="text-xl font-semibold mb-4">Energy Usage Overview</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="usage" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;