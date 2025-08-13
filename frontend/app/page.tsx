"use client";
import React from "react";
import { ReduxProvider } from "@/store";
import MapView from "@/components/MapView";
import KpiBar from "@/components/KpiBar";
import DogList from "@/components/DogList";
import AlertsFeed from "@/components/AlertsFeed";
import DistanceBarChart from "@/components/DistanceBarChart";
import ActivityPieChart from "@/components/ActivityPieChart";
import SpeedChart from "@/components/SpeedChart";
import Controls from "@/components/Controls";

export default function Page() {
  return (
    <ReduxProvider>
      <main className="min-h-screen bg-gradient-to-br  font-sans text-gray-100 relative">
        <div className="flex flex-col lg:flex-row h-screen w-full">
          {/* Main Map & Analytics */}
          <section className="flex-1 flex flex-col h-full min-h-0 relative">
            <header className="flex flex-col items-center justify-center py-10">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-3 drop-shadow-lg">
                <span
                  role="img"
                  aria-label="dog"
                  className="text-5xl md:text-6xl"
                >
                  🐕
                </span>
                <span data-testid="page-title">Dog Tracker</span>
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-400 font-medium max-w-2xl text-center">
                Real-time fleet monitoring, analytics, and control dashboard
              </p>

              <div className="mt-8 w-full max-w-4xl items-center justify-center">
                <KpiBar />
              </div>
              <div className="mt-8 w-full max-w-4xl items-center justify-center">
                <Controls />
              </div>
            </header>

            <div className="flex-1 flex flex-col lg:flex-row gap-4 lg:gap-8 px-4 pb=-8">
              <div className="w-full min-h-[220px] h-[300px] lg:h-[380px] rounded-2xl shadow-2xl bg-[#101014]/90 overflow-hidden border border-[#23272f]/60 flex items-stretch">
                <MapView />
              </div>

              <div className="w-full lg:w-80 h-[300px] lg:h-[380px] rounded-2xl shadow-2xl overflow-hidden border border-[#23272f]/60">
                <div className="p-4 border-b border-[#23272f]/60 ">
                  <h2 className="text-lg font-semibold text-white">
                    Active Dogs
                  </h2>
                </div>
                <DogList />
              </div>
              <div className="w-full lg:w-80 h-[300px] lg:h-[380px] rounded-2xl shadow-2xl bg-[#101014]/90 overflow-hidden border border-[#23272f]/60">
                <div className="p-4  border-b border-[#23272f]/60">
                  <h2 className="text-lg font-semibold text-white">
                    Alerts & Notifications
                  </h2>
                </div>
                <AlertsFeed />
              </div>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-8 pl-2 tracking-tight">
                Analytics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
                <div className="rounded-2xl bg-gradient-to-br  shadow-xl border border-[#23272f]/60 p-8 flex flex-col items-center">
                  <h3 className="text-lg font-semibold text-white mb-4 tracking-tight">
                    Activity Distribution
                  </h3>
                  <ActivityPieChart />
                </div>
                <div className="rounded-2xl bg-gradient-to-br shadow-xl border border-[#23272f]/60 p-8 flex flex-col items-center">
                  <h3 className="text-lg font-semibold text-white mb-4 tracking-tight">
                    Distance Traveled
                  </h3>
                  <DistanceBarChart />
                </div>
                <div className="rounded-2xl bg-gradient-to-br shadow-xl border border-[#23272f]/60 p-8 flex flex-col items-center">
                  <h3 className="text-lg font-semibold text-white mb-4 tracking-tight">
                    Speed Analysis
                  </h3>
                  <SpeedChart />
                </div>
              </div>
            </section>
          </section>
        </div>
      </main>
    </ReduxProvider>
  );
}
