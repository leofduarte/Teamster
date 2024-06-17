<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTeamQuestionnaireTable extends Migration
{
    public function up()
    {
        Schema::create('team_questionnaire', function (Blueprint $table) {
            $table->id();
            $table->foreignId('team_id')->constrained()->onDelete('cascade');
            $table->foreignId('questionnaire_id')->constrained()->onDelete('cascade');
            $table->timestamps();

            $table->unique(['team_id', 'questionnaire_id']);

        });
    }

    public function down()
    {
        Schema::dropIfExists('team_questionnaire');
    }
}
