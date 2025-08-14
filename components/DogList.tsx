"use client";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { selectDog, type Dog } from "@/store/dogsSlice";

function DogList() {
  const dogs = useSelector((s: RootState) =>
    Object.values(s.dogs.items)
  ) as Dog[];
  console.log(dogs);
  const selectedId = useSelector((s: RootState) => s.dogs.selectedId);
  const dispatch = useDispatch();

  if (!dogs || dogs.length === 0) {
    return <div className="p-4 text-slate-400 text-center">No dogs found.</div>;
  }

  return (
    <div className="p-4 space-y-3 h-full overflow-y-auto">
      {dogs.map((dog) => (
        <div
          key={dog.id}
          className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-slate-600/50 transition-all duration-300  cursor-pointer ${
            selectedId?.includes(dog.id) ? "bg-slate-100/50" : "bg-sky-900/50"
          }`}
        >
          <div onClick={() => dispatch(selectDog(dog.id))}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    dog.status === "moving"
                      ? "bg-green-400 animate-pulse"
                      : dog.status === "idle"
                      ? "bg-gray-400 animate-pulse"
                      : dog.status === "low_battery"
                      ? "bg-yellow-400"
                      : dog.status === "offline"
                      ? "bg-red-400 animate-pulse"
                      : "bg-gray-300"
                  }`}
                />
                <div>
                  <div className="font-semibold text-white text-sm">
                    {dog.name || "Unknown"}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-white">
                  {dog.speed.toFixed(2) ?? 0} km/h
                </div>
              </div>
            </div>
            <div
              className={`text-xs px-2 py-1 rounded-full inline-block ${
                dog.status === "moving"
                  ? "bg-green-400 animate-pulse"
                  : dog.status === "idle"
                  ? "bg-gray-400 animate-pulse"
                  : dog.status === "low_battery"
                  ? "bg-yellow-400"
                  : dog.status === "offline"
                  ? "bg-red-400 animate-pulse"
                  : "bg-gray-300"
              }`}
            >
              {dog.status
                ? dog.status.charAt(0).toUpperCase() + dog.status.slice(1)
                : "Unknown"}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DogList;
