import { Navbar } from "@/components/Navbar";
import { FlashSales } from "@/components/FlashSales";
import { Footer } from "@/components/Footer";

function App() {
  return (
    <>
      <Navbar cartCount={2} isLoggedIn />
      <FlashSales />
      <Footer />
    </>
  );
}

export default App;
