<?php

use App\Http\Controllers\ApiChatController;
use App\Http\Controllers\ExtractEmailController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\PaymentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/v1/activity-planning', [ApiChatController::class, 'ChatActivityPlanning']);

Route::post('/v1/items', [ItemController::class, 'store']);


Route::post('/v1/validate-emails', [ExtractEmailController::class, 'validateEmails']);

Route::post('/v1/store-unique-emails', [ExtractEmailController::class, 'storeUniqueEmails']);

Route::post('/v1/invite', [InvitationController::class, 'sendInvitation']);

Route::post('/v1/create-payment-intent', [PaymentController::class, 'createPaymentIntent']);



