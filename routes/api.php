<?php

use App\Http\Controllers\areas_controller;
use App\Http\Controllers\commands_controller;
use App\Http\Controllers\device_controller;
use App\Http\Controllers\logs_controller;
use App\Http\Controllers\rules_controller;
use App\Http\Controllers\sensor_controller;
use App\Http\Controllers\user_controller;
use App\Http\Controllers\va_controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/UserRegister', [user_controller::class, 'UserRegister']);
Route::post('/UserLogin', [user_controller::class, 'UserLogin']);
Route::post('/logout', [user_controller::class, 'logout']);
Route::post('/UserChangePassword', [user_controller::class, 'UserChangePassword']);
Route::post('/GetUserProfilePic', [user_controller::class, 'GetUserProfilePic']);

Route::post('/AddNewDevice', [device_controller::class, 'AddNewDevice']);
Route::post('/UpdateDevice', [device_controller::class, 'UpdateDevice']);
Route::post('/UpdateDeviceStat', [device_controller::class, 'UpdateDeviceStat']);
Route::post('/UpdateDeviceArea', [device_controller::class, 'UpdateDeviceArea']);
Route::post('/DeleteDevice', [device_controller::class, 'DeleteDevice']);


Route::post('/AddNewSensor', [sensor_controller::class, 'AddNewSensor']);
Route::post('/UpdateSensor', [sensor_controller::class, 'UpdateSensor']);
Route::post('/DeleteSensor', [sensor_controller::class, 'DeleteSensor']);
Route::post('/UpdateSensorArea', [sensor_controller::class, 'UpdateSensorArea']);
Route::post('/UpdateSensorValue', [sensor_controller::class, 'UpdateSensorValue']);
Route::post('/AddAveVal', [sensor_controller::class, 'AddAveVal']);

Route::post('/AddNewArea', [areas_controller::class, 'AddNewArea']);
Route::post('/DeleteArea', [areas_controller::class, 'DeleteArea']);
Route::post('/UpdateArea', [areas_controller::class, 'UpdateArea']);


Route::post('/AddNewRules', [rules_controller::class, 'AddNewRules']);
Route::post('/DeleteRule', [rules_controller::class, 'DeleteRule']);
Route::post('/UpdateRule', [rules_controller::class, 'UpdateRule']);

Route::post('/InsertLog', [logs_controller::class, 'InsertLog']);
Route::post('/ClearLogs', [logs_controller::class, 'ClearLogs']);


Route::post('/saveNewVA', [va_controller::class, 'saveNewVA']);
Route::post('/saveCommand', [commands_controller::class, 'saveCommand']);
Route::post('/deleteCommand', [commands_controller::class, 'deleteCommand']);
Route::post('/updateActiveCommand', [commands_controller::class, 'updateActiveCommand']);
Route::post('/updateVAval', [va_controller::class, 'updateVAval']);
