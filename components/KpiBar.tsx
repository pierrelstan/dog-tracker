"use client";
import { useSelector } from "react-redux";
import { selectKpis } from "@/lib/selectors";
import { RootState } from "@/store";

export default function KpiBar() {
  const { avgSpeed, totalDistanceKm, activePct, lowestBattery } =
    useSelector(selectKpis);
  const lookback = useSelector((s: RootState) => s.ui.lookbackMinutes);

  const kpis = [
    {
      label: "Active Dogs",
      value: activePct.toFixed(1),
      unit: "%",
      icon: "🐕",
      color: "from-green-500 to-emerald-500",
      change: "+2 from yesterday",
    },
    {
      label: `${`Distance (last ${lookback}m)`}`,
      value: totalDistanceKm.toFixed(2),
      unit: "km",
      icon: "📍",
      color: "from-blue-500 to-cyan-500",
      change: "+1.2km today",
    },
    {
      label: `${`Avg speed (last ${lookback.toFixed(1)}m)`}`,
      value: avgSpeed.toFixed(1),
      unit: "km/h",
      icon: "⚡",
      color: "from-orange-500 to-red-500",
      change: "↑ 12% this week",
    },
    {
      label: "Fleet Status",
      value: lowestBattery ? `${lowestBattery.value.toFixed(1)}` : "N/A",
      unit: `${lowestBattery ? `% (${lowestBattery.name})` : ""}`,
      icon: "✅",
      color: "from-purple-500 to-pink-500",
      change: "All systems operational",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => (
        <div
          key={index}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600/50 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-12 h-12 bg-gradient-to-br ${kpi.color} rounded-xl flex items-center justify-center text-2xl shadow-lg`}
            >
              {kpi.icon}
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {kpi.value}
                {kpi.unit}
              </div>
              <div className="text-sm text-slate-400">{kpi.label}</div>
            </div>
          </div>
          <div className="text-xs text-slate-500 bg-slate-900/50 rounded-lg px-3 py-2">
            {kpi.change}
          </div>
        </div>
      ))}
    </div>
  );
}
