<?php

namespace App\Http\Controllers;

use App\Models\StockItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StockController extends Controller
{
    public function index(Request $request)
    {
        $query = StockItem::query();

        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('item_id', 'like', "%{$search}%")
                  ->orWhere('item_name', 'like', "%{$search}%");
            });
        }

        if ($request->filled('category')) {
            $query->where('category', $request->get('category'));
        }

        if ($request->filled('status')) {
            $query->where('status', $request->get('status'));
        }

        if ($request->filled('location')) {
            $query->where('location', $request->get('location'));
        }

        $stockItems = $query->orderBy('item_id')->paginate(10);

        // Dashboard Statistics
        $stats = [
            'total_items' => StockItem::count(),
            'low_stock_count' => StockItem::where('system_qty', '<', 10)->count(),
            'categories_count' => StockItem::distinct('category')->count('category'),
            'pending_count' => StockItem::where('status', 'pending')->count(),
        ];

        // Low Stock Items (for alerts)
        $lowStockItems = StockItem::where('system_qty', '<', 10)
            ->orderBy('system_qty', 'asc')
            ->limit(5)
            ->get();

        // Location Breakdown (per lokasi)
        $locationBreakdown = StockItem::select('location')
            ->selectRaw('count(*) as count')
            ->groupBy('location')
            ->get();

        return Inertia::render('Stock/Index', [
            'stock_items' => $stockItems,
            'stats' => $stats,
            'low_stock_items' => $lowStockItems,
            'location_breakdown' => $locationBreakdown,
            'filters' => [
                'search' => $request->get('search'),
                'category' => $request->get('category'),
                'status' => $request->get('status'),
                'location' => $request->get('location')
            ],
            'flash' => [
                'success' => session('success'),
                'error' => session('error')
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Stock/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'item_code' => 'required|string|unique:stock_items,item_id',
            'item_name' => 'required|string|max:255',
            'category' => 'required|string',
            'unit' => 'required|string',
            'system_qty' => 'required|numeric|min:0',
            'location' => 'required|string|max:255'
        ]);

        StockItem::create([
            'item_id' => $request->item_code,
            'item_name' => $request->item_name,
            'category' => $request->category,
            'unit' => $request->unit,
            'system_qty' => $request->system_qty,
            'location' => $request->location,
            'status' => 'pending'
        ]);

        return redirect()->route('stock.index')->with('success', 'Item stock baru berhasil ditambahkan!');
    }

    public function edit($id)
    {
        $stockItem = StockItem::findOrFail($id);
        
        return Inertia::render('Stock/Edit', [
            'stock_item' => $stockItem
        ]);
    }

    public function update(Request $request, $id)
    {
        if ($request->has('physical_qty')) {
            $request->validate([
                'physical_qty' => 'required|numeric|min:0',
                'notes' => 'nullable|string|max:1000'
            ]);

            $stockItem = StockItem::findOrFail($id);
            
            // Only set status to 'checked' if physical_qty matches system_qty
            // Otherwise keep as 'pending' for review
            $status = ($request->physical_qty == $stockItem->system_qty) ? 'checked' : 'pending';
            
            $stockItem->update([
                'physical_qty' => $request->physical_qty,
                'notes' => $request->notes,
                'status' => $status
            ]);

            return redirect()->route('stock.index')->with('success', 'Stock berhasil diupdate!');
        } else {
            $request->validate([
                'item_code' => 'required|string|unique:stock_items,item_id,' . $id,
                'item_name' => 'required|string|max:255',
                'category' => 'required|string',
                'unit' => 'required|string',
                'system_qty' => 'required|numeric|min:0',
                'location' => 'required|string|max:255'
            ]);

            $stockItem = StockItem::findOrFail($id);
            
            // Check if system_qty has changed
            $systemQtyChanged = $stockItem->system_qty != $request->system_qty;
            
            $updateData = [
                'item_id' => $request->item_code,
                'item_name' => $request->item_name,
                'category' => $request->category,
                'unit' => $request->unit,
                'system_qty' => $request->system_qty,
                'location' => $request->location,
            ];
            
            // If system_qty changed, reset status to pending and clear physical_qty
            if ($systemQtyChanged) {
                $updateData['status'] = 'pending';
                $updateData['physical_qty'] = null;
            }
            
            $stockItem->update($updateData);

            return redirect()->route('stock.index')->with('success', 'Item berhasil diupdate!');
        }
    }

    public function destroy($id)
    {
        $stockItem = StockItem::findOrFail($id);
        $stockItem->delete();

        return redirect()->route('stock.index')->with('success', 'Item berhasil dihapus!');
    }
}