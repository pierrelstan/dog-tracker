"use client";
import { useDispatch, useSelector } from "react-redux";
import { setLookbackMinutes, setStatus, StatusFilter } from "@/store/uiSlice";
import { RootState } from "@/store";

export default function Controls() {
  const dispatch = useDispatch();
  const status = useSelector((s: RootState) => s.ui.status);
  const lookback = useSelector((s: RootState) => s.ui.lookbackMinutes);

  const setStatusValue = (v: StatusFilter) => dispatch(setStatus(v));
  const setLb = (v: number) => dispatch(setLookbackMinutes(v));

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600">Status</label>
        <select
          className="border rounded-md px-2 py-1 text-sm"
          value={status}
          onChange={(e) => setStatusValue(e.target.value as StatusFilter)}
        >
          <option value="all">All</option>
          <option value="moving">Moving</option>
          <option value="idle">Idle</option>
          <option value="low_battery">Low battery</option>
          <option value="offline">Offline</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600">Lookback</label>
        <select
          className="border rounded-md px-2 py-1 text-sm"
          value={lookback}
          onChange={(e) => setLb(parseInt(e.target.value))}
        >
          <option value={5}>5m</option>
          <option value={15}>15m</option>
          <option value={30}>30m</option>
          <option value={60}>60m</option>
        </select>
      </div>
    </div>
  );
}
