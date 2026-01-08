import { toast } from "sonner";
import { useBmiStore } from "../store/useBmiStore";

const statusColorMap: Record<string, string> = {
  "Abaixo do peso": "bg-status-below",
  "Peso normal": "bg-status-normal",
  Sobrepeso: "bg-status-over",
  Obesidade: "bg-status-obese",
};

export function BmiHistory() {
  const { history, removeCalculation } = useBmiStore();

  if (history.length === 0) return null;

  const handleDelete = (id: string) => {
    removeCalculation(id);
    toast.info("Registro removido.");
  };

  return (
    <section className="mt-10 space-y-4">
      <div className="flex items-baseline justify-between px-1">
        <h2 className="text-lg font-bold text-text-main uppercase tracking-tight">
          Histórico
        </h2>
        <span className="text-xs opacity-50 font-mono">
          {history.length}/10 registros
        </span>
      </div>

      <div className="w-full overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border-subtle bg-background/50">
                <th className="px-4 py-4 font-bold text-text-main opacity-60 text-left">
                  Data
                </th>
                <th className="px-4 py-4 font-bold text-text-main opacity-60 text-right">
                  IMC
                </th>
                <th className="px-4 py-4 font-bold text-text-main opacity-60 text-left">
                  Status
                </th>
                <th className="px-4 py-4"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border-subtle">
              {history.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-bg-hover transition-colors group"
                >
                  <td className="px-4 py-4 text-text-main/60 font-mono text-xs whitespace-nowrap">
                    {new Date(item.date).toLocaleDateString("pt-BR")}
                  </td>

                  <td className="px-4 py-4 text-right font-mono font-bold text-text-main text-base tabular-nums">
                    {item.bmi.toLocaleString("pt-BR", {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })}
                  </td>

                  <td className="px-4 py-4 text-left">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2.5 w-2.5 rounded-full shadow-sm ${
                          statusColorMap[item.category] || "bg-slate-400"
                        }`}
                        aria-hidden="true"
                      />
                      <span className="text-text-main font-semibold whitespace-nowrap">
                        {item.category}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-right">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-slate-400 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                      aria-label="Excluir"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
