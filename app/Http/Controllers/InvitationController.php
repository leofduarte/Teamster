<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use Illuminate\Http\Request;
use App\Models\Invitation;
use App\Mail\InvitationMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class InvitationController extends Controller
{
    public function sendInvitation(Request $request)
    {
        $token = Str::random(32);
        $invitation = Invitation::create([
            'email' => $request->email,
            'team_id' => $request->team_id,
            'token' => $token,
        ]);

        $invitationLink = url("/invite/{$token}");

        Mail::to($request->email)->send(new InvitationMail($invitation->team, $invitationLink));

        return response()->json(['message' => 'Invitation sent successfully.']);
    }

    public function showInvitationForm($token)
    {
        $invitation = Invitation::where('token', $token)->firstOrFail();

        return response()->json(['invitation' => $invitation]);
    }

    public function respondToInvitation(Request $request)
    {
        $invitation = Invitation::where('token', $request->token)->firstOrFail();

        $participant = Participant::create([
            'email' => $invitation->email,
            'team_id' => $invitation->team_id,
            'invitation_token' => $invitation->token,
            'questionnaire_data' => json_encode($request->questionnaire_data),
        ]);

        $invitation->update(['is_invitation_accepted' => true]);

        return response()->json(['message' => 'Thank you for responding to the invitation.']);
    }

    public function acceptInvitation(Request $request, $token)
    {
        $invitation = Invitation::where('token', $token)->firstOrFail();

        $participant = Participant::create([
            'email' => $invitation->email,
        ]);

        $status_id = $request->status_id ?? 3;

        if ($participant) {
            $participant->teams()->attach($invitation->team_id, ['status_id' => $status_id]);
            \Log::info('Participant created: ', ['participant' => $participant->toArray()]);
        } else {
            \Log::error('Failed to create participant');
        }

        $invitation->delete();

        return response()->json(['message' => 'You have successfully joined the team.']);
    }
}
