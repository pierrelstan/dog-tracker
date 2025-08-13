/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "@/store";
import { haversineKm } from "./geo";
import { createSelector } from "@reduxjs/toolkit";


export const selectFilter = (s: RootState) => s.ui.status;
export const selectLookback = (s: RootState) => s.ui.lookbackMinutes;

export const selectFilteredIds = createSelector(
  [(s: RootState) => s.dogs.order, (s) => s.dogs.items, selectFilter],
  (order, items, status) => {
    if (status === "all") return order;
    return order.filter(id => items[id]?.status === status);
  }
);

export const selectKpis = createSelector(
  [(s: RootState) => s.dogs.items, (s) => s.dogs.history, (s) => s.dogs.order, selectLookback],
  (items, history, order, lookback) => {
    const now = Date.now();
    let totalAvgSpeed = 0;
    let count = 0;
    let totalDistance = 0;
    let totalActiveMs = 0;
    let totalIdleMs = 0;
    let lowestBattery: { name: string; value: number } | null = null;

    for (const id of order) {
      const h = (history[id] || []).filter((p: any) => now - p.t <= lookback * 60_000);
      if (h.length >= 2) {
        // avg speed
        const avg = h.reduce((acc: number, p: any) => acc + p.speed, 0) / h.length;
        totalAvgSpeed += avg;
        count++;

        // distance
        for (let i = 1; i < h.length; i++) {
          totalDistance += haversineKm(h[i-1].lat, h[i-1].lng, h[i].lat, h[i].lng);
        }

        // active vs idle (approx by last statuses)
        for (let i = 1; i < h.length; i++) {
          const dt = h[i].t - h[i-1].t;
          if (h[i].status === "moving") totalActiveMs += dt;
          else totalIdleMs += dt;
        }
      }

      const b = items[id]?.battery ?? null;
      if (b !== null) {
        if (!lowestBattery || b < lowestBattery.value) lowestBattery = { name: items[id].name, value: b };
      }
    }

    const avgSpeed = count ? totalAvgSpeed / count : 0;
    const totalDistanceKm = totalDistance; // already in km
    const activePct = (totalActiveMs + totalIdleMs) > 0 ? Math.round((totalActiveMs / (totalActiveMs + totalIdleMs)) * 100) : 0;

    return {
      avgSpeed,
      totalDistanceKm,
      activePct,
      lowestBattery // can be null
    };
  }
);

export const selectDistancePerDog = createSelector(
  [(s: RootState) => s.dogs.history, (s: RootState) => s.dogs.items, (s: RootState) => s.dogs.order, selectLookback],
  (history, items, order, lookback) => {
    const now = Date.now();
    const data: { name: string; km: number }[] = [];
    for (const id of order) {
      const h = (history[id] || []).filter(p => now - p.t <= lookback * 60_000);
      let km = 0;
      for (let i = 1; i < h.length; i++) {
        km += haversineKm(h[i-1].lat, h[i-1].lng, h[i].lat, h[i].lng);
      }
      data.push({ name: items[id]?.name ?? id, km });
    }
    return data;
  }
);

export const selectActivityBreakdown = createSelector(
  [(s: RootState) => s.dogs.history, (s: RootState) => s.dogs.order, selectLookback],
  (history, order, lookback) => {
    const now = Date.now();
    let activeMs = 0, idleMs = 0, lowMs = 0, offMs = 0;
    for (const id of order) {
      const h = (history[id] || []).filter(p => now - p.t <= lookback * 60_000);
      for (let i = 1; i < h.length; i++) {
        const dt = h[i].t - h[i-1].t;
        const st = h[i].status;
        if (st === "moving") activeMs += dt;
        else if (st === "idle") idleMs += dt;
        else if (st === "low_battery") lowMs += dt;
        else offMs += dt;
      }
    }
    const total = activeMs + idleMs + lowMs + offMs || 1;
    return [
      { label: "Moving", value: Math.round((activeMs/total)*100) },
      { label: "Idle", value: Math.round((idleMs/total)*100) },
      { label: "Low battery", value: Math.round((lowMs/total)*100) },
      { label: "Offline", value: Math.round((offMs/total)*100) }
    ];
  }
);
