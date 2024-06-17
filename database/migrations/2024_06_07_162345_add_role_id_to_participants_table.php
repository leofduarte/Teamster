<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRoleIdToParticipantsTable extends Migration
{
    public function up()
    {
        Schema::table('participants', function (Blueprint $table) {
            if (!Schema::hasColumn('participants', 'role_id')) {
                $table->unsignedBigInteger('role_id')->nullable();
                $table->foreign('role_id')->references('id')->on('user_roles');
            }
        });
    }

    public function down()
    {
        Schema::table('participants', function (Blueprint $table) {
            if (Schema::hasColumn('participants', 'role_id')) {
                $table->dropForeign(['role_id']);
                $table->dropColumn('role_id');
            }
        });
    }
}
