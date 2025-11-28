import { z } from "zod";

export const orderSchema = z.object({
  id: z.string(),
  namaLengkap: z.string().min(1, "Nama lengkap harus diisi"),
  nomorTelepon: z.string().min(10, "Nomor telepon tidak valid"),
  jumlahPesanan: z.number().min(1, "Minimal pesan 1"),
  metodePengambilan: z.enum(["delivery", "pickup"]),
  alamat: z.string().optional(),
  catatan: z.string().optional(),
  waktuPesan: z.string(),
});

export const insertOrderSchema = orderSchema.omit({ id: true, waktuPesan: true });

export type Order = z.infer<typeof orderSchema>;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
