<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanActivitiesTable extends Migration
{
    public function up()
    {
        Schema::create('plan_activities', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('duration');
            $table->date('date');
            $table->string('location');
            $table->unsignedBigInteger('team_id')->nullable(); 
            $table->foreign('team_id')->references('id')->on('teams')->onDelete('set null');            
            $table->string('price');
            $table->json('objectives');
            $table->text('observations')->nullable();
            $table->timestamps();

        });
    }

    public function down()
    {
        Schema::dropIfExists('plan_activities');
    }
}