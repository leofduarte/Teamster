<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = ['name'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function participants()
    {
        return $this->belongsToMany(Participant::class, 'participant_team');
    }

    public function questionnaires()
    {
        return $this->belongsToMany(Questionnaire::class);
    }



}


