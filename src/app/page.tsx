export const dynamic = 'force-dynamic';
import { fetchData } from "@/lib/counter-actions";
import Counter from "./components/counter";
import { Suspense } from "react";
import Header from "./components/header";

export default async function CounterPage() {
  const data = await fetchData();
  return (
    <Suspense>
      <div className="flex flex-col items-center gap-10">
        <Header />
        <Counter data={data} />
      </div>
    </Suspense>
  );
}
