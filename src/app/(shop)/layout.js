import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import CartDrawer from "@/components/cart/CartDrawer";
import { ToastContainer } from "@/components/ui/Toast";

export default function ShopLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="pb-16 md:pb-0 min-h-screen">{children}</main>
      <Footer />
      <MobileNav />
      <CartDrawer />
      <ToastContainer />
    </>
  );
}
