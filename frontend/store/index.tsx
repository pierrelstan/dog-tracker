"use client";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import dogsReducer, { setInitial, upsertMany, Dog } from "./dogsSlice";
import uiReducer from "./uiSlice";
import { ReactNode, useEffect } from "react";
import { getSocket } from "@/lib/socket";

export const store = configureStore({
  reducer: { dogs: dogsReducer, ui: uiReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export function ReduxProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const socket = getSocket();
    const onInitial = (dogs: Dog[]) => store.dispatch(setInitial(dogs));
    const onUpdate = (dogs: Dog[]) => store.dispatch(upsertMany(dogs));

    socket.on("dogs:initial", onInitial);
    socket.on("dogs:update", onUpdate);
    return () => {
      socket.off("dogs:initial", onInitial);
      socket.off("dogs:update", onUpdate);
    };
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
