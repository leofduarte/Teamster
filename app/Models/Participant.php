<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    protected $fillable = ['email', 'name', 'phone', 'team_id', 'role_id', 'status_id'];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function items()
    {
        return $this->belongsToMany(Item::class)->withPivot('response');
    }
}
