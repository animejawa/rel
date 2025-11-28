import AdminOrderTable from "../AdminOrderTable";
import type { Order } from "@shared/schema";

const mockOrders: Order[] = [
  {
    id: "1",
    namaLengkap: "Budi Santoso",
    nomorTelepon: "081234567890",
    jumlahPesanan: 3,
    metodePengambilan: "delivery",
    alamat: "Jl. Merdeka No. 123, Jakarta Selatan",
    catatan: "Tolong packing rapi",
    waktuPesan: new Date().toISOString(),
  },
  {
    id: "2",
    namaLengkap: "Siti Rahayu",
    nomorTelepon: "082345678901",
    jumlahPesanan: 5,
    metodePengambilan: "pickup",
    alamat: "",
    catatan: "",
    waktuPesan: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "3",
    namaLengkap: "Ahmad Wijaya",
    nomorTelepon: "083456789012",
    jumlahPesanan: 2,
    metodePengambilan: "delivery",
    alamat: "Jl. Sudirman No. 456, Jakarta Pusat",
    catatan: "Hubungi sebelum antar",
    waktuPesan: new Date(Date.now() - 7200000).toISOString(),
  },
];

export default function AdminOrderTableExample() {
  return (
    <AdminOrderTable
      orders={mockOrders}
      onRefresh={() => console.log("Refresh clicked")}
    />
  );
}
