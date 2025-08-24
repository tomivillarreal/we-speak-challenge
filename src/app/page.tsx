export const dynamic = 'force-dynamic';
import { fetchData } from "@/lib/counter-actions";
import Counter from "./components/counter";
import Image from "next/image";
import logo from '../../public/logo.jpeg'
import { Suspense } from "react";

export default async function CounterPage() {
  const data = await fetchData();
  return (
    <Suspense>
      <div className="flex flex-col items-center gap-10">
        <Image src={logo} alt="WeSpeak" width={50} height={50} />
        <div>
          <h1 className="font-bold text-5xl text-wrap text-center">WeSpeak Challenge</h1>
          <h5 className="text-center">Tomás Villarreal</h5>
        </div>
        <Counter data={data} />
      </div>
    </Suspense>
  );
}
