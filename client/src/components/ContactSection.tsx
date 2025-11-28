import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone, MessageCircle } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="py-16 md:py-24 px-4 bg-muted/30" id="kontak">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          Hubungi Kami
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Ada pertanyaan? Jangan ragu untuk menghubungi kami
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <div className="aspect-video bg-muted rounded-lg mb-6 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Lokasi Toko</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">Alamat</p>
                    <p className="text-sm text-muted-foreground">
                      Jl. Contoh No. 123, Kelurahan, Kecamatan, Kota, Provinsi 12345
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">Jam Operasional</p>
                    <p className="text-sm text-muted-foreground">
                      Senin - Sabtu: 09:00 - 21:00
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Minggu: 10:00 - 18:00
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">Telepon</p>
                    <p className="text-sm text-muted-foreground">
                      +62 812-3456-7890
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col justify-center h-full">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  Chat via WhatsApp
                </h3>
                <p className="text-muted-foreground mb-6">
                  Hubungi kami langsung via WhatsApp untuk pemesanan atau pertanyaan
                </p>
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => window.open("https://wa.me/6281234567890", "_blank")}
                  data-testid="button-whatsapp"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
