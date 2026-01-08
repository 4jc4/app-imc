import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BmiHistory {
  id: string;
  bmi: number;
  date: string;
  category: string;
}

interface BmiState {
  history: BmiHistory[];
  addCalculation: (weight: number, height: number) => void;
  removeCalculation: (id: string) => void;
}

export const useBmiStore = create<BmiState>()(
  persist(
    (set) => ({
      history: [],

      addCalculation: (weight, height) => {
        const bmi = weight / (height * height);
        const category = getBmiCategory(bmi);
        const newEntry: BmiHistory = {
          id: crypto.randomUUID(),
          bmi,
          category,
          date: new Date().toISOString(),
        };
        set((state) => ({
          history: [newEntry, ...state.history].slice(0, 10),
        }));
      },

      removeCalculation: (id) => {
        set((state) => ({
          history: state.history.filter((item) => item.id !== id),
        }));
      },
    }),
    {
      name: "imc-storage",
      partialize: (state) => ({ history: state.history }),
    }
  )
);

function getBmiCategory(bmi: number): string {
  if (bmi < 18.5) return "Abaixo do peso";
  if (bmi < 25) return "Peso normal";
  if (bmi < 30) return "Sobrepeso";
  return "Obesidade";
}
