<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticable;

class Participant extends Authenticable
{

    use HasFactory;

    protected $fillable = ['email', 'name', 'phone', 'role_id'];

    protected $casts = [
        'restrictions' => 'array',
        'passions' => 'array',
        'hobbies' => 'array',
    ];

    public function teams()
    {
        return $this->belongsToMany(Team::class)->withPivot('status_id');
    }

    public function items()
    {
        return $this->belongsToMany(Item::class)->withPivot('response');
    }
}
