import { getBookedDatesByCabinId, getCabin } from "@/lib/data-service";

type Params = {
  params: {
    cabinId: number;
  };
};

export async function GET(request: Request, { params }: Params) {
  const { cabinId } = params;
  console.log(request);
  console.log(params);

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}
