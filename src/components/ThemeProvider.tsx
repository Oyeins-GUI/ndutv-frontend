import { ThemeProviderContext } from "@/hooks/use-theme";
import React, { useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
   children: React.ReactNode;
   defaultTheme?: Theme;
   storageKey?: string;
};

export type ThemeProviderState = {
   theme: Theme;
   setTheme: (theme: Theme) => void;
};

export function ThemeProvider({
   children,
   defaultTheme = "system",
   storageKey = "vite-ui-theme",
   ...props
}: ThemeProviderProps) {
   const [theme, setTheme] = useState<Theme>(
      () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
   );

   useEffect(() => {
      const root = document.documentElement;

      const applyTheme = (t: Theme) => {
         root.classList.remove("light", "dark");
         if (t === "system") {
            const systemTheme = window.matchMedia(
               "(prefers-color-scheme: dark)",
            ).matches
               ? "dark"
               : "light";
            root.classList.add(systemTheme);
         } else {
            root.classList.add(t);
         }
      };

      applyTheme(theme);

      const listener = () => {
         if (theme === "system") applyTheme("system");
      };

      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", listener);

      return () => mediaQuery.removeEventListener("change", listener);
   }, [theme]);

   const value = {
      theme,
      setTheme: (theme: Theme) => {
         localStorage.setItem(storageKey, theme);
         setTheme(theme);
      },
   };

   return (
      <ThemeProviderContext {...props} value={value}>
         {children}
      </ThemeProviderContext>
   );
}
