import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import productImage from "@assets/generated_images/kerupuk_mentai_product_photo.png";

export default function ProductSection() {
  return (
    <section className="py-16 md:py-24 px-4 bg-background" id="produk">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Produk Kami
        </h2>
        
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative aspect-square md:aspect-auto">
                <img
                  src={productImage}
                  alt="Kerupuk Atom Mentai"
                  className="w-full h-full object-cover"
                  data-testid="img-product"
                />
                <Badge className="absolute top-4 left-4">
                  Best Seller
                </Badge>
              </div>
              
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    (4.9/5)
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  Kerupuk Atom Mentai
                </h3>
                
                <p className="text-3xl font-bold text-primary mb-4">
                  Rp 15.000
                  <span className="text-base font-normal text-muted-foreground ml-2">
                    / bungkus (100g)
                  </span>
                </p>
                
                <p className="text-muted-foreground mb-6">
                  Kerupuk atom renyah dengan topping saus mentai Jepang yang creamy dan gurih. 
                  Dibuat dengan bahan-bahan berkualitas dan resep rahasia yang membuat rasanya 
                  begitu menggoda. Cocok untuk camilan santai atau teman ngobrol.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Renyah</Badge>
                  <Badge variant="secondary">Creamy</Badge>
                  <Badge variant="secondary">Gurih</Badge>
                  <Badge variant="secondary">Halal</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
