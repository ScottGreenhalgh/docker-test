"use client";
import { useHydration } from "@/components/HydrationContext";

export default function Page2() {
  const { hydrated } = useHydration();
  return (
    <div>
      <h1>Secondary page to test</h1>
      <p>Page2 text</p>
      {hydrated && <div data-test-id="hydration-complete"></div>}
      {/* Hydration marker */}
    </div>
  );
}
