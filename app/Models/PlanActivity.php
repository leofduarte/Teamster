<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlanActivity extends Model
{
    use HasFactory;
    protected $table = 'plan_activities';
    protected $fillable = ['name', 'duration', 'date', 'location', 'team_id', 'price', 'objectives', 'observations'];

    public function activities()
    {
        return $this->hasMany(Activity::class);
    }

    public function team()
    {
        return $this->belongsTo(Team::class);
    }
}

