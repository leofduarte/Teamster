<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRoleIdAndCreatedByToUsersTable extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('role_id')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();

            $table->foreign('role_id')->references('id')->on('user_roles');
            $table->foreign('created_by')->references('id')->on('users');
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['role_id']);
            $table->dropColumn('role_id');
            $table->dropForeign(['created_by']);
            $table->dropColumn('created_by');
        });
    }
}
