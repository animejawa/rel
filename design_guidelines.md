# Design Guidelines: Kerupuk Atom Mentai Landing Page

## Design Approach
**Reference-Based:** Drawing from successful food e-commerce platforms like GrabFood, GoFood product pages, and modern snack brands. Focus on appetizing visuals and straightforward ordering flow.

## Core Design Principles
1. **Appetizing First**: Product photography drives purchase decisions
2. **Trust & Clarity**: Clear pricing, transparent delivery info, simple ordering
3. **Mobile-First**: Indonesian users primarily browse on mobile devices

## Typography
- **Headings**: Inter or Poppins (bold, modern, friendly) - 600-700 weight
- **Body**: Inter or system fonts - 400-500 weight
- **Hierarchy**: 
  - Hero title: text-4xl to text-6xl
  - Section headers: text-2xl to text-3xl
  - Body text: text-base to text-lg
  - Small text/labels: text-sm

## Layout System
**Spacing Units**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24
- Section padding: py-16 to py-24 on desktop, py-12 on mobile
- Component gaps: gap-6 to gap-8
- Card padding: p-6 to p-8
- Container: max-w-6xl for content

## Landing Page Structure

### 1. Hero Section (80vh minimum)
- Large appetizing product photo as background with subtle overlay
- Logo prominently placed (top-left or centered above)
- Product name in large, bold typography
- Compelling tagline ("Kerupuk Atom dengan Sensasi Mentai yang Menggoda!")
- Primary CTA button with blur background effect: "Pesan Sekarang"
- Trust indicators: "Pengiriman Hari Ini" or "Produk Fresh"

### 2. Product Showcase Section
- High-quality product photography (close-up shots showing texture/detail)
- Grid layout: Product image left, details right on desktop (stack on mobile)
- Include: Price, weight/quantity, description of mentai flavor
- Visual cues: Stars/rating placeholder, "Best Seller" badge

### 3. Features/Benefits Section (2-column grid on desktop)
Cards highlighting:
- Rasa Mentai Autentik (icon: chili/flavor)
- Kemasan Praktis (icon: package)
- Proses Higienis (icon: shield/check)
- Harga Terjangkau (icon: price tag)

Each card: Icon + heading + 1-2 sentence description

### 4. Order Form Section
**Form Container**: Centered, max-w-2xl, elevated with shadow
- Section title: "Pesan Kerupuk Atom Mentai"
- Form fields (all required):
  - Nama Lengkap (text input)
  - Nomor Telepon (tel input with placeholder: 08xx-xxxx-xxxx)
  - Jumlah Pesanan (number input with +/- controls)
  - **Metode Pengambilan** (radio buttons, large and clear):
    - Delivery (shows address field when selected)
    - Ambil di Tempat (shows pickup location info)
  - Alamat Lengkap (textarea, conditional on delivery)
  - Catatan Tambahan (textarea, optional indicator)
- Submit button: "Konfirmasi Pesanan" (prominent, full-width on mobile)

### 5. Contact/Location Section (if pickup option)
- Address display with map placeholder
- Operating hours
- WhatsApp contact link

### 6. Footer
- Logo (smaller)
- Quick links: Cara Pesan, Kontak
- Social media icons
- Copyright text

## Admin Page (/adminkerupuk)

### Layout
- Clean dashboard aesthetic
- Top navigation bar: Logo + "Admin Dashboard" title + logout/back link
- Main content: max-w-7xl centered

### Order Table
**Desktop Table Structure:**
- Columns: No., Nama, Telepon, Metode, Jumlah, Alamat, Catatan, Waktu Pesan
- Alternating row colors for readability
- Sticky header
- Mobile: Responsive card layout (each order as card)

**Table Features:**
- Sort indicators on column headers
- Search/filter bar above table
- Export button ("Download CSV")
- Total orders counter
- Refresh button

## Component Library

### Buttons
- Primary: Rounded (rounded-lg), medium padding (px-6 py-3)
- Hero buttons: Backdrop blur (backdrop-blur-sm bg-white/90)
- Hover states: Subtle scale or brightness shift

### Cards
- Border radius: rounded-xl
- Shadow: shadow-md to shadow-lg
- Padding: p-6 to p-8
- Hover: Slight lift effect (transform/shadow change)

### Form Inputs
- Border radius: rounded-lg
- Border: Visible border, focus ring
- Padding: px-4 py-3
- Labels: Above input, font-medium

### Icons
**Library**: Heroicons (CDN)
- Use outline style for general UI
- Solid style for filled states/emphasis
- Size: w-5 h-5 for inline, w-8 h-8 for feature cards

## Images Required

1. **Hero Image**: High-resolution photo of kerupuk atom mentai - bright, appetizing, possibly with mentai sauce visible or product in attractive packaging. Should evoke freshness and flavor.

2. **Logo**: Brand logo for kerupuk atom mentai - place in hero and footer

3. **Product Detail Image**: Close-up shot showing texture, color, and quality of the crackers

## Accessibility
- All form inputs have associated labels
- Sufficient color contrast for text
- Touch targets minimum 44x44px on mobile
- Clear focus indicators
- Error messages displayed clearly below inputs

## Responsive Breakpoints
- Mobile-first approach
- md: 768px (tablet)
- lg: 1024px (desktop)
- Stack columns on mobile, side-by-side on desktop
- Form full-width on mobile, max-w-2xl centered on desktop