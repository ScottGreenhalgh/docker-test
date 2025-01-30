import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test | Page2",
  description: "Secondary testing page",
};

export default function Page2() {
  return (
    <>
      <h1>Secondary page to test</h1>
    </>
  );
}
