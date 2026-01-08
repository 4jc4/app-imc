import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2.5 rounded-xl bg-surface border border-border-subtle 
                 hover:bg-bg-hover transition-all duration-300 group shadow-sm 
                 active:scale-90"
      aria-label="Alternar tema"
    >
      <div className="relative w-6 h-6 flex items-center justify-center overflow-hidden">
        <Sun
          className={`absolute transition-all duration-500 transform
            ${
              theme === "dark"
                ? "translate-y-0 rotate-0 opacity-100"
                : "translate-y-10 rotate-90 opacity-0"
            } text-amber-400`}
        />

        <Moon
          className={`absolute transition-all duration-500 transform
            ${
              theme === "light"
                ? "translate-y-0 rotate-0 opacity-100"
                : "-translate-y-10 -rotate-90 opacity-0"
            } text-slate-600`}
        />
      </div>

      <span
        className="absolute top-12 left-1/2 -translate-x-1/2 px-2 py-1 
                       bg-text-main text-background text-[10px] font-bold 
                       rounded opacity-0 group-hover:opacity-100 transition-opacity 
                       pointer-events-none whitespace-nowrap"
      >
        Mudar para modo {theme === "light" ? "escuro" : "claro"}
      </span>
    </button>
  );
}
