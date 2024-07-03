<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\ApiChatController;
use App\Http\Controllers\ApiQuestionnaireController;
use App\Http\Controllers\Auth\ParticipantAuth\ParticipantAuthController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\ExtractEmailController;
use App\Http\Controllers\ExtractEquipasController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ParticipantController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PdfController;
use App\Http\Controllers\PlanActivityController;
use App\Http\Controllers\QuestionAndResponseController;
use App\Http\Controllers\QuestionnaireController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\PartnersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/v1/activity-planning', [ApiChatController::class, 'ChatActivityPlanning']);
Route::post('/v1/atividade-inicial', [ApiChatController::class, 'ChatActivityPlanning']);

Route::post('/v1/items', [ItemController::class, 'store']);

Route::post('/v1/invite', [InvitationController::class, 'sendInvitation']);

//Route::post('/v1/create-payment-intent', [PaymentController::class, 'createPaymentIntent']);

Route::post('/v1/addquestions', [QuestionAndResponseController::class, 'addQuestion']);
Route::post('/v1/add-update-questions', [QuestionAndResponseController::class, 'addUpdateQuestion']);
Route::post('/v1/getquestions', [QuestionAndResponseController::class, 'getQuestion']);
Route::post('/v1/addresponses', [QuestionAndResponseController::class, 'addResponse']);
Route::post('/v1/getAllResponses', [QuestionAndResponseController::class, 'getAllResponses']);
Route::post('/v1/getquestionnaires', [QuestionnaireController::class, 'getQuestionnaires']);
Route::post('/v1/addquestionnaire', [QuestionnaireController::class, 'addQuestionnaire']);

Route::post('/v1/teams-and-participants', [TeamController::class, 'getTeamsAndParticipants']);
Route::post('/v1/teams/{teamId}/addparticipants', [TeamController::class, 'addParticipantToTeam']);
Route::post('/v1/teams/{teamId}/addmultipleparticipants', [TeamController::class, 'addMultipleParticipantsToTeam']);
Route::delete('/v1/team/{teamId}/participant/{participantId}', [TeamController::class, 'removeParticipantFromTeam']);
Route::post('/v1/addteam', [TeamController::class, 'addToTeam']);
Route::post('/v1/teams/{teamId}/add-department', [TeamController::class, 'addDepartmentToTeam']);
Route::post('/v1/validate-emails', [TeamController::class, 'validateEmails']);
Route::post('/v1/store-unique-emails', [TeamController::class, 'storeUniqueEmails']);

Route::post('/v1/{user}/getdepartments', [DepartmentController::class, 'getDepartments']);
Route::post('/v1/{user}/adddepartment', [DepartmentController::class, 'addDepartment']);


Route::post('/v1/checkbox', [ApiQuestionnaireController::class, 'ApiCheckbox']);
Route::post('/v1/radio', [ApiQuestionnaireController::class, 'ApiRadio']);
Route::post('/v1/text', [ApiQuestionnaireController::class, 'ApiText']);

Route::post('/v1/savepartners', [PartnersController::class, 'SavePartners']);
Route::get('/v1/getpartners', [PartnersController::class, 'getPartners']);
Route::post('/v1/editpartners/{id}', [PartnersController::class, 'editPartners']);
Route::delete('/v1/deletepartners/{id}', [PartnersController::class, 'deletePartners']);

Route::post('/v1/equipas', [ExtractEquipasController::class, 'ExtractEquipas']);
Route::post('/v1/save-plan-activities', [PlanActivityController::class, 'SavePlanActivity']);
Route::post('/v1/saveactivity', [PlanActivityController::class, 'SaveActivity']);
Route::get('/v1/activities', [PlanActivityController::class, 'getActivities']);
Route::get('/v1/getPlanActivities', [PlanActivityController::class, 'getPlanActivities']);
Route::post('/v1/atividade/detalhes/{id}', [ActivityController::class, 'show']);

Route::post('v1/getparticipants', [ParticipantController::class, 'getParticipants']);
Route::post('/v1/getparticipantdata/{id}', [ParticipantController::class, 'getParticipantData']);
Route::post('v1/getParticipantsFromTeams', [TeamController::class, 'getParticipantsFromTeams']);
Route::post('/v1/saveParticipantsData/{id}', [ParticipantController::class, 'saveParticipantsData']);


Route::post('/v1/participantauth/login', [ParticipantAuthController::class, 'login']);
Route::post('/v1/participantauth/verify', [ParticipantAuthController::class, 'verifyCode']);

Route::post('/v1/saveParticipantsInfo/{id}', [ParticipantController::class, 'saveParticipantsInfo']);
Route::post('/v1/saveTraits/{id}', [ParticipantController::class, 'saveTraits']);
Route::post('/v1/saveRestrictions/{id}', [ParticipantController::class, 'saveRestrictions']);
Route::post('/v1/appendTraits/{id}', [ParticipantController::class, 'appendTraits']);
Route::post('/v1/getTeamsByParticipantId/{id}', [TeamController::class, 'getTeamsByParticipantId']);
