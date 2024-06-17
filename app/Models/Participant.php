<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    protected $fillable = ['email', 'name', 'phone', 'role_id'];

    public function teams()
    {
        return $this->belongsToMany(Team::class)->withPivot('status_id');
    }

    public function items()
    {
        return $this->belongsToMany(Item::class)->withPivot('response');
    }
}
