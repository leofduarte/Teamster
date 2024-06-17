<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Team;
use Illuminate\Support\Facades\Validator;

class TeamController extends Controller
{
    public function addToTeam(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'userId' => 'required|integer',
        ]);

        $user = User::find($validatedData['userId']);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $existingTeam = $user->teams()->where('name', $validatedData['name'])->first();
        if ($existingTeam) {
            return response()->json(['message' => 'Team with this name already exists for the user'], 409);
        }

        $team = new Team(['name' => $validatedData['name']]);

        $user->teams()->save($team);

        // Return the teamId in the response
        return response()->json(['message' => 'Team created successfully', 'teamId' => $team->id]);
    }

public function getTeamsAndParticipants(Request $request)
{
    $userId = $request->input('userId');
    $user = User::find($userId);
    $teams = $user->teams()->with('participants')->get();

    return response()->json($teams);
}

    public function addParticipantToTeam(Request $request, $teamId)
    {
        $validatedData = $request->validate([
            'email' => 'required|email',
            'name' => 'string|nullable',
            'phone' => 'string|integer|nullable',
        ]);

        $team = Team::find($teamId);

        if (!$team) {
            return response()->json(['message' => 'Team not found'], 404);
        }

        $existingParticipant = $team->participants()->where('email', $validatedData['email'])->first();
        if ($existingParticipant) {
            return response()->json(['message' => 'Participant already exists in the team'], 409);
        }

        $participant = new Participant($validatedData);
        $participant->save();
        $participant->teams()->attach($teamId);

        return response()->json(['message' => 'Participant added to team successfully']);
    }

    public function addMultipleParticipantsToTeam(Request $request, $teamId)
    {
        $team = Team::find($teamId);

        if (!$team) {
            return response()->json(['message' => 'Team not found'], 404);
        }

        $emails = $request->input('emails');

        if (!is_array($emails)) {
            return response()->json(['message' => 'The emails input is required and should be an array.'], 400);
        }

        foreach ($emails as $email) {
            $existingParticipant = $team->participants()->where('email', $email)->first();
            if ($existingParticipant) {
                continue;
            }

            $participant = new Participant(['email' => $email]);
            $participant->save();
            $participant->teams()->attach($teamId);
        }

        return response()->json(['message' => 'Participants added to team successfully']);
    }

    public function validateEmails(Request $request)
    {
        $emails = $request->input('emails');
        $removeDuplicates = $request->input('removeDuplicates');

        $validator = Validator::make($emails, [
            '*.email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => "Invalid emails detected in your list."], 400);
        }

        $uniqueEmails = array_unique(array_column($emails, 'email'));
        if (count($uniqueEmails) < count($emails)) {
            if ($removeDuplicates) {
                $emails = array_intersect_key($emails, $uniqueEmails);

                return response()->json(['message' => 'Email validation successful. Duplicates removed.', 'emails' => array_values($emails)], 200);
            } else {
                return response()->json(['message' => "Duplicate emails detected in your list. No action taken."], 400);
            }
        }

        return response()->json(['message' => 'Email validation successful. No duplicates found.', 'emails' => $emails], 200);
    }



    public function storeUniqueEmails(Request $request)
    {
        $emails = $request->input('emails');
        $teamId = $request->input('teamId');
        $newEmails = [];
        $existingEmails = [];

        $validator = Validator::make($emails, [
            '*.email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => "Invalid emails detected in your list."], 400);
        }

        foreach ($emails as $email) {
            $existingEmail = Participant::where('email', $email['email'])->first();
            if (!$existingEmail) {
                $participant = Participant::create(['email' => $email['email']]);
                $participant->teams()->attach($teamId);
                $newEmails[] = $email['email'];
            } else {
                $existingEmails[] = $email['email'];
            }
        }

        if (count($newEmails) === 0) {
            return response()->json(['message' => 'No new emails were added to the database.'], 400);
        }

        return response()->json([
            'message' => 'Emails processed successfully.',
            'newEmails' => $newEmails,
            'existingEmails' => $existingEmails
        ], 200);
    }
}
