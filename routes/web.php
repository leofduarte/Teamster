<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\Auth\ParticipantAuth\ParticipantAuthController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\PdfController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuestionnaireController;
use App\Http\Controllers\TeamController;
use App\Http\Middleware\CheckQuest;
use App\Models\Team;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function() {
    $teams = Team::whereIn('department_id', auth()->user()->departments->pluck('id'))
        ->with(['participants' => function($query) {
            $query->withPivot('status_id');
        }])
        ->with('department')
        ->orderBy('teams.name')
        ->get();

    return Inertia::render('DashboardPage', [
        'teams' => $teams,]);
});

Route::get('/landing', function () {
    return Inertia::render('LandingPage');
});

Route::get('/invite', function () {
    return Inertia::render('InviteForm');
});

Route::post('/newfeedback', function () {
    return Inertia::render('FeedbackQuestionnaire', [
        'newquestionnaire_id' => request()->questionnaire_id
    ]);
})->middleware('auth');

Route::get('/feedback', function () {
    return Inertia::render('AllFeedbackQuestionnaires');
})->middleware('auth');

Route::get('/questionnaire', function () {
    return Inertia::render('Questionnaire');
})->middleware('auth');

//Route::get('/editquestionnaire/{id}', [QuestionnaireController::class, 'show']);

Route::get('/questionnaires/{id}/edit', [QuestionnaireController::class, 'show']);

Route::delete('/v1/deletequestionnaire/{id}', [QuestionnaireController::class, 'deleteQuestionnaire']);

Route::post('/send-invite', [InvitationController::class, 'sendInvite']);
Route::get('/invite/{token}', [InvitationController::class, 'showInvitationForm']);
Route::post('/invitations/respond', [InvitationController::class, 'respondToInvitation']);

Route::get('/teams', function () {

    $departments = auth()->user()->departments;
    $teams = Team::whereIn('department_id', auth()->user()->departments->pluck('id'))
        ->with(['participants' => function ($query) {
            $query->withPivot('status_id');
        }])
        ->with('department')
        ->orderBy('teams.name')
        ->get();

    return Inertia::render('SeeTeams', [
        'teams' => $teams,
        'departments' => $departments
    ]);
})->middleware('auth');

Route::get('/teams/{id}', [TeamController::class, 'TeamPage'])
    ->middleware('auth');

Route::post('/teams/{teamId}/questionnaires/{questionnaireId}', [TeamController::class, 'addQuestionnaireToTeam'])
    ->middleware('auth');

Route::delete('/teams/{teamId}/questionnaires/{questionnaireId}', [TeamController::class, 'removeQuestionnaireFromTeam']);

Route::get('/teams2', [TeamController::class, 'showTeamMembers'])
    ->middleware('auth');

Route::get('/addresponse', function () {
    return Inertia::render('AddResponse');
})->middleware('auth')->name('addresponse');

Route::get('/invite/{token}', [InvitationController::class, 'acceptInvitation']);

Route::get('/invite2', function () {
    return Inertia::render('InviteForm2');
})->middleware('auth')->name('inviteform');

Route::get('/atividade', function () {
    return Inertia::render('Plan_activity');
})->middleware('auth')->name('atividade');

Route::get('/atividade/{id}', function () {
    return Inertia::render('Activity');
})->middleware('auth')->name('Activity');

Route::get('/atividade/detalhes/{id}', [ActivityController::class, 'show']);

Route::get('/atividade/{id}', [ActivityController::class, 'redoActivity']);

Route::get('/participantauth', function () {
    return Inertia::render('ParticipantAuth');
});

Route::post('/participantauth/verify', [ParticipantAuthController::class, 'verifyCode']);

Route::get('/participant', function() {
    return Inertia::render('ParticipantLayout', [ 'user_id' => auth()->guard('participants')->user()->id]);
})->name('participant')->middleware(CheckQuest::class);

Route::get('/participantprofile', function() {
    return Inertia::render('ProfilePage');
});

Route::get('/partners', function () {
    return Inertia::render('Partners');
})->middleware('auth')->name('partners');

Route::get('/participantquest', function () {
    return Inertia::render('Quizz', [
        'user_id' => auth()->guard('participants')->user()->id
    ]);
})->name('participantquest')->middleware(CheckQuest::class);

Route::get('/atividade/{id}/pdf', [PdfController::class, 'generatePdf']);

Route::get('/who', function () {
       return Inertia::render('ManagerOrParticipant');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('atividade/{id}/sendinvite', [ActivityController::class, 'sendInvite']);

require __DIR__ . '/auth.php';
