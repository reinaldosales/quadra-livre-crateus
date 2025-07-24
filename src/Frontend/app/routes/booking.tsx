import { useParams } from "react-router";
import Booking from "~/pages/booking/booking";

export default function Page() {
  const { id } = useParams(); 

  return <Booking id={id} />;
}
