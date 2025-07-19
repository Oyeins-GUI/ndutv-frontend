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
         <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
         <Moon className="absolute h-5 w-5 text-gray-700 dark:text-gray-300 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 top-2 left-2" />
         <span className="sr-only">Toggle theme</span>
      </button>
   );
};

export default ThemeToggle;
