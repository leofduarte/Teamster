<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('jobs')) {
            Schema::drop('jobs');
        }

        if (Schema::hasTable('job_batches')) {
            Schema::drop('job_batches');
        }

        if (Schema::hasTable('failed_jobs')) {
            Schema::drop('failed_jobs');
        }
    }

    };


