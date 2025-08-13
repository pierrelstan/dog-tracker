"use client";

import dynamic from "next/dynamic";
const MapView = dynamic(() => import("./MapViewInner"), { ssr: false });
export default MapView;
