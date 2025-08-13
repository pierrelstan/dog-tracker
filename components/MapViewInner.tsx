/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { Icon } from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { selectDog } from "@/store/dogsSlice";
import { selectFilteredIds } from "@/lib/selectors";

import { FaDog as DogIcon } from "react-icons/fa6";
import ReactDOMServer from "react-dom/server";

/** Tailwind-like color hex codes */
const STATUS_COLOR = {
  moving: "#16a34a",
  idle: "#6b7280",
  low_battery: "#ca8a04",
  offline: "#dc2626",
} as const;

/** Cache Leaflet Icons per status so we don't rebuild every render */
type Status = "moving" | "idle" | "low_battery" | "offline";

function svgToDataUrl(svg: string) {
  // Ensure minimal XML header for better rendering in some browsers
  const svgWithHeader = svg.startsWith("<?xml")
    ? svg
    : `<?xml version="1.0" encoding="UTF-8"?>${svg}`;
  return `data:image/svg+xml;base64,${btoa(svgWithHeader)}`;
}

function makeLucideDogDataUrl(color: string, size = 36) {
  const svg = ReactDOMServer.renderToString(
    // stroke only; you can add fill="currentColor" if you prefer solid
    <DogIcon width={size} height={size} color={color} strokeWidth={2.2} />
  );
  return svgToDataUrl(svg);
}

export default function MapViewInner() {
  const items = useSelector((s: RootState) => s.dogs.items);
  const orderFiltered = useSelector(selectFilteredIds);
  const dispatch = useDispatch();

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
  const iconCache = useRef<Record<Status, Icon | null>>({
    moving: null,
    idle: null,
    low_battery: null,
    offline: null,
  });

  function getIcon(status: Status): Icon | null {
    if (!Lmod) return null;
    if (iconCache.current[status]) return iconCache.current[status];

    const color = STATUS_COLOR[status];
    const url = makeLucideDogDataUrl(color, 36);

    const icon = new Lmod.Icon({
      iconUrl: url,
      iconSize: [36, 36],
      iconAnchor: [18, 34], // bottom-center-ish
      popupAnchor: [0, -32],
      shadowUrl: undefined,
    });

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
