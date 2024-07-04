<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ActivityInvite extends Mailable
{
    use Queueable, SerializesModels;

    public $activity;

    public function __construct($activity)
    {
        $this->activity = $activity;
    }

    public function build()
    {
        return $this->view('emails.notificationactivity')
                    ->with([
                        'activity' => $this->activity,
                    ]);
    }
}
