<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class areas_controller extends Controller
{
    public function GetAreas(Request $request){
        if ($request->has('userId')){
            $userId = $request->input('userId');
            $result = DB::SELECT("SELECT areaId, areaName, areaDescription, areaUser FROM areas where areaUser = ?", [($userId)]);
            $data = array();
            // return response()->json(['message'=>'Data received'], 200);
            foreach ($result as $row)
            {
                array_push($data, $row);
            }

            echo json_encode($data);
        }else {

            return response()->json(['message'=>'no data'], 400);
        }

    }

    public function GetAreasNum(Request $request){
        if ($request->has('userId')){
            $userId = $request->input('userId');
            $result = DB::SELECT("SELECT COUNT(areaId) as totalAreas FROM areas where areaUser = ?", [($userId)]);
            $data = array();
            // return response()->json(['message'=>'Data received'], 200);
            foreach ($result as $row)
            {
                array_push($data, $row);
            }

            echo json_encode($data);
        }else {

            return response()->json(['message'=>'no data'], 400);
        }

    }
    public function AddNewArea(Request $request){
        if ($request->has('areaUser')){
            $areaUser = $request->input('areaUser');
            $areaName = $request->input('areaName');
            $areaDescription = $request->input('areaDescription');
            DB::INSERT('INSERT into areas (areaUser, areaName, areaDescription) VALUES (?,?,?) ', [ $areaUser, $areaName, $areaDescription] );

            return response()->json(['message'=>'Data received'], 200);
        }else {

            return response()->json(['message'=>'no data'], 400);
        }

    }

    public function DeleteArea(Request $request){
        if ($request->has('id')){
            $id = $request->input('id');
            DB::DELETE('DELETE from areas where areaId= ? ', [$id] );

            return response()->json(['message'=>'Data received'], 200);
        }else {

            return response()->json(['message'=>'no data'], 400);
        }

    }

    public function UpdateArea(Request $request){
        if ($request->has('areaId')){
            $areaId = $request->input('areaId');
            $areaName = $request->input('areaName');
            $areaDescription = $request->input('areaDescription');
            DB::UPDATE('UPDATE areas SET areaName = ?, areaDescription =? where areaId= ? ', [$areaName,$areaDescription,$areaId] );

            return response()->json(['message'=>'Data received'], 200);
        }else {

            return response()->json(['message'=>'no data'], 400);
        }

    }

    public function GetSensorPerArea(Request $request){
        if ($request->has('userId')){
            $userId = $request->input('userId');

            $result = DB::SELECT('SELECT count(sensors.id) as total, areas.areaName from sensors INNER JOIN areas on areas.areaId = sensors.areaId where areaUser = ? GROUP by areas.areaName',[($userId)]);

            $data = array();
            foreach ($result as $row)
            {
                array_push($data, $row);
            }

            // $result2 = DB::SELECT('SELECT DISTINCT areaName from areas where areaUser=?',[($userId)]);

            // $data2 = array();
            // foreach ($result2 as $row2)
            // {
            //     array_push($data2, $row2);
            // }

            // for($i = 0; $i < count($data2); $i++){
            //     for($x = 0; $x < count($data); $x++){
            //         if($data2[$i]->areaName != $data[$x]->areaName){

            //         }
            //     }
            // }
            echo json_encode($data);
            // echo json_encode($data2);
        }else {

            return response()->json(['message'=>'no data'], 400);
        }

    }
    public function GetDevicePerArea(Request $request){
        if ($request->has('userId')){
            $userId = $request->input('userId');

            $result = DB::SELECT('SELECT count(devices.id) as total, areas.areaName from devices INNER JOIN areas on areas.areaId = devices.areaId where areaUser = ? GROUP by areas.areaName',[($userId)]);

            $data = array();
            foreach ($result as $row)
            {
                array_push($data, $row);
            }
            echo json_encode($data);
        }else {

            return response()->json(['message'=>'no data'], 400);
        }

    }
}
