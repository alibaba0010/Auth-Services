// app.providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
};

export default Providers;
