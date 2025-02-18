"use client";
import { useHydration } from "@/components/HydrationContext";

export default function Home() {
  const { hydrated } = useHydration();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Test Home Page 1</h1>
      {hydrated && <div data-test-id="hydration-complete"></div>}
      {/* Hydration marker */}
    </div>
  );
}
