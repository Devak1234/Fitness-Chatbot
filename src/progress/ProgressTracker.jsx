import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import '../styles/ProgressTracker.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ProgressTracker({ profile, entries, onAddEntry }) {
  const [date, setDate] = useState('');
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');

  const addEntry = () => {
    if (date && weight) {
      const newEntry = { date, weight: parseFloat(weight), notes, id: Date.now() };
      const updated = [...entries, newEntry].sort((a, b) => new Date(a.date) - new Date(b.date));
      onAddEntry(updated);
      setDate('');
      setWeight('');
      setNotes('');
    }
  };

  const calculateBMI = () => {
    if (profile.height && profile.weight) {
      const heightM = profile.height / 100;
      return (profile.weight / (heightM * heightM)).toFixed(2);
    }
    return null;
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  const chartData = {
    labels: entries.map(entry => {
      const date = new Date(entry.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'Weight (kg)',
        data: entries.map(entry => entry.weight),
        borderColor: '#0ea5e9', // Sky blue 500
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        pointBackgroundColor: '#0ea5e9',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1f2937', // gray-800
        titleColor: '#f9fafb', // gray-50
        bodyColor: '#f9fafb',
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: function (context) {
            const entry = entries[context[0].dataIndex];
            return new Date(entry.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
          },
          label: function (context) {
            const entry = entries[context.dataIndex];
            let label = `Weight: ${context.parsed.y} kg`;
            if (entry.notes) {
              label += `\nNotes: ${entry.notes}`;
            }
            return label;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: '#f3f4f6', // gray-100
          drawBorder: false,
        },
        ticks: {
          color: '#6b7280', // gray-500
          font: {
            size: 11
          }
        },
      },
      y: {
        grid: {
          color: '#f3f4f6',
          drawBorder: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 11
          },
          callback: function (value) {
            return value + ' kg';
          }
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  const bmi = calculateBMI();
  const bmiCategory = bmi ? getBMICategory(bmi) : null;

  const startWeight = entries.length > 0 ? entries[0].weight : null;
  const currentWeight = entries.length > 0 ? entries[entries.length - 1].weight : null;
  const targetWeight = profile.targetWeight || null; // Assume we add this to profile
  const weeksOnPlan = entries.length > 1 ? Math.ceil((new Date(entries[entries.length - 1].date) - new Date(entries[0].date)) / (7 * 24 * 60 * 60 * 1000)) : 0;

  const calculateTrend = () => {
    if (entries.length < 2) return null;
    const first = entries[0].weight;
    const last = entries[entries.length - 1].weight;
    const change = last - first;
    const weeks = weeksOnPlan;
    if (change > 0) return `Gained ${change.toFixed(1)} kg in ${weeks} weeks`;
    if (change < 0) return `Lost ${Math.abs(change).toFixed(1)} kg in ${weeks} weeks`;
    return 'Weight stable';
  };

  const trend = calculateTrend();

  const checkHealthWarnings = () => {
    const warnings = [];
    for (let i = 1; i < entries.length; i++) {
      const prev = entries[i - 1].weight;
      const curr = entries[i].weight;
      const changePercent = ((curr - prev) / prev) * 100;
      if (Math.abs(changePercent) > 2) {
        const type = changePercent > 2 ? 'gain' : 'loss';
        warnings.push({
          type: changePercent > 2 ? 'danger' : 'warning',
          message: `Rapid weight ${type} detected (${changePercent.toFixed(1)}% in one week). Please consult a doctor.`
        });
      }
    }
    return warnings;
  };

  const healthWarnings = checkHealthWarnings();

  const exportCSV = () => {
    const headers = [
      'Date',
      'Weight (kg)',
      'BMI',
      'BMI Category',
      'Weight Change (kg)',
      'Weight Change (%)',
      'Days Since Start',
      'Notes'
    ];

    const csvRows = [headers.join(',')];

    entries.forEach((entry, index) => {
      const entryDate = new Date(entry.date);
      const startDate = new Date(entries[0].date);
      const daysSinceStart = Math.floor((entryDate - startDate) / (1000 * 60 * 60 * 24));

      // Calculate BMI for this entry if we have height data
      const bmi = profile.height ? (entry.weight / Math.pow(profile.height / 100, 2)).toFixed(2) : 'N/A';
      const bmiCategory = bmi !== 'N/A' ? getBMICategory(parseFloat(bmi)) : 'N/A';

      // Calculate weight change from previous entry
      let weightChange = '';
      let weightChangePercent = '';
      if (index > 0) {
        const prevWeight = entries[index - 1].weight;
        weightChange = (entry.weight - prevWeight).toFixed(2);
        weightChangePercent = ((entry.weight - prevWeight) / prevWeight * 100).toFixed(2);
      }

      const row = [
        entry.date,
        entry.weight,
        bmi,
        bmiCategory,
        weightChange,
        weightChangePercent,
        daysSinceStart,
        `"${entry.notes || ''}"`
      ];

      csvRows.push(row.join(','));
    });

    // Add summary information at the end
    csvRows.push('');
    csvRows.push('"Summary Information"');
    csvRows.push(`"Total Entries","${entries.length}"`);
    csvRows.push(`"Start Weight","${startWeight || 'N/A'}"`);
    csvRows.push(`"Current Weight","${currentWeight || 'N/A'}"`);
    csvRows.push(`"Target Weight","${targetWeight || 'Not set'}"`);
    csvRows.push(`"Weeks on Plan","${weeksOnPlan}"`);
    csvRows.push(`"Trend","${trend || 'N/A'}"`);
    csvRows.push(`"Current BMI","${bmi || 'N/A'}"`);
    csvRows.push(`"BMI Category","${bmiCategory || 'N/A'}"`);

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fitness_progress_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col text-center md:text-left">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">📊 Progress Tracker</h2>
        <p className="text-gray-500 text-lg">Track your fitness journey and monitor your progress over time</p>
      </div>

      {/* Key Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: '🏁', label: 'Start Weight', value: startWeight ? `${startWeight} kg` : 'N/A' },
          { icon: '📍', label: 'Current Weight', value: currentWeight ? `${currentWeight} kg` : 'N/A' },
          { icon: '🎯', label: 'Target Weight', value: targetWeight ? `${targetWeight} kg` : 'Not set' },
          { icon: '📅', label: 'Weeks on Plan', value: weeksOnPlan }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl text-2xl">
              {stat.icon}
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.label}</div>
              <div className="text-xl font-bold text-gray-900">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BMI and Health Info */}
        {bmi && (
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10 flex flex-col gap-4">
              <h3 className="text-lg font-bold flex items-center gap-2">🏋️ Body Metrics</h3>
              <div className="flex items-baseline gap-4">
                <span className="text-sm font-medium opacity-90">Current BMI:</span>
                <span className="text-4xl font-bold">{bmi}</span>
              </div>
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${bmiCategory === 'Normal' ? 'bg-green-400/20 text-green-100 border border-green-400/30' :
                    bmiCategory === 'Underweight' || bmiCategory === 'Overweight' ? 'bg-yellow-400/20 text-yellow-100 border border-yellow-400/30' :
                      'bg-red-400/20 text-red-100 border border-red-400/30'
                  }`}>
                  {bmiCategory}
                </span>
              </div>
            </div>
            <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-10 rounded-full blur-3xl transform translate-x-10 -translate-y-10"></div>
          </div>
        )}

        {/* Trend Summary */}
        {trend && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-green-500 flex flex-col justify-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">📈 Progress Trend</h3>
            <p className="text-xl font-medium text-gray-800 mb-2">{trend}</p>
            {entries.length >= 2 && (
              <div className="mt-2">
                <Badge variant="secondary" size="small">
                  {entries.length} entries logged
                </Badge>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Health Warnings */}
      {healthWarnings.length > 0 && (
        <Card title="⚠️ Health Alerts" className="border-l-4 border-red-500">
          <div className="flex flex-col gap-3">
            {healthWarnings.map((warning, index) => (
              <div key={index} className={`p-4 rounded-xl border-l-4 ${warning.type === 'danger' ? 'bg-red-50 border-red-500 text-red-700' : 'bg-yellow-50 border-yellow-500 text-yellow-700'}`}>
                <p className="text-sm font-medium">{warning.message}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Add New Entry */}
      <Card title="➕ Add Progress Entry">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">📅 Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">⚖️ Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="70.5"
                step="0.1"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">📝 Notes (optional)</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How do you feel today?"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div className="pt-2">
            <Button onClick={addEntry} variant="primary" className="w-full md:w-auto" disabled={!date || !weight}>
              Add Entry
            </Button>
          </div>
        </div>
      </Card>

      {/* Progress Chart */}
      {entries.length > 0 && (
        <Card title="📊 Weight Progress Chart">
          <div className="h-80 w-full mb-6">
            <Line data={chartData} options={chartOptions} />
          </div>
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <Button onClick={exportCSV} variant="outline" size="small">
              📥 Export CSV
            </Button>
          </div>
        </Card>
      )}

      {/* Recent Entries */}
      {entries.length > 0 && (
        <Card title="📋 Recent Entries">
          <div className="flex flex-col gap-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
            {entries.slice(-10).reverse().map(entry => (
              <div key={entry.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                <div className="min-w-[100px] text-sm font-medium text-gray-500">
                  {new Date(entry.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
                <div className="font-bold text-lg text-gray-900 w-24 text-center sm:text-left">
                  {entry.weight} kg
                </div>
                {entry.notes && (
                  <div className="flex-1 text-sm text-gray-500 italic border-l-2 border-gray-200 pl-3">
                    {entry.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
          {entries.length > 10 && (
            <div className="text-center pt-4 mt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">Showing last 10 of {entries.length} entries</p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

export default ProgressTracker;