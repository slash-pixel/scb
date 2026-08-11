import Ticker from "./ticker";
import Navbar from "./Navbar";
import Hero  from "./Hero";

export default function AppLayout() {
  return (
    <>
  <div className="relative min-h-screen bg-white">
  
  <Ticker />

  <div className="sticky top-0 z-[100] w-full">
    <Navbar />
  </div>

  <main>
    <Hero />
  </main>
  
</div>
    </>
  );
}