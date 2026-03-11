<?php

use App\Http\Controllers\Admin\AdminMassScheduleController;
use App\Http\Controllers\Admin\AdminParishController;
use App\Http\Controllers\Auth\EmailVerificationController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\MeController;
use App\Http\Controllers\Auth\RegisterParishController;
use App\Http\Controllers\Parish\MassScheduleController;
use App\Http\Controllers\Parish\ParishProfileController;
use App\Http\Controllers\Public\ParishPublicController;
use Illuminate\Support\Facades\Route;

// Public
Route::prefix('public')->group(function () {
    Route::get('parishes', [ParishPublicController::class, 'index']);
    Route::get('parishes/{parish}', [ParishPublicController::class, 'show']);
});

// Auth
Route::prefix('auth')->group(function () {
    Route::post('register-parish', [RegisterParishController::class, 'store']);
    Route::post('login', [LoginController::class, 'store']);

    Route::get('verify-email/{id}/{hash}', EmailVerificationController::class)
        ->middleware('signed')
        ->name('verification.verify');

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', LogoutController::class);
        Route::get('me', MeController::class);
    });
});

// Parish (auth + role parish)
Route::prefix('parish')->middleware(['auth:sanctum', 'role.parish'])->group(function () {
    Route::get('profile', [ParishProfileController::class, 'show']);
    Route::put('profile', [ParishProfileController::class, 'update']);
    Route::get('mass-schedules', [MassScheduleController::class, 'index']);
    Route::post('mass-schedules', [MassScheduleController::class, 'store']);
    Route::put('mass-schedules/{massSchedule}', [MassScheduleController::class, 'update']);
    Route::delete('mass-schedules/{massSchedule}', [MassScheduleController::class, 'destroy']);
});

// Admin (auth + role admin)
Route::prefix('admin')->middleware(['auth:sanctum', 'role.admin'])->group(function () {
    Route::get('parishes', [AdminParishController::class, 'index']);
    Route::get('parishes/{parish}', [AdminParishController::class, 'show']);
    Route::patch('parishes/{parish}/approve', [AdminParishController::class, 'approve']);
    Route::patch('parishes/{parish}/reject', [AdminParishController::class, 'reject']);
    Route::put('parishes/{parish}', [AdminParishController::class, 'update']);
    Route::delete('parishes/{parish}', [AdminParishController::class, 'destroy']);

    Route::get('parishes/{parish}/mass-schedules', [AdminMassScheduleController::class, 'index']);
    Route::post('parishes/{parish}/mass-schedules', [AdminMassScheduleController::class, 'store']);
    Route::put('mass-schedules/{massSchedule}', [AdminMassScheduleController::class, 'update']);
    Route::delete('mass-schedules/{massSchedule}', [AdminMassScheduleController::class, 'destroy']);
});
