<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invitation extends Model
{
    protected $fillable = ['email', 'team_id', 'token'];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }
}
