# Location Management Feature

## Overview
Fitur manajemen lokasi untuk Martabak Alim yang memungkinkan admin untuk menambah, edit, dan hapus lokasi cabang. Lokasi yang ditambahkan akan otomatis ditampilkan di home page dengan Google Maps dan link order.

## Features
✅ CRUD lengkap untuk lokasi (Create, Read, Update, Delete)
✅ Integrasi Google Maps embed
✅ Link order untuk GoFood, ShopeeFood, dan GrabFood
✅ Status aktif/non-aktif untuk menampilkan atau menyembunyikan lokasi di home page
✅ Dynamic location display di home page

## Database Structure
Table: `locations`
- id
- name (string)
- address (text)
- phone (string)
- opening_time (time)
- closing_time (time)
- map_embed_url (text)
- gofood_url (string, nullable)
- shopeefood_url (string, nullable)
- grab_url (string, nullable)
- is_active (boolean)
- created_at
- updated_at

## Routes
- GET `/locations` - List all locations
- GET `/locations/create` - Form untuk tambah lokasi
- POST `/locations` - Store new location
- GET `/locations/{id}/edit` - Form untuk edit lokasi
- PUT `/locations/{id}` - Update location
- DELETE `/locations/{id}` - Delete location

## Cara Menggunakan

### 1. Akses Management Page
Login sebagai admin dan klik menu "Locations" di navigation bar.

### 2. Menambah Lokasi Baru
1. Klik tombol "Tambah Lokasi Baru"
2. Isi form:
   - **Nama Lokasi**: Contoh: Tambun, Cikarang
   - **Alamat**: Alamat lengkap lokasi
   - **Nomor Telepon**: Nomor kontak lokasi
   - **Jam Buka/Tutup**: Jam operasional
   - **Google Maps Embed URL**: URL embed dari Google Maps
   - **Link Order** (Opsional): URL untuk GoFood, ShopeeFood, GrabFood
   - **Status Aktif**: Centang jika ingin lokasi ditampilkan di home page
3. Klik "Simpan Lokasi"

### 3. Mendapatkan Google Maps Embed URL
1. Buka [Google Maps](https://www.google.com/maps)
2. Cari lokasi yang diinginkan
3. Klik tombol "Share" 
4. Pilih tab "Embed a map"
5. Copy URL yang ada di dalam tag iframe `src="..."`
6. Paste ke field "Google Maps Embed URL"

### 4. Edit Lokasi
1. Dari halaman list locations, klik tombol "Edit" pada lokasi yang ingin diubah
2. Update informasi yang diperlukan
3. Klik "Update Lokasi"

### 5. Hapus Lokasi
1. Dari halaman list locations, klik tombol "Delete" pada lokasi yang ingin dihapus
2. Konfirmasi penghapusan

## Home Page Integration
Lokasi yang berstatus `is_active = true` akan otomatis ditampilkan di:
1. **About Section** - Menampilkan jam operasional dan nomor telepon dari lokasi yang dipilih
2. **Location Map Section** - Menampilkan peta Google Maps sesuai lokasi yang dipilih
3. **Order Section** - Menampilkan tombol order sesuai link yang tersedia (GoFood, ShopeeFood, GrabFood)

User dapat memilih cabang yang berbeda dan konten akan berubah secara dinamis.

## Default Locations
Seeder sudah menyediakan 2 lokasi default:
- **Tambun** (dengan GoFood, ShopeeFood, dan GrabFood)
- **Cikarang** (dengan GoFood)

## Technical Notes
- Model: `App\Models\Location`
- Controller: `App\Http\Controllers\LocationController`
- React Pages: `resources/js/Pages/Location/`
- Migration: `database/migrations/2026_01_11_145355_create_locations_table.php`
- Seeder: `database/seeders/LocationSeeder.php`

## Permissions
Semua aksi location management memerlukan autentikasi (middleware `auth`).
