<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class InvitationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $team;
    public $invitationLink;

    public function __construct($team, $invitationLink)
    {
        $this->team = $team;
        $this->invitationLink = $invitationLink;
    }

    public function build()
    {
        return $this->view('emails.invitation')
            ->subject('Join Our Team')
            ->with([
                'teamName' => $this->team->name,
                'invitationLink' => $this->invitationLink,
            ]);
    }
}
