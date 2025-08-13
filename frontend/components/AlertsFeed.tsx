"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { clearAlerts } from "@/store/dogsSlice";

function Tag({ type }: { type: string }) {
  const color =
    type === "battery"
      ? "bg-yellow-100 text-yellow-700"
      : type === "speed"
      ? "bg-blue-100 text-blue-700"
      : type === "status"
      ? "bg-purple-100 text-purple-700"
      : "bg-gray-100 text-gray-700";
  return <span className={`px-2 py-0.5 text-xs rounded ${color}`}>{type}</span>;
}

export default function AlertsFeed() {
  const dispatch = useDispatch();
  const alerts = useSelector((s: RootState) => s.dogs.alerts);

  const dynamicHeight = Math.min(240);

  return (
    <div className="rounded-xl border overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b bg-gray-50">
        <div className="font-medium text-sm">Alerts</div>
        <button
          onClick={() => dispatch(clearAlerts())}
          className="text-xs text-gray-600 hover:underline"
        >
          Clear
        </button>
      </div>
      <div
        className="overflow-auto divide-y transition-all duration-300"
        style={{ height: `${dynamicHeight}px` }}
      >
        {alerts.length === 0 && (
          <div className="p-3 text-[10px] text-gray-500">No alerts.</div>
        )}
        {alerts.map((a) => (
          <div key={a.id} className="p-3 text-[10px] flex items-center gap-2">
            <Tag type={a.type} />
            <span className="text-[10px]">{a.message}</span>
            <span className="ml-auto text-[10px] text-gray-400">
              {new Date(a.t).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
