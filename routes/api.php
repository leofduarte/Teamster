<?php

use App\Http\Controllers\ApiChatController;
use App\Http\Controllers\ExtractEmailController;
use App\Http\Controllers\InvitationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/v1/activity-planning', [ApiChatController::class, 'ChatActivityPlanning']);

Route::post('/v1/validate-emails', [ExtractEmailController::class, 'validateEmails']);

Route::post('/v1/store-unique-emails', [ExtractEmailController::class, 'storeUniqueEmails']);

Route::post('/v1/invite', [InvitationController::class, 'sendInvitation']);
