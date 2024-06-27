<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = ['name', 'department_id'];

    public function participants()
    {
        return $this->belongsToMany(Participant::class, 'participant_team');
    }

    public function questionnaires()
    {
        return $this->belongsToMany(Questionnaire::class, 'team_questionnaire');
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}
