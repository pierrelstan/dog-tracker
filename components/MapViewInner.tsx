/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon, type Icon } from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { selectDog } from "@/store/dogsSlice";
import { selectFilteredIds } from "@/lib/selectors";

import { FaDog as DogIcon } from "react-icons/fa6";
import ReactDOMServer from "react-dom/server";

/** Tailwind class names for marker colors */
const STATUS_COLOR = {
  moving: "bg-green-400",
  idle: "bg-gray-400",
  low_battery: "bg-yellow-400",
  offline: "bg-red-400",
} as const;

/** Cache Leaflet Icons per status so we don't rebuild every render */
type Status = "moving" | "idle" | "low_battery" | "offline";

export default function MapViewInner() {
  const items = useSelector((s: RootState) => s.dogs.items);
  const orderFiltered = useSelector(selectFilteredIds);
  const dispatch = useDispatch();

  function makeLucideDogDataUrl(color: string) {
    console.log(color);
    return divIcon({
      html: `
        <div class="relative">
          <div class="w-6 h-6 rounded-full shadow-lg border-2  ${color} flex items-center justify-center">
            <div class="w-3 h-3 rounded-full border-2  ${color}"></div>
          </div>
          <div class="absolute inset-0 w-6 h-6 rounded-full ${color} animate-ping opacity-75"></div>
        </div>
      `,
    });
  }

  const center = useMemo<[number, number]>(() => {
    const firstId = orderFiltered[0];
    if (!firstId) return [37.7749, -122.4194];
    const d = items[firstId];
    return [d.lat, d.lng];
  }, [items, orderFiltered]);

  // Load Leaflet only on client
  const [Lmod, setLmod] = useState<any>(null);
  useEffect(() => {
    let mounted = true;
    (async () => {
      const L = await import("leaflet");
      if (mounted) setLmod(L);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Memoized icon cache
  // Memoized icon cache
  const iconCache = useRef<Record<Status, any>>({
    moving: null,
    idle: null,
    low_battery: null,
    offline: null,
  });

  function getIcon(status: Status): any {
    if (!Lmod) return null;
    if (iconCache.current[status]) return iconCache.current[status];

    const colorClass = STATUS_COLOR[status];
    const icon = makeLucideDogDataUrl(colorClass);

    iconCache.current[status] = icon;
    return icon;
  }
  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom
      className="w-full h-full"
      data-testid="main-map"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {Lmod &&
        orderFiltered.map((id) => {
          const d = items[id];
          const icon = getIcon(d.status);
          return (
            <Marker
              key={id}
              position={[d.lat, d.lng]}
              icon={icon!}
              eventHandlers={{ click: () => dispatch(selectDog(id)) }}
            >
              <Popup>
                <div className="text-sm">
                  <div className="font-semibold">{d.name}</div>
                  <div>Status: {d.status}</div>
                  <div>Speed: {d.speed.toFixed(1)} km/h</div>
                  <div>Heading: {Math.round(d.heading)}°</div>
                  <div>Battery: {d.battery ?? "N/A"}%</div>
                  {/* {selectedId === id && (
                    <div className="mt-1 text-green-600">Selected</div>
                  )} */}
                </div>
              </Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
}
