<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create 3 admin users for concurrent access
        User::create([
            'name' => 'Admin 1',
            'email' => 'admin1@martabakalim.com',
            'password' => bcrypt('admin123'),
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Admin 2',
            'email' => 'admin2@martabakalim.com',
            'password' => bcrypt('admin123'),
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Admin 3',
            'email' => 'admin3@martabakalim.com',
            'password' => bcrypt('admin123'),
            'email_verified_at' => now(),
        ]);
    }
}
