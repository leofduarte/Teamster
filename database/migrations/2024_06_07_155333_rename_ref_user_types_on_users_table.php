<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameRefUserTypesOnUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['ref_user_types']);
            $table->dropColumn('ref_user_types');

            $table->unsignedBigInteger('ref_entity_type')->nullable();
            $table->foreign('ref_entity_type')->references('id')->on('entity_type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['ref_entity_type']);
            $table->dropColumn('ref_entity_type');

            $table->unsignedBigInteger('ref_user_types')->nullable();
            $table->foreign('ref_user_types')->references('id')->on('user_types');
        });
    }
}
