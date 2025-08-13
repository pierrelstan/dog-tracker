/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { selectDog } from "@/store/dogsSlice";

function DogList() {
  const dogs = useSelector((s: RootState) => Object.values(s.dogs.items));
  const selectedId = useSelector((s: RootState) => s.dogs.selectedId);

  const dispatch = useDispatch();
  return (
    <ul className="space-y-4" data-testid="dog-list">
      {dogs.map((dog: any) => (
        <li key={dog.id}>
          <button
            onClick={() => dispatch(selectDog(dog.id))}
            className={`flex items-center gap-4 p-3 rounded-xl w-full text-left transition ${
              selectedId?.includes(dog.id)
                ? "bg-blue-900/40 ring-"
                : "bg-[#23272f] hover:bg-[#23272f]/80"
            }`}
          >
            <DogAvatar name={dog.name} status={dog.status} />
            <div>
              <div className="font-semibold text-white text-lg">{dog.name}</div>
              <div className="text-xs text-gray-400 capitalize flex items-center gap-2">
                <span
                  className={`inline-block w-2 h-2 rounded-full ${
                    dog.status === "moving"
                      ? "bg-green-500"
                      : dog.status === "idle"
                      ? "bg-gray-400"
                      : dog.status === "low_battery"
                      ? "bg-yellow-500"
                      : dog.status === "offline"
                      ? "bg-red-500"
                      : "bg-gray-300"
                  }`}
                ></span>
                {dog.status.replace("_", " ")}
              </div>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}

function DogAvatar({ name, status }: { name: string; status: string }) {
  const statusColor =
    {
      moving: "bg-green-500",
      idle: "bg-gray-400",
      low_battery: "bg-yellow-500",
      offline: "bg-red-500",
    }[status] || "bg-gray-300";
  return (
    <div
      className={`relative w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold text-white ${statusColor} shadow-lg`}
    >
      {name.charAt(0)}
      <span
        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#181a2a] ${statusColor}`}
      ></span>
    </div>
  );
}
export default DogList;
