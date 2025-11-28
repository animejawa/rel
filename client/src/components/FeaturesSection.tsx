import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Package, Shield, Tag } from "lucide-react";

const features = [
  {
    icon: Flame,
    title: "Rasa Mentai Autentik",
    description: "Dibuat dengan resep saus mentai asli Jepang yang creamy dan gurih.",
  },
  {
    icon: Package,
    title: "Kemasan Praktis",
    description: "Dikemas rapat untuk menjaga kerenyahan dan kesegaran produk.",
  },
  {
    icon: Shield,
    title: "Proses Higienis",
    description: "Diproduksi dengan standar kebersihan tinggi dan bahan berkualitas.",
  },
  {
    icon: Tag,
    title: "Harga Terjangkau",
    description: "Nikmati kelezatan premium dengan harga yang ramah di kantong.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          Mengapa Memilih Kami?
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Kerupuk Atom Mentai hadir dengan kualitas terbaik untuk memanjakan lidah Anda
        </p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover-elevate">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
