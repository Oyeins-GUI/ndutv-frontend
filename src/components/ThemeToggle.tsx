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
         className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group"
      >
         {theme === "light" ? (
            <Sun className="h-5 w-5 text-gray-300 transition-all duration-300" />
         ) : (
            <Moon className="h-5 w-5 text-gray-300 transition-all duration-300" />
         )}
         <span className="sr-only">Toggle theme</span>
      </button>
   );
};

export default ThemeToggle;
