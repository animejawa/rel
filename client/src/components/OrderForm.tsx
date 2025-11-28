import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Minus, Plus, Truck, MapPin, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  namaLengkap: z.string().min(1, "Nama lengkap harus diisi"),
  nomorTelepon: z.string().min(10, "Nomor telepon tidak valid"),
  jumlahPesanan: z.number().min(1, "Minimal pesan 1"),
  metodePengambilan: z.enum(["delivery", "pickup"]),
  alamat: z.string().optional(),
  catatan: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface OrderFormProps {
  onSubmit?: (data: FormValues) => Promise<void>;
}

export default function OrderForm({ onSubmit }: OrderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      namaLengkap: "",
      nomorTelepon: "",
      jumlahPesanan: 1,
      metodePengambilan: "delivery",
      alamat: "",
      catatan: "",
    },
  });

  const metodePengambilan = form.watch("metodePengambilan");
  const jumlahPesanan = form.watch("jumlahPesanan");

  const handleSubmit = async (data: FormValues) => {
    if (data.metodePengambilan === "delivery" && !data.alamat) {
      form.setError("alamat", { message: "Alamat harus diisi untuk delivery" });
      return;
    }

    setIsSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit(data);
      }
      toast({
        title: "Pesanan Berhasil!",
        description: "Terima kasih, pesanan Anda sedang diproses.",
      });
      form.reset();
    } catch {
      toast({
        title: "Gagal Memesan",
        description: "Terjadi kesalahan, silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const incrementQuantity = () => {
    form.setValue("jumlahPesanan", jumlahPesanan + 1);
  };

  const decrementQuantity = () => {
    if (jumlahPesanan > 1) {
      form.setValue("jumlahPesanan", jumlahPesanan - 1);
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 bg-background" id="pesan">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl">
              Pesan Kerupuk Atom Mentai
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Isi form di bawah untuk memesan
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="namaLengkap"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan nama lengkap"
                          {...field}
                          data-testid="input-nama"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nomorTelepon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor Telepon</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="08xx-xxxx-xxxx"
                          {...field}
                          data-testid="input-telepon"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="jumlahPesanan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jumlah Pesanan</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={decrementQuantity}
                            disabled={jumlahPesanan <= 1}
                            data-testid="button-decrease-qty"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="text-xl font-semibold min-w-[3rem] text-center">
                            {field.value}
                          </span>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={incrementQuantity}
                            data-testid="button-increase-qty"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          <span className="text-muted-foreground">
                            x Rp 15.000 = <strong className="text-foreground">Rp {(field.value * 15000).toLocaleString("id-ID")}</strong>
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="metodePengambilan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Metode Pengambilan</FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="grid grid-cols-2 gap-4"
                        >
                          <Label
                            htmlFor="delivery"
                            className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                              field.value === "delivery"
                                ? "border-primary bg-primary/5"
                                : "border-border"
                            }`}
                          >
                            <RadioGroupItem value="delivery" id="delivery" />
                            <Truck className="w-5 h-5" />
                            <span>Delivery</span>
                          </Label>
                          <Label
                            htmlFor="pickup"
                            className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                              field.value === "pickup"
                                ? "border-primary bg-primary/5"
                                : "border-border"
                            }`}
                          >
                            <RadioGroupItem value="pickup" id="pickup" />
                            <MapPin className="w-5 h-5" />
                            <span>Ambil di Tempat</span>
                          </Label>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {metodePengambilan === "delivery" && (
                  <FormField
                    control={form.control}
                    name="alamat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alamat Lengkap</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Masukkan alamat lengkap untuk pengiriman"
                            className="resize-none"
                            {...field}
                            data-testid="input-alamat"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {metodePengambilan === "pickup" && (
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Lokasi Pengambilan</p>
                        <p className="text-sm text-muted-foreground">
                          Jl. Contoh No. 123, Kota, Provinsi
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Buka: Senin - Sabtu, 09:00 - 21:00
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="catatan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Catatan Tambahan <span className="text-muted-foreground">(opsional)</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Catatan khusus untuk pesanan Anda"
                          className="resize-none"
                          {...field}
                          data-testid="input-catatan"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                  data-testid="button-submit-order"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    "Konfirmasi Pesanan"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
