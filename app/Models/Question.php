<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = ['type', 'label', 'placeholder', 'tooltip', 'description', 'options', 'questionnaire_id', 'is_mandatory'];

    public function questionnaire()
    {
        return $this->belongsTo(Questionnaire::class);
    }
}
