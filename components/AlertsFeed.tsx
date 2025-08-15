"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function AlertsFeed() {
  const alerts = useSelector((s: RootState) => s.dogs.alerts);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="p-4 space-y-3 h-full overflow-y-auto">
      {alerts.length === 0 && (
        <div className="p-3 text-[10px] text-gray-500">No alerts.</div>
      )}
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-slate-600/50 transition-all duration-300"
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                alert.type === "error"
                  ? "bg-red-400"
                  : alert.type === "warning"
                  ? "bg-yellow-400"
                  : "bg-blue-400"
              }`}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white leading-relaxed">
                {alert.message}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    alert.type === "error"
                      ? "bg-red-500/20 text-red-400"
                      : alert.type === "warning"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                </span>
                <span className="text-xs text-slate-500">
                  {formatTime(new Date(alert.t))}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
