<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('stock_items', function (Blueprint $table) {
            $table->id();
            $table->string('item_id')->unique();
            $table->string('item_name');
            $table->string('category');
            $table->string('unit');
            $table->decimal('system_qty', 10, 2);
            $table->decimal('physical_qty', 10, 2)->nullable();
            $table->decimal('difference', 10, 2)->default(0);
            $table->enum('status', ['pending', 'checked', 'adjusted'])->default('pending');
            $table->string('location');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_items');
    }
};
