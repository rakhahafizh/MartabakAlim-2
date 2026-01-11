<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Vendor extends Model
{
    protected $fillable = [
        'vendor_name',
        'name',
        'contact',
    ];

    public function stockItems(): BelongsToMany
    {
        return $this->belongsToMany(StockItem::class, 'vendor_stock_item');
    }
}
