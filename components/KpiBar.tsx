"use client";
import { useSelector } from "react-redux";
import { selectKpis } from "@/lib/selectors";
import { RootState } from "@/store";

function Card({
  label,
  value,
  suffix,
}: {
  label: string;
  value: string;
  suffix?: string;
}) {
  return (
    <div className="rounded-xl border p-8 flex flex-col">
      <div className="text-xs uppercase tracking-wide text-gray-500">
        {label}
      </div>
      <div className="text-2xl font-semibold mt-1">
        {value}
        {suffix ? (
          <span className="text-sm text-gray-500 ml-1">{suffix}</span>
        ) : null}
      </div>
    </div>
  );
}

export default function KpiBar() {
  const { avgSpeed, totalDistanceKm, activePct, lowestBattery } =
    useSelector(selectKpis);
  const lookback = useSelector((s: RootState) => s.ui.lookbackMinutes);

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
      data-testid="kpi-cards"
    >
      <Card
        label={`Avg speed (last ${lookback}m)`}
        value={avgSpeed.toFixed(1)}
        suffix="km/h"
      />
      <Card
        label={`Distance (last ${lookback}m)`}
        value={totalDistanceKm.toFixed(2)}
        suffix="km"
      />
      <Card label="Active time" value={`${activePct}`} suffix="%" />
      <Card
        label="Lowest battery"
        value={lowestBattery ? `${lowestBattery.value.toFixed(1)}` : "N/A"}
        suffix={lowestBattery ? `% (${lowestBattery.name})` : ""}
      />
    </div>
  );
}
