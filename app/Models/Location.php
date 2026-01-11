<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $fillable = [
        'name',
        'address',
        'phone',
        'opening_time',
        'closing_time',
        'map_embed_url',
        'gofood_url',
        'shopeefood_url',
        'grab_url',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'opening_time' => 'datetime:H:i',
        'closing_time' => 'datetime:H:i',
    ];
}
