"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  TimeSeriesScale,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";

ChartJS.register(
  LineElement,
  LinearScale,
  TimeSeriesScale,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale
);

export default function SpeedChart() {
  const { selectedId, history, items } = useSelector((s: RootState) => s.dogs);
  if (!selectedId) {
    return (
      <div className="text-sm text-gray-500">
        Select a dog (click a marker or name) to view speed history.
      </div>
    );
  }
  const hist = history[selectedId] ?? [];
  const dog = items[selectedId];

  const data = {
    labels: hist.map((p: { t: string | number | Date }) =>
      new Date(p.t).toLocaleTimeString()
    ),
    datasets: [
      {
        label: `${dog.name} speed (km/h)`,
        data: hist.map((p: { speed: number }) => p.speed),
        fill: false,
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: false as const,
    scales: {
      y: { beginAtZero: true, suggestedMax: 16 },
    },
    plugins: {
      legend: { display: true },
      tooltip: { intersect: false, mode: "index" as const },
    },
  };

  console.log(data);
  return (
    <div className="w-full rounded-xl border p-4">
      <Line data={data} options={options} />
    </div>
  );
}
