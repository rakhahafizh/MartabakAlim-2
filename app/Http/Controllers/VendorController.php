<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use App\Models\StockItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $vendors = Vendor::with('stockItems')->get();
        return Inertia::render('Vendor/Index', [
            'vendors' => $vendors
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $stockItems = StockItem::all();
        return Inertia::render('Vendor/Create', [
            'stockItems' => $stockItems
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'vendor_name' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'contact' => 'required|string|max:255',
            'stock_items' => 'nullable|array',
            'stock_items.*' => 'exists:stock_items,id'
        ]);

        $vendor = Vendor::create([
            'vendor_name' => $validated['vendor_name'],
            'name' => $validated['name'],
            'contact' => $validated['contact'],
        ]);

        if (isset($validated['stock_items'])) {
            $vendor->stockItems()->sync($validated['stock_items']);
        }

        return redirect()->route('vendors.index')
            ->with('success', 'Vendor berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vendor $vendor)
    {
        $vendor->load('stockItems');
        $stockItems = StockItem::all();
        
        return Inertia::render('Vendor/Edit', [
            'vendor' => $vendor,
            'stockItems' => $stockItems
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Vendor $vendor)
    {
        $validated = $request->validate([
            'vendor_name' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'contact' => 'required|string|max:255',
            'stock_items' => 'nullable|array',
            'stock_items.*' => 'exists:stock_items,id'
        ]);

        $vendor->update([
            'vendor_name' => $validated['vendor_name'],
            'name' => $validated['name'],
            'contact' => $validated['contact'],
        ]);

        if (isset($validated['stock_items'])) {
            $vendor->stockItems()->sync($validated['stock_items']);
        } else {
            $vendor->stockItems()->sync([]);
        }

        return redirect()->route('vendors.index')
            ->with('success', 'Vendor berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vendor $vendor)
    {
        $vendor->delete();
        
        return redirect()->route('vendors.index')
            ->with('success', 'Vendor berhasil dihapus');
    }
}
