<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\VendorController;
use App\Models\Location;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('home');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/home', function () {
    $locations = Location::where('is_active', true)->orderBy('name')->get();
    $products = Product::where('is_featured', true)->orderBy('order')->get();
    return Inertia::render('Home', [
        'locations' => $locations,
        'products' => $products
    ]);
})->name('home');

Route::middleware('auth')->group(function () {
    // Location Routes - Admin Only
    Route::resource('locations', LocationController::class);
    
    // Product Routes - Admin Only
    Route::resource('products', ProductController::class);
    
    // Vendor Routes - Admin Only
    Route::resource('vendors', VendorController::class);
    
    // Stock Opname Routes - Admin Only
    Route::get('/stock-opname', [StockController::class, 'index'])->name('stock.index');
    Route::get('/stock-opname/create', [StockController::class, 'create'])->name('stock.create');
    Route::post('/stock-opname', [StockController::class, 'store'])->name('stock.store');
    Route::get('/stock-opname/{id}/edit', [StockController::class, 'edit'])->name('stock.edit');
    Route::put('/stock-opname/{id}', [StockController::class, 'update'])->name('stock.update');
    Route::delete('/stock-opname/{id}', [StockController::class, 'destroy'])->name('stock.destroy');
    
    // Profile Routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
