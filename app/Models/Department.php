<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;
    protected $table = 'departments';
    protected $fillable = ['name', 'email', 'phone', 'address'];

    public function users()
    {
        return $this->belongsToMany(User::class, 'department_user');
    }

    public function teams()
    {
        return $this->hasMany(Team::class);
    }
}
