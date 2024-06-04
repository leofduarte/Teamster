<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        if (Schema::hasColumn('items', 'created_at')) {
            Schema::table('items', function (Blueprint $table) {
                $table->dropColumn('created_at');
            });
        }

        if (Schema::hasColumn('items', 'updated_at')) {
            Schema::table('items', function (Blueprint $table) {
                $table->dropColumn('updated_at');
            });
        }

        // Now you can add the columns
        Schema::table('items', function (Blueprint $table) {
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
        });
    }

    public bool $timestamps = false;


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('items', function (Blueprint $table) {
            //
        });
    }
};
