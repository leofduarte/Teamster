<?php

use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuestionnaireController;
use App\Http\Controllers\TeamController;
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

Route::get('/dashboard', function () {
    return Inertia::render('DashboardPage');
})
    ->middleware(['auth'])
    ->name('dashboard');

Route::get('/landing', function(){
    return Inertia::render('LandingPage');
});

Route::get('/invite', function(){
    return Inertia::render('InviteForm');
});

Route::post('/newfeedback', function(){
    return Inertia::render('FeedbackQuestionnaire', [
        'newquestionnaire_id' => request()->questionnaire_id
    ]   );
})->middleware('auth');

Route::get('/feedback', function(){
    return Inertia::render('AllFeedbackQuestionnaires');
})->middleware('auth');

Route::get('/questionnaire', function(){
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
        ->with(['participants' => function($query) {
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

Route::get('/invite2', function(){
    return Inertia::render('InviteForm2');
})->middleware('auth')->name('inviteform');

Route::get('/atividade', function() {
    return Inertia::render('Plan_activity');
})->middleware('auth')->name('atividade');

Route::get('/participantauth', function() {
    return Inertia::render('ParticipantAuth');
});

Route::get('/participant', function() {
    return Inertia::render('ParticipantLayout');
});

Route::get('/participantprofile', function() {
    return Inertia::render('ProfilePage');
});




Route::get('/partners', function () {
    return Inertia::render('Partners');
})->middleware('auth')->name('partners');

/*Route::get('/employeeform' , function(){
    return Inertia::render('EmployeeForm');
})->middleware('auth')->name('employeeform');

Route::get('/render_employeeform', [ItemController::class, 'index'])
    ->middleware('auth')->name('render_employeeform');*/

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
