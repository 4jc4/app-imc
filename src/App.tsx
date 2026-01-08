import { Toaster } from "sonner";
import { BmiForm } from "./components/BmiForm";
import { BmiHistory } from "./components/BmiHistory";
import { ThemeToggle } from "./components/ThemeToggle";
import { useThemeStore } from "./store/useThemeStore";

export default function App() {
  const { theme } = useThemeStore();

  return (
    <main className="min-h-screen bg-background text-text-main transition-colors duration-300 py-12 px-4">
      <Toaster theme={theme} position="top-center" richColors closeButton />
      <div className="max-w-xl mx-auto space-y-10">
        <header className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tighter">
              IMC<span className="text-blue-500">.</span>fit
            </h1>
            <p className="text-sm font-medium opacity-60">
              Sua jornada de saúde.
            </p>
          </div>
          <ThemeToggle />
        </header>

        <section className="bg-surface p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
          <BmiForm />
        </section>

        <BmiHistory />

        <footer className="text-center pt-10">
          <p className="text-xs text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} IMC.fit — Saúde e Performance
          </p>
        </footer>
      </div>
    </main>
  );
}
