<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveRefTeamIdAndStatusIdFromParticipantsTable extends Migration
{
    public function up()
    {
        Schema::table('participants', function (Blueprint $table) {
            $table->dropForeign(['ref_team_id']);
            $table->dropColumn('ref_team_id');
            $table->dropForeign(['status_id']);
            $table->dropColumn('status_id');
        });
    }

    public function down()
    {
        Schema::table('participants', function (Blueprint $table) {
            $table->foreignId('ref_team_id')->constrained()->onDelete('cascade');
            $table->foreignId('status_id')->constrained()->onDelete('cascade');
        });
    }
}
