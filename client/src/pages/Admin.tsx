import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import AdminOrderTable from "@/components/AdminOrderTable";
import { ArrowLeft } from "lucide-react";
import logoImage from "@assets/generated_images/kerupuk_mentai_brand_logo.png";
import type { Order } from "@shared/schema";

export default function Admin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/orders");
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" data-testid="button-back-home">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <img
                src={logoImage}
                alt="Logo"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h1 className="font-bold text-lg">Admin Dashboard</h1>
                <p className="text-xs text-muted-foreground">
                  Kerupuk Atom Mentai
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <AdminOrderTable
          orders={orders}
          isLoading={isLoading}
          onRefresh={fetchOrders}
        />
      </main>
    </div>
  );
}
