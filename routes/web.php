<?php

use App\Http\Controllers\areas_controller;
use App\Http\Controllers\commands_controller;
use App\Http\Controllers\device_controller;
use App\Http\Controllers\logs_controller;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReactController;
use App\Http\Controllers\rules_controller;
use App\Http\Controllers\sensor_controller;
use App\Http\Controllers\user_controller;
use App\Http\Controllers\va_controller;
use Laravel\Ui\Presets\React;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/dashboard', function () {
    return view('adminpanel');
});
// Route::get('/{path?}', [ReactController:: class, 'show'], ['as' => 'react'], ['where ' => ['path' => '.*']]);


Route::get('/control', function () {
    return view('adminpanel');
});

Route::get('/configure', function () {
    return view('adminpanel');
});

Route::get('/addDevice', function () {
    return view('adminpanel');
});


Route::get('/myareas', function () {
    return view('adminpanel');
});

Route::get('/manageareas', function () {
    return view('adminpanel');
});

Route::get('/rules', function () {
    return view('adminpanel');
});
Route::get('/user', function () {
    return view('adminpanel');
});

Route::get('/dashboard', function () {
    return view('adminpanel');
});
Route::get('/voices', function () {
    return view('adminpanel');
});

Route::get('/', function () {
    return view('loginpage');
});

Route::get('/contact', function () {
    return view('loginpage');
});


Route::get('/GetDeviceStatus', [device_controller::class, 'GetDeviceStatus']);
Route::group(['middleware' => 'auth:sanctum'], function(){
    Route::get('/getVA', [va_controller::class, 'getVA']);
    Route::get('/getVaCommandValue', [va_controller::class, 'getVaCommandValue']);
    Route::get('/getVaCommandValue2', [va_controller::class, 'getVaCommandValue2']);
    Route::get('/getCommands', [commands_controller::class, 'getCommands']);


    Route::get('/GetControlDevice', [device_controller::class, 'GetControlDevice']);
    Route::get('/GetControlDeviceNum', [device_controller::class, 'GetControlDeviceNum']);

    Route::get('/GetUnallocatedDev', [device_controller::class, 'GetUnallocatedDev']);

    Route::get('/GetSensors', [sensor_controller::class, 'GetSensors']);
    Route::get('/GetSensorsNum', [sensor_controller::class, 'GetSensorsNum']);
    Route::get('/GetSensorsVal', [sensor_controller::class, 'GetSensorsVal']);
    Route::get('/GetUnallocatedSen', [sensor_controller::class, 'GetUnallocatedSen']);


    Route::get('/GetAreas', [areas_controller::class, 'GetAreas']);
    Route::get('/GetAreasNum', [areas_controller::class, 'GetAreasNum']);
    Route::get('/GetSensorPerArea', [areas_controller::class, 'GetSensorPerArea']);
    Route::get('/GetDevicePerArea', [areas_controller::class, 'GetDevicePerArea']);

    Route::get('/GetRules', [rules_controller::class, 'GetRules']);
    Route::get('/GetRulesNum', [rules_controller::class, 'GetRulesNum']);



    Route::get('/GetLogs', [logs_controller::class, 'GetLogs']);
    Route::get('/validationRoute', [user_controller::class, 'validationRoute']);


});

Route::get('/UnallocatedDev', [device_controller::class, 'UnallocatedDev']);
Route::get('/UnallocatedSen', [sensor_controller::class, 'UnallocatedSen']);
