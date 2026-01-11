# Product Management Feature

## Overview
Fitur manajemen produk untuk Martabak Alim yang memungkinkan admin untuk menambah, edit, dan hapus menu recommended yang ditampilkan di home page. Produk yang ditambahkan akan otomatis ditampilkan di section "Our Signature Creations" di home page.

## Features
✅ CRUD lengkap untuk produk (Create, Read, Update, Delete)
✅ Upload gambar produk
✅ Atur urutan tampilan produk
✅ Status featured untuk menampilkan atau menyembunyikan di home page
✅ Dynamic product display di home page
✅ Kategori dan badge untuk setiap produk

## Database Structure
Table: `products`
- id
- name (string)
- description (text)
- price (string)
- image_path (string)
- category (string)
- badge (string)
- is_featured (boolean)
- order (integer)
- created_at
- updated_at

## Routes
- GET `/products` - List all products
- GET `/products/create` - Form untuk tambah produk
- POST `/products` - Store new product
- GET `/products/{id}/edit` - Form untuk edit produk
- PUT `/products/{id}` - Update product
- DELETE `/products/{id}` - Delete product

## Cara Menggunakan

### 1. Akses Management Page
Login sebagai admin dan klik menu "Products" di navigation bar.

### 2. Menambah Produk Baru
1. Klik tombol "Tambah Product Baru"
2. Isi form:
   - **Nama Produk**: Nama lengkap produk (Contoh: Martabak Manis Jumbo Durian Keju)
   - **Deskripsi**: Deskripsi singkat tentang produk
   - **Harga**: Harga produk dengan format yang diinginkan (Contoh: Rp. 60.000)
   - **Gambar Produk**: Upload gambar produk (JPG, PNG, GIF, max 2MB)
   - **Kategori**: Pilih kategori (Signature, Classic, Savory, Premium)
   - **Badge**: Pilih badge (Best Seller, Recommended, New, Popular)
   - **Urutan Tampilan**: Nomor urutan (semakin kecil = semakin di atas)
   - **Featured**: Centang untuk menampilkan di home page
3. Klik "Simpan Produk"

### 3. Edit Produk
1. Dari halaman list products, klik tombol "Edit" pada produk yang ingin diubah
2. Update informasi yang diperlukan
3. Klik "Update Produk"
4. Gambar dapat diubah atau dibiarkan sama (kosongkan jika tidak ingin mengubah gambar)

### 4. Hapus Produk
1. Dari halaman list products, klik tombol "Delete" pada produk yang ingin dihapus
2. Konfirmasi penghapusan
3. Gambar produk akan otomatis terhapus dari server

### 5. Mengatur Urutan Tampilan
- Produk akan ditampilkan berdasarkan field `order` (ascending)
- Semakin kecil nomor order, semakin di atas posisinya
- Contoh: order 1, 2, 3 akan tampil dari kiri ke kanan

## Home Page Integration
Produk yang berstatus `is_featured = true` akan otomatis ditampilkan di section "Our Signature Creations":
- Gambar produk
- Nama produk
- Deskripsi
- Harga
- Kategori (badge di kanan atas)
- Badge (Best Seller/Recommended di bawah)

## Upload Image Guidelines
- **Format**: JPEG, PNG, JPG, GIF
- **Max Size**: 2MB
- **Recommended Resolution**: 800x800px atau 1:1 aspect ratio
- **Lokasi Penyimpanan**: `public/images/products/`

## Default Products
Seeder sudah menyediakan 3 produk default:
1. **Martabak Manis Jumbo Durian Keju** (Signature, Best Seller)
2. **Martabak Manis Pandan Keju** (Classic, Recommended)
3. **Martabak Telor Daging Ayam** (Savory, Best Seller)

## Categories
- **Signature**: Menu signature / unggulan
- **Classic**: Menu klasik
- **Savory**: Menu gurih
- **Premium**: Menu premium

## Badges
- **Best Seller**: Produk terlaris (gradient gold)
- **Recommended**: Produk yang direkomendasikan (gradient blue)
- **New**: Produk baru
- **Popular**: Produk populer

## Technical Notes
- Model: `App\Models\Product`
- Controller: `App\Http\Controllers\ProductController`
- React Pages: `resources/js/Pages/Product/`
- Migration: `database/migrations/2026_01_11_151456_create_products_table.php`
- Seeder: `database/seeders/ProductSeeder.php`
- Image Storage: `public/images/products/`

## Permissions
Semua aksi product management memerlukan autentikasi (middleware `auth`).

## Tips
1. Gunakan gambar dengan kualitas tinggi untuk hasil terbaik
2. Deskripsi singkat dan menarik (max 2-3 baris)
3. Atur order dengan bijak untuk menampilkan produk terbaik di awal
4. Gunakan badge "Best Seller" untuk produk yang paling laris
5. Update gambar produk secara berkala untuk menjaga freshness website
