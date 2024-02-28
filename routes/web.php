<?php

use App\Http\Controllers\TestController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Billabe;
use App\Http\Middleware\CheckAccessScopes;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });
Route::middleware(['verify.shopify', CheckAccessScopes::class, Billabe::class])->group(function() {
    Route::view('/', 'app')->name('home');
    // Route::post('/products', [ProductController::class, 'store']);
    // Route::get('/premium', [PremiumController::class, 'index']);
    // Route::post('/premium', [PremiumController::class, 'store']);
    // Route::delete('/premium', [PremiumController::class, 'destroy']);
});

Route::get('/index',[TestController::class,'index']);
