<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Response extends Model
{
    use HasFactory;

    protected $fillable = [
        'response',
        'question_id',
        'participant_id',
        'type',
        'label',
        'value',
        'placeholder',
        'tooltip',
        'description',
        ];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
