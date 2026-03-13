import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const ThemeToggle = () => {
   const { theme, setTheme } = useTheme();

   const toggleTheme = () => {
      setTheme(theme === "light" ? "dark" : "light");
   };

   return (
      <button
         onClick={toggleTheme}
         className="relative p-2 rounded-lg bg-background hover:bg-background/80 transition-all duration-300 group"
      >
         {theme === "light" ? (
            <Sun className="h-5 w-5 text-primary_text transition-all duration-300" />
         ) : (
            <Moon className="h-5 w-5 text-primary_text transition-all duration-300" />
         )}
         <span className="sr-only">Toggle theme</span>
      </button>
   );
};

export default ThemeToggle;
