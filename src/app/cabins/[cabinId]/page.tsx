import { getCabin, getCabins } from "@/lib/data-service";

import Reservation from "@/components/Reservation";
import Spinner from "@/components/Spinner";
import { Suspense } from "react";
import Cabin from "../../../components/Cabin";

// export const metadata = {
//   title: "Cabin",
// };

type Props = {
  params: {
    cabinId: number;
  };
};

export async function generateMetadata({ params }: Props) {
  const { name } = await getCabin(params.cabinId);

  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

export default async function Page({ params }: Props) {
  const cabin = await getCabin(params.cabinId);
  // console.log("Cabin", cabin);
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
