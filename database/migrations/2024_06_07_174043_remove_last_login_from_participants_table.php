<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveLastLoginFromParticipantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('participants', function (Blueprint $table) {
            if (Schema::hasColumn('participants', 'last_login')) {
                $table->dropColumn('last_login');
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('participants', function (Blueprint $table) {
            if (!Schema::hasColumn('participants', 'last_login')) {
                $table->timestamp('last_login')->nullable();
            }
        });
    }
}
