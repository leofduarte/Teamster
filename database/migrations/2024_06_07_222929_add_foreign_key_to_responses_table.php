<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeyToResponsesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('responses', function (Blueprint $table) {
            $table->foreign('question_id', 'responses_question_id_foreign_unique') // Add a unique name here
                  ->references('id')->on('questions')->onDelete('cascade');
            $table->unique(['participant_id', 'question_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('responses', function (Blueprint $table) {
            $table->dropForeign('responses_question_id_foreign_unique'); // And drop it here
            $table->dropUnique(['participant_id', 'question_id']);
        });
    }
}
