<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Location;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $locations = [
            [
                'name' => 'Tambun',
                'address' => 'Jl. Raya Tambun',
                'phone' => '+62 812 2932 6653',
                'opening_time' => '15:00',
                'closing_time' => '23:30',
                'map_embed_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.87759540160283!2d107.07329818650307!3d-6.258260399058733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698fa36c8040c9%3A0x9cdaff6d01c3634c!2sMartabak%20Alim!5e0!3m2!1sen!2sid!4v1765659466959!5m2!1sen!2sid',
                'gofood_url' => 'https://gofood.link/a/yMa2My1',
                'shopeefood_url' => 'https://shopee.co.id/universal-link/now-food/shop/1008047?deep_and_deferred=1&shareChannel=copy_link',
                'grab_url' => 'https://r.grab.com/g/6-20251217_192822_D8D406FF00744A5BAFC7186724209326_MEXMPS-6-C2CUCXNUBE5JVA',
                'is_active' => true,
            ],
            [
                'name' => 'Cikarang',
                'address' => 'Cikarang, Bekasi',
                'phone' => '+62 812 2932 6653',
                'opening_time' => '15:00',
                'closing_time' => '23:30',
                'map_embed_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7931.98649809519!2d107.1825953691671!3d-6.264617022326239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6984a2d0d4f555%3A0xddee7e1ad9bc6ab5!2sMARTABAK%20ALIM!5e0!3m2!1sen!2sid!4v1765984820396!5m2!1sen!2sid',
                'gofood_url' => 'https://gofood.link/u/R1jrR',
                'shopeefood_url' => null,
                'grab_url' => null,
                'is_active' => true,
            ],
        ];

        foreach ($locations as $location) {
            Location::create($location);
        }
    }
}
