<?php

use App\Http\Controllers\InvitationController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuestionAndResponseController;
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
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/about', function () {
    return Inertia::render('About', [
        'title' => 'About Us',
        'content' => 'This is the about page content.'
    ]);
})->name('about');

Route::get('/employeeform' , function(){
    return Inertia::render('EmployeeForm');
})->middleware('auth')->name('employeeform');

Route::get('/render_employeeform', [ItemController::class, 'index'])
    ->middleware('auth')->name('render_employeeform');

Route::get('/activityplanning', function(){
    return Inertia::render('ActivityPlanning');
})->middleware('auth')->name('activityplanning');

Route::get('/invite', function(){
    return Inertia::render('InviteForm');
})->middleware('auth')->name('inviteform');

Route::get('/questionnaire', function(){
    return Inertia::render('Questionnaire');
})->middleware('auth')->name('questionnaire');

Route::post('/send-invite', [InvitationController::class, 'sendInvite']);
Route::get('/invite/{token}', [InvitationController::class, 'showInvitationForm']);
Route::post('/invitations/respond', [InvitationController::class, 'respondToInvitation']);

Route::get('/teams', function () {
    return Inertia::render('SeeTeams');
})->middleware('auth')->name('teammembers');

Route::get('/addresponse', function () {
    return Inertia::render('AddResponse');
})->middleware('auth')->name('addresponse');

Route::get('/invite/{token}', [InvitationController::class, 'acceptInvitation']);

Route::get('/invite2', function(){
    return Inertia::render('InviteForm2');
})->middleware('auth')->name('inviteform');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
