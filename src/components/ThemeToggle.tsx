import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110"
      aria-label="Alternar tema"
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;
