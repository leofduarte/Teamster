<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateParticipantAuthTable extends Migration
{
    public function up()
    {
        Schema::create('participant_auth', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->integer('code');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('participant_auth');
    }
}
