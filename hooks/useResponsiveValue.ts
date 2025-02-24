import { useCallback, useEffect, useState } from "react";

// Define the breakpoint names we support
export type Breakpoint = "base" | "sm" | "md" | "lg" | "xl";

// Define the breakpoints in pixels
export const breakpoints: Record<Exclude<Breakpoint, "base">, number> = {
  sm: 500,
  md: 800,
  lg: 1100,
  xl: 1400,
};

// Generic type for responsive values
export type ResponsiveValue<T> = {
  [key in Breakpoint]?: T;
} & {
  base: T; // Base is required
};

/**
 * Hook that returns the appropriate value based on the current screen size
 * @param responsiveObject An object containing values for different breakpoints
 * @returns The value corresponding to the current screen size
 */
export function useResponsiveValue<T>(responsiveObject: ResponsiveValue<T>): T {
  // Calculate the appropriate value based on current window width
  const calculateResponsiveValue = useCallback((config: ResponsiveValue<T>): T => {
    if (typeof window === "undefined") return config.base;

    const width = window.innerWidth;

    if (width >= breakpoints.xl && config.xl !== undefined) return config.xl;
    if (width >= breakpoints.lg && config.lg !== undefined) return config.lg;
    if (width >= breakpoints.md && config.md !== undefined) return config.md;
    if (width >= breakpoints.sm && config.sm !== undefined) return config.sm;
    return config.base;
  }, []);

  const [value, setValue] = useState<T>(() => calculateResponsiveValue(responsiveObject));

  // Set up event listeners for window resize
  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleResize = () => {
      setValue(calculateResponsiveValue(responsiveObject));
    };

    handleResize(); // Call once to ensure correct initial value

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [responsiveObject, calculateResponsiveValue]);

  return value;
}
