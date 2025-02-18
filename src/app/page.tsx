"use client";
import { useHydration } from "@/components/HydrationContext";

export default function Home() {
  const { hydrated } = useHydration();
  return (
    <div>
      <h1>Test Home Page 1</h1>
      <p>Page text</p>
      {hydrated && <div data-test-id="hydration-complete"></div>}
      {/* Hydration marker */}
    </div>
  );
}
