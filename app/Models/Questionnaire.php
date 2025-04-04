<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Questionnaire extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description'];

    public function teams()
    {
        return $this->belongsToMany(Team::class, 'team_questionnaire');
    }

    public function questions()
    {
        return $this->hasMany(Question::class, 'questionnaire_id');
    }
}
