<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class QuestionnaireAdded extends Mailable
{
    use Queueable, SerializesModels;

    public $questionnaire;

    public function __construct($questionnaire)
    {
        $this->questionnaire = $questionnaire;
    }

    public function build()
    {
        return $this->view('emails.notificationquestionnaire')
            ->with(['questionnaire' => $this->questionnaire]);

    }
}
