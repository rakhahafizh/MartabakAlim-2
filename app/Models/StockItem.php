<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'item_id',
        'item_name',
        'category',
        'unit',
        'system_qty',
        'physical_qty',
        'difference',
        'status',
        'location',
        'notes'
    ];

    protected $casts = [
        'system_qty' => 'decimal:2',
        'physical_qty' => 'decimal:2',
        'difference' => 'decimal:2',
    ];

    // Automatically calculate difference when physical_qty changes
    protected static function booted()
    {
        static::saving(function ($stockItem) {
            if ($stockItem->physical_qty !== null) {
                $stockItem->difference = $stockItem->physical_qty - $stockItem->system_qty;
            }
        });
    }
}
