<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Participant;
use App\Models\Questionnaire;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Team;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Pagination\LengthAwarePaginator;

class TeamController extends Controller
{

    public function showTeamMembers(Request $request){

        $user = Auth::user();

        $teams = $user->departments()->with('teams')->with('teams.participants')->get();

        return Inertia::render('SeeTeams2', [
            'teams' => $teams
        ]);
    }


    public function addToTeam(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'department_id' => 'required|integer',
        ]);

        $department = Department::find($validatedData['department_id']);

        if (!$department) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $existingTeam = $department->teams()->where('name', $validatedData['name'])->first();
        if ($existingTeam) {
            return response()->json(['message' => 'Team with this name already exists for the Department'], 409);
        }

        $team = new Team(['name' => $validatedData['name']]);

        $department->teams()->save($team);

        return response()->json(['message' => 'Team created successfully', 'teamId' => $team->id]);
    }


    public function TeamPage($id, Request $request)
{
    $user = Auth::user();

    $userDepartments = $user->departments()->with(['teams.participants' => function($query) {
        $query->withPivot('status_id');
    }, 'teams.department', 'teams.questionnaires'])->get();

    $team = null;

    foreach ($userDepartments as $department) {
        $team = $department->teams->where('id', $id)->first();
        if ($team) {
            break;
        }
    }

    if (!$team) {
        return response()->json(['message' => 'Team not found'], 404);
    }

    // Flatten the participants array
    $participants = collect($team->participants)->flatten();

    // Get current page from request, if not set default to 1
    $page = $request->get('page', 1);

    // Create a new LengthAwarePaginator instance
    $paginatedParticipants = new LengthAwarePaginator(
        $participants->forPage($page, 10), // Items for current page
        $participants->count(), // Total items
        10, // Items per page
        $page, // Current page
        ['path' => url()->current()] // Page url
    );

    $countStatus3 = $team->participants()->wherePivot('status_id', 3)->count();
    $userQuestionnaires = Auth::user()->questionnaires;


    return Inertia::render('TeamPage', [
        'team' => $team,
        'participants' => $paginatedParticipants,
        'countStatus3' => $countStatus3,
        'questionnaires' => $team->questionnaires,
        'userQuestionnaires' => $userQuestionnaires
    ]);
}

    /*public function getTeamsAndParticipants(Request $request)
    {

        $user = User::find($request->input('userId'));


        $departments = $user->departments()->pluck('id');

        $teams = Team::whereIn('department_id', $departments)
            ->with(['participants' => function($query) {
                $query->withPivot('status_id');
            }])
            ->with('department')
            ->orderBy('teams.name')
            ->get();

        return response()->json($teams);

        $teams = [];

        // Loop through each department and get its teams
        foreach ($departments as $department) {
           $departmentTeams = [];
            $departmentTeams[$department->id]['department'] = $department;
            $departmentTeams[$department->id]['teams'] = $department->teams()->with('participants')->get();

            $departmentTeams = $department->with('teams')->with('teams.participants')->get();
            // Merge the teams of the current department with the existing teams
            $teams = array_merge($teams, $departmentTeams->toArray());
        }

        return response()->json($teams);
    }
     */

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

        $team = $team->where('id', $teamId)
            ->with(['participants' => function($query) {
                $query->withPivot('status_id');
            }])
            ->with('department')
            ->first();

        return response()->json(['message' => 'Participants added to team successfully', 'team' => $team]);
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

    public function addDepartmentToTeam(Request $request, $teamId)
    {
        $departmentId = $request->input('department_id');

        $team = Team::find($teamId);
        if (!$team) {
            return response()->json(['message' => 'Team not found'], 404);
        }

        $department = Department::find($departmentId);
        if (!$department) {
            return response()->json(['message' => 'Department not found'], 404);
        }

        $team->department_id = $departmentId;
        $team->save();

        return response()->json(['message' => 'Department added to team successfully']);
    }

    public function removeParticipantFromTeam(Request $request, $teamId, $participantId)
    {
        $team = Team::find($teamId);
        if (!$team) {
            return response()->json(['message' => 'Team not found'], 404);
        }

        $participant = Participant::find($participantId);
        if (!$participant) {
            return response()->json(['message' => 'Participant not found'], 404);
        }

        $team->participants()->detach($participantId);

        return response()->json(['message' => 'Participant removed from team successfully']);
    }

    public function addQuestionnaireToTeam(Request $request, $teamId, $questionnaireId)
    {
        $team = Team::find($teamId);
        $questionnaire = Questionnaire::find($questionnaireId);

        if (!$team || !$questionnaire) {
            return redirect()->back()->with('error',  'Team or questionnaire not found');
        }

        $team->questionnaires()->attach($questionnaireId);

        return redirect()->back()->with('success', 'Questionnaire added to team successfully');
    }

    public function removeQuestionnaireFromTeam(Request $request, $teamId, $questionnaireId)
    {
        $team = Team::find($teamId);
        $questionnaire = Questionnaire::find($questionnaireId);

        if (!$team || !$questionnaire) {
            return redirect()->back()->with('error', 'Team or questionnaire not found');
        }

        $team->questionnaires()->detach($questionnaireId);

        return redirect()->back()->with('success', 'Questionnaire removed from team successfully');
    }

    public function getParticipantsFromTeams()
    {
        $teams = Team::with('participants')->get();

        return response()->json($teams);

    }
}
