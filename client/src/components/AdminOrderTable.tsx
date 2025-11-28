import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, RefreshCw, Package } from "lucide-react";
import type { Order } from "@shared/schema";

interface AdminOrderTableProps {
  orders: Order[];
  isLoading?: boolean;
  onRefresh?: () => void;
}

export default function AdminOrderTable({
  orders,
  isLoading = false,
  onRefresh,
}: AdminOrderTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter(
    (order) =>
      order.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.nomorTelepon.includes(searchTerm)
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 space-y-0">
        <div>
          <CardTitle className="text-xl">Daftar Pesanan</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Total: {orders.length} pesanan
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Cari nama atau telepon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-64"
              data-testid="input-search-orders"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={onRefresh}
            disabled={isLoading}
            data-testid="button-refresh-orders"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {searchTerm ? "Tidak ada pesanan yang cocok" : "Belum ada pesanan"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">No</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Telepon</TableHead>
                  <TableHead>Metode</TableHead>
                  <TableHead className="text-center">Jumlah</TableHead>
                  <TableHead>Alamat</TableHead>
                  <TableHead>Catatan</TableHead>
                  <TableHead>Waktu Pesan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order, index) => (
                  <TableRow key={order.id} data-testid={`row-order-${order.id}`}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">
                      {order.namaLengkap}
                    </TableCell>
                    <TableCell>{order.nomorTelepon}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.metodePengambilan === "delivery"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {order.metodePengambilan === "delivery"
                          ? "Delivery"
                          : "Pickup"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {order.jumlahPesanan}
                    </TableCell>
                    <TableCell className="max-w-48 truncate">
                      {order.alamat || "-"}
                    </TableCell>
                    <TableCell className="max-w-32 truncate">
                      {order.catatan || "-"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {formatDate(order.waktuPesan)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
