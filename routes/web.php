<?php

use App\Http\Controllers\ItemController;
use App\Http\Controllers\ExtractEmailController;
use App\Http\Controllers\ProfileController;
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

Route::get('/extractemails', function(){
    return Inertia::render('ExtractEmails');
})->middleware('auth')->name('extractemails');

Route::get('/invite', function(){
    return Inertia::render('InviteForm');
})->middleware('auth')->name('inviteform');

Route::get('/payment', function(){
    return Inertia::render('PaymentForm');
})->middleware('auth')->name('payment');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
