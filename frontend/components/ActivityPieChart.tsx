"use client";
import { useSelector } from "react-redux";
import { selectActivityBreakdown } from "@/lib/selectors";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
const STATUS_COLORS = {
  moving: "#22c55e", // green
  idle: "#64748b", // gray
  low_battery: "#eab308", // yellow
  offline: "#ef4444", // red
};

export default function ActivityPieChart() {
  const parts = useSelector(selectActivityBreakdown);

  const data = {
    labels: parts.map((p) => p.label),
    datasets: [
      {
        data: parts.map((p) => p.value),
        backgroundColor: [
          STATUS_COLORS.moving,
          STATUS_COLORS.idle,
          STATUS_COLORS.low_battery,
          STATUS_COLORS.offline,
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    animation: false,
    plugins: { legend: { position: "bottom" as const } },
  };

  return (
    <div className="rounded-xl border p-4">
      <Pie data={data} options={options} />
    </div>
  );
}
