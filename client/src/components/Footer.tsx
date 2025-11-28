import { Link } from "wouter";
import logoImage from "@assets/generated_images/kerupuk_mentai_brand_logo.png";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-card border-t py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logoImage}
                alt="Kerupuk Atom Mentai"
                className="w-12 h-12 rounded-full"
              />
              <span className="font-bold text-lg">Kerupuk Atom Mentai</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Camilan renyah dengan sensasi mentai yang menggoda. 
              Dibuat dengan cinta dan bahan berkualitas.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Menu</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection("produk")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-produk"
                >
                  Produk
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("pesan")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-pesan"
                >
                  Cara Pesan
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("kontak")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-kontak"
                >
                  Kontak
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Kontak</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>+62 812-3456-7890</li>
              <li>info@kerupukmentai.id</li>
              <li>Jl. Contoh No. 123, Kota</li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Kerupuk Atom Mentai. All rights reserved.
          </p>
          <Link href="/adminkerupuk" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
