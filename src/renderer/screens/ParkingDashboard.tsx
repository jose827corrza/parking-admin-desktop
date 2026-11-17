import React from 'react'
import { CarItem, ParkingDashboardProps } from "../types/types";

const DEFAULT_CARS: CarItem[] = [
  { parking_id: '1', plate_number: 'XYZ-123', ingress_datetime: 'Renault Duster', is_premium: true },
  { parking_id: '2', plate_number: 'ABC-789', ingress_datetime: 'Chevrolet Spark', is_premium: true },
  { parking_id: '3', plate_number: 'LMN-456', ingress_datetime: 'Mazda 3', is_premium: false },
];

export function ParkingDashboard({
  cars = DEFAULT_CARS,
  selectedCarId,
  onSelectCar,
  onPrimaryAction,
  onSecondaryAction,
}: ParkingDashboardProps) {
  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-100 overflow-hidden">
      
      {/* Left Column: ~1/3 width for the Car list */}
      <aside className="w-1/3 min-w-[280px] border-r border-slate-800 bg-slate-900/40 flex flex-col">
        <div className="p-4 border-b border-slate-800">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Active Vehicles ({cars.length})
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cars.map((car) => {
            const isSelected = selectedCarId === car.plate_number;
            return (
              <div
                key={car.parking_id}
                onClick={() => onSelectCar?.(car)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-950/30 border-emerald-500/50 shadow-md'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-emerald-400 tracking-wide">
                    {car.plate_number}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      car.is_premium
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-slate-800 text-slate-400 border border-slate-700/50'
                    }`}
                  >
                    {car.is_premium ? 'Premium' : 'Standard'}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mt-1">{car.ingress_datetime}</p>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Right Column: ~2/3 width with XL text and two buttons */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-950">
        <div className="max-w-lg w-full text-center space-y-6">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
            Parking Access Control
          </h1>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Select a vehicle from the sidebar or initiate a scan to process gate entries and exits securely.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={onPrimaryAction}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-950/50 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              Scan QR Pass
            </button>
            <button
              onClick={onSecondaryAction}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-medium border border-slate-700 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              Manual Override
            </button>
          </div>
        </div>
      </main>

    </div>
  );
}