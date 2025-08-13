"use client";

import { useSelector } from "react-redux";
import { selectDistancePerDog } from "@/lib/selectors";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function DistanceBarChart() {
  const dataPoints = useSelector(selectDistancePerDog);

  const data = {
    labels: dataPoints.map((d) => d.name),
    datasets: [
      {
        label: "Distance (km)",
        data: dataPoints.map((d) => d.km),
        backgroundColor: "#16a34a",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: false as const,
    scales: {
      y: { beginAtZero: true },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: (context: any) =>
            `${context.dataset.label}: ${context.formattedValue} km`,
        },
      },
    },
  };

  return (
    <div className="rounded-xl border p-4">
      <Bar data={data} options={options} />
    </div>
  );
}
