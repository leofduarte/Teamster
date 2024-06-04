<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\InvitationMail;
use App\Models\Team;

class InvitationController extends Controller
{
    public function sendInvitation(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'team_id' => 'required|exists:teams,id',
            ]);
        } catch (ValidationException $e) {
            Log::error($e->errors());
            throw $e;
        }

        $email = $request->email;
        $team = Team::find($request->team_id);

        $invitationLink = url('/join-team/' . $team->id . '?token=' . sha1(time()));

        Mail::to($email)->send(new InvitationMail($team, $invitationLink));

        return response()->json(['message' => 'Invitation sent successfully.']);
    }
}
