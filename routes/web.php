<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StockController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('home');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/home', function () {
    return Inertia::render('Home');
})->name('home');

Route::middleware('auth')->group(function () {
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
