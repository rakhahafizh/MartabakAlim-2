<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Martabak Manis Jumbo Durian Keju',
                'description' => 'Martabak manis yang memiliki durian dan keju sebagai toppingnya.',
                'price' => 'Rp. 60.000',
                'image_path' => '/images/DK.png',
                'category' => 'Signature',
                'badge' => 'Best Seller',
                'is_featured' => true,
                'order' => 1,
            ],
            [
                'name' => 'Martabak Manis Pandan Keju',
                'description' => 'Martabak manis berwarna hijau beraroma pandan dengan keju.',
                'price' => 'Rp. 41.000',
                'image_path' => '/images/PK.png',
                'category' => 'Classic',
                'badge' => 'Recommended',
                'is_featured' => true,
                'order' => 2,
            ],
            [
                'name' => 'Martabak Telor Daging Ayam',
                'description' => 'Martabak telor premium dengan isian telur utuh dan daging ayam.',
                'price' => 'Rp. 40.000',
                'image_path' => '/images/TA.png',
                'category' => 'Savory',
                'badge' => 'Best Seller',
                'is_featured' => true,
                'order' => 3,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
