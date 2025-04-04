<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;
    protected $table = 'activities';
    protected $fillable = [
        'plan_activity_id',
        'name',
        'description',
        'activities',
        'schedule',
        'planner_tasks',
        'participant_tasks',
    ];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function planActivity()
    {
        return $this->belongsTo(PlanActivity::class);
    }

}
