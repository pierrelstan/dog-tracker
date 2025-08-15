"use client";
import { useDispatch } from "react-redux";
import { clearAlerts } from "@/store/dogsSlice";

export default function AlertsClearButton() {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(clearAlerts())}
      className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-600 transition-colors duration-150 shadow-sm"
    >
      Clear
    </button>
  );
}
