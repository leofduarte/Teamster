<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParticipantAuth extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'participant_auth';

    protected $fillable = ['email', 'code', 'created_at'];
}
