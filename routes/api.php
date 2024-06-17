<?php

use App\Http\Controllers\ApiChatController;
use App\Http\Controllers\ApiQuestionnaireController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\ExtractEmailController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\QuestionAndResponseController;
use App\Http\Controllers\TeamController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/v1/activity-planning', [ApiChatController::class, 'ChatActivityPlanning']);

Route::post('/v1/items', [ItemController::class, 'store']);

Route::post('/v1/invite', [InvitationController::class, 'sendInvitation']);

Route::post('/v1/create-payment-intent', [PaymentController::class, 'createPaymentIntent']);

Route::post('/v1/addquestions', [QuestionAndResponseController::class, 'addQuestion']);

Route::post('/v1/getquestions', [QuestionAndResponseController::class, 'getQuestion']);

Route::post('/v1/addresponses', [QuestionAndResponseController::class, 'addResponse']);

Route::post('/v1/teams-and-participants', [TeamController::class, 'getTeamsAndParticipants']);

Route::post('/v1/teams/{teamId}/addparticipants', [TeamController::class, 'addParticipantToTeam']);

Route::post('/v1/teams/{teamId}/addmultipleparticipants', [TeamController::class, 'addMultipleParticipantsToTeam']);

Route::post('/v1/addteam', [TeamController::class, 'addToTeam']);

Route::post('/v1/validate-emails', [TeamController::class, 'validateEmails']);

Route::post('/v1/store-unique-emails', [TeamController::class, 'storeUniqueEmails']);

Route::post('/v1/getDepartments', [DepartmentController::class, 'getDepartments']);

Route::post('/v1/checkbox', [ApiQuestionnaireController::class, 'ApiCheckbox']);


