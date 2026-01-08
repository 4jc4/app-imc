import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { bmiSchema, type BmiFormData } from "../schemas/bmiSchema";
import { useBmiStore } from "../store/useBmiStore";

export function BmiForm() {
  const addCalculation = useBmiStore((state) => state.addCalculation);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BmiFormData>({
    resolver: zodResolver(bmiSchema),
  });

  const onSubmit = (data: BmiFormData) => {
    try {
      addCalculation(data.weight, data.height);
      toast.success("Cálculo realizado com sucesso!", {
        description: "Os dados foram salvos no seu histórico local.",
        duration: 3000,
      });
      reset();
    } catch (error) {
      toast.error("Erro ao processar o cálculo.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold opacity-80 ml-1">Peso (kg)</label>
          <input
            type="number"
            step="0.1"
            placeholder="Ex: 75.5"
            {...register("weight", { valueAsNumber: true })}
            className="w-full bg-background border-2 border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-4 text-text-main focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:opacity-30"
          />
          {errors.weight && (
            <p className="text-rose-500 text-xs font-bold mt-1 ml-1">
              {errors.weight.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold opacity-80 ml-1">
            Altura (m)
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="Ex: 1.75"
            {...register("height", { valueAsNumber: true })}
            className="w-full bg-background border-2 border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-4 text-text-main focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:opacity-30"
          />
          {errors.height && (
            <p className="text-rose-500 text-xs font-bold mt-1 ml-1">
              {errors.height.message}
            </p>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] uppercase tracking-widest text-sm"
      >
        Calcular Agora
      </button>
    </form>
  );
}
