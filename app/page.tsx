"use client";
import { ReduxProvider } from "@/store";
import MapView from "@/components/MapView";
import KpiBar from "@/components/KpiBar";
import DogList from "@/components/DogList";
import AlertsFeed from "@/components/AlertsFeed";
import DistanceBarChart from "@/components/DistanceBarChart";
import ActivityPieChart from "@/components/ActivityPieChart";
import SpeedChart from "@/components/SpeedChart";
import Controls from "@/components/Controls";
import AlertsClearButton from "@/components/AlertsClearButton";

export default function Page() {
  return (
    <ReduxProvider>
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 font-sans text-slate-100 relative overflow-x-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="relative z-10">
          {/* Header Section */}
          <header className="px-6 pt-12 pb-8">
            <div className="max-w-7xl mx-auto text-center">
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <span className="text-3xl" role="img" aria-label="dog">
                    🐕
                  </span>
                </div>
                <div className="text-left">
                  <h1
                    className="text-4xl md:text-5xl font-bold text-white tracking-tight"
                    data-testid="page-title"
                  >
                    Dog Tracker
                  </h1>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mt-2" />
                </div>
              </div>

              <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                Real-time fleet monitoring, analytics, and control dashboard
              </p>
            </div>
          </header>

          {/* KPI and Controls Section */}
          <section className="px-6 mb-12">
            <div className="max-w-7xl mx-auto space-y-8">
                  <div className="bg-slate-900/90 border border-slate-800/50 rounded-3xl p-8 shadow-2xl">
                <KpiBar />
              </div>

              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-3xl p-6 shadow-2xl">
                <Controls />
              </div>
            </div>
          </section>

          {/* Main Dashboard Grid */}
          <section className="px-6 mb-16">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                {/* Map View - Takes up most space */}
                <div className="xl:col-span-7">
                    <div className="bg-slate-900/90 border border-slate-800/50 rounded-3xl overflow-hidden shadow-2xl h-[500px]">
                    <div className="h-full relative">
                      <div className="absolute top-6 left-6 z-10">
                        <h2 className="text-xl font-semibold text-white mb-1">
                          Live Map
                        </h2>
                        <p className="text-sm text-slate-400">
                          Real-time dog locations
                        </p>
                      </div>
                      <MapView />
                    </div>
                  </div>
                </div>

                {/* Side Panels */}
                <div className="xl:col-span-5 space-y-8">
                  {/* Active Dogs */}
                  <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="p-6 border-b border-slate-800/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-xl font-semibold text-white mb-1">
                            Active Dogs
                          </h2>
                          <p className="text-sm text-slate-400">
                            Currently being tracked
                          </p>
                        </div>
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                      </div>
                    </div>
                    <div className="h-[200px] overflow-hidden">
                      <DogList />
                    </div>
                  </div>

                  {/* Alerts Feed */}
                  <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="p-6 border-b border-slate-800/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-xl font-semibold text-white mb-1">
                            Alerts & Notifications
                          </h2>
                          <p className="text-sm text-slate-400">
                            Recent system events
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse shadow-lg shadow-amber-400/50" />
                          {/* Clear Alerts Button */}
                          <AlertsClearButton />
                        </div>
                      </div>
                    </div>
                    <div className="h-[200px] overflow-hidden">
                      <AlertsFeed />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Analytics Section */}
          <section className="px-6 pb-16">
            <div className="max-w-7xl mx-auto">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
                  Analytics Dashboard
                </h2>
                <p className="text-lg text-slate-400">
                  Comprehensive insights and performance metrics
                </p>
                <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mt-4" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {/* Activity Distribution */}
                <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:border-slate-700/50">
                  <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Activity Distribution
                    </h3>
                    <p className="text-sm text-slate-400">
                      Breakdown of dog activities
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <ActivityPieChart />
                  </div>
                </div>

                {/* Distance Traveled */}
                <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:border-slate-700/50">
                  <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/25">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Distance Traveled
                    </h3>
                    <p className="text-sm text-slate-400">
                      Total distance metrics
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <DistanceBarChart />
                  </div>
                </div>

                {/* Speed Analysis */}
                <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:border-slate-700/50 md:col-span-2 xl:col-span-1">
                  <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/25">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Speed Analysis
                    </h3>
                    <p className="text-sm text-slate-400">
                      Velocity patterns and trends
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <SpeedChart />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </ReduxProvider>
  );
}
