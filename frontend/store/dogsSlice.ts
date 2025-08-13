import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DogStatus = "moving" | "idle" | "low_battery" | "offline";

export type Dog = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  speed: number;    
  heading: number;   
  status: DogStatus;
  battery?: number; 
  updatedAt: number;
};

type HistoryPoint = {
  t: number;
  lat: number;
  lng: number;
  speed: number;
  status: DogStatus;
  battery?: number;
};

type DogsState = {
  items: Record<string, Dog>;
  order: string[];
  selectedId: string | null;

  history: Record<string, HistoryPoint[]>;
  alerts: { id: string; dogId: string; type: string; message: string; t: number }[];
};

const initialState: DogsState = {
  items: {},
  order: [],
  selectedId: null,
  history: {},
  alerts: []
};

const MAX_POINTS = 60 * 5;
const SPEED_ALERT = 20;
const LOW_BATT = 10;

function pushHistory(state: DogsState, d: Dog) {
  const arr = state.history[d.id] || [];
  arr.push({ t: d.updatedAt, lat: d.lat, lng: d.lng, speed: d.speed, status: d.status, battery: d.battery });
  if (arr.length > MAX_POINTS) arr.splice(0, arr.length - MAX_POINTS);
  state.history[d.id] = arr;
}

function addAlert(state: DogsState, dogId: string, type: string, message: string, t: number) {
  state.alerts.unshift({ id: `${dogId}-${t}-${type}`, dogId, type, message, t });
 
  if (state.alerts.length > 200) state.alerts.splice(200);
}

export const dogsSlice = createSlice({
  name: "dogs",
  initialState,
  reducers: {
    setInitial(state, action: PayloadAction<Dog[]>) {
      state.items = {};
      state.order = action.payload.map((d) => d.id);
      for (const d of action.payload) {
        state.items[d.id] = d;
        pushHistory(state, d);
      }
    },
    upsertMany(state, action: PayloadAction<Dog[]>) {
      for (const d of action.payload) {
        const prev = state.items[d.id];
        state.items[d.id] = d;
        if (!state.order.includes(d.id)) state.order.push(d.id);
        pushHistory(state, d);

        // Alerts
        if (d.speed > SPEED_ALERT) addAlert(state, d.id, "speed", `${d.name} exceeded ${SPEED_ALERT} km/h`, d.updatedAt);
        if ((d.battery ?? 100) <= LOW_BATT) addAlert(state, d.id, "battery", `${d.name} battery low (${d.battery ?? 0}%)`, d.updatedAt);
        if (prev && prev.status !== d.status) addAlert(state, d.id, "status", `${d.name} is now ${d.status}`, d.updatedAt);
      }
    },
    selectDog(state, action: PayloadAction<string | null>) {
      state.selectedId = action.payload;
    },
    clearAlerts(state) {
      state.alerts = [];
    }
  }
});

export const { setInitial, upsertMany, selectDog, clearAlerts } = dogsSlice.actions;
export default dogsSlice.reducer;
