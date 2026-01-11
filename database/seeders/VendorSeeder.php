<?php

namespace Database\Seeders;

use App\Models\Vendor;
use App\Models\StockItem;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VendorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Sample vendors
        $vendors = [
            [
                'vendor_name' => 'PT Tepung Berkah',
                'name' => 'Ahmad Wijaya',
                'contact' => '081234567890',
                'stock_categories' => ['Bahan Baku']
            ],
            [
                'vendor_name' => 'CV Telur Segar',
                'name' => 'Siti Nurhaliza',
                'contact' => '081234567891',
                'stock_categories' => ['Bahan Baku']
            ],
            [
                'vendor_name' => 'Toko Kemasan Jaya',
                'name' => 'Budi Santoso',
                'contact' => '081234567892',
                'stock_categories' => ['Kemasan']
            ],
            [
                'vendor_name' => 'Supplier Coklat Premium',
                'name' => 'Lisa Maharani',
                'contact' => 'lisa@coklat.com',
                'stock_categories' => ['Topping', 'Bahan Baku']
            ],
        ];

        foreach ($vendors as $vendorData) {
            $vendor = Vendor::create([
                'vendor_name' => $vendorData['vendor_name'],
                'name' => $vendorData['name'],
                'contact' => $vendorData['contact'],
            ]);

            // Attach random stock items based on categories
            $stockItems = StockItem::whereIn('category', $vendorData['stock_categories'])
                ->inRandomOrder()
                ->limit(rand(2, 5))
                ->pluck('id');

            $vendor->stockItems()->attach($stockItems);
        }
    }
}
