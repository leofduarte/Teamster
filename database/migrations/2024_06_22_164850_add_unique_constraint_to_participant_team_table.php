<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddUniqueConstraintToParticipantTeamTable extends Migration
{
    public function up()
    {
        Schema::table('participant_team', function (Blueprint $table) {
            // Add unique constraint to participant_id and team_id
            $table->unique(['participant_id', 'team_id']);
        });
    }

    public function down()
    {
        Schema::table('participant_team', function (Blueprint $table) {
            // Drop unique constraint
            $table->dropUnique(['participant_id', 'team_id']);
        });
    }
}
