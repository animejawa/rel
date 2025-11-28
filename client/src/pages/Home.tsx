import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import HeroSection from "@/components/HeroSection";
import ProductSection from "@/components/ProductSection";
import FeaturesSection from "@/components/FeaturesSection";
import OrderForm from "@/components/OrderForm";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { apiRequest } from "@/lib/queryClient";
import type { InsertOrder } from "@shared/schema";

export default function Home() {
  const orderFormRef = useRef<HTMLDivElement>(null);

  const orderMutation = useMutation({
    mutationFn: async (data: InsertOrder) => {
      const response = await apiRequest("POST", "/api/orders", data);
      return response.json();
    },
  });

  const scrollToOrderForm = () => {
    const element = document.getElementById("pesan");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      <HeroSection onOrderClick={scrollToOrderForm} />
      <ProductSection />
      <FeaturesSection />
      <div ref={orderFormRef}>
        <OrderForm
          onSubmit={async (data) => {
            await orderMutation.mutateAsync(data);
          }}
        />
      </div>
      <ContactSection />
      <Footer />
    </div>
  );
}
