import { About } from "@/components/sections/about";
import { Booking } from "@/components/sections/booking";
import { Hero } from "@/components/sections/hero";
import { HoursLocation } from "@/components/sections/hours-location";
import { Reviews } from "@/components/sections/reviews";
import { Services } from "@/components/sections/services";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Reviews />
      <Booking />
      <HoursLocation />
    </>
  );
}
