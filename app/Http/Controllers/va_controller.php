<?php

namespace App\Http\Controllers;

use GrahamCampbell\ResultType\Result;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class va_controller extends Controller
{
    public function saveNewVA(Request $request){


        if ($request->has('deviceId')){
            $deviceId = $request->input('deviceId');
            $description = $request->input('deviceDescription');
            $userId = $request->input('userId');

            $result = DB::SELECT("SELECT * FROM voice_assistant where userId = ? order by id desc limit 1", [($userId)]);
            if(count($result) == 0){
                DB::INSERT('INSERT into voice_assistant (deviceId, userId, `description` ) VALUES (?,?,?) ', [ $deviceId , $userId, $description,] );
                return response()->json(['message'=>'Data received'], 200);
            }elseif(count($result) >0){
                DB::UPDATE('UPDATE voice_assistant SET deviceId = ?,  `description`=? where userId= ? ', [$deviceId,$description,$userId] );
                return response()->json(['message'=>'Data updated'], 200);
            }

        }else {

            return response()->json(['message'=>'no data'], 400);
        }

    }
    public function getVA(Request $request){
        if ($request->has('userId')){
            $userId = $request->input('userId');
            $result = DB::SELECT("SELECT * FROM voice_assistant where userId = ? order by id desc limit 1", [($userId)]);
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
    public function getVaCommandValue(Request $request){
        if ($request->has('userId')){
            $userId = $request->input('userId');
            $deviceId = $request->input('deviceId');
            $result = DB::SELECT("SELECT value, deviceId FROM voice_assistant where deviceId = ? and userId =? order by id desc limit 1", [($deviceId),($userId)]);
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
    public function getVaCommandValue2(Request $request){
        if ($request->has('userId')){
            $userId = $request->input('userId');
            $result = DB::SELECT("SELECT value, deviceId FROM voice_assistant where userId =? order by id desc limit 1", [($userId)]);
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
    public function updateVAval(Request $request){
        if ($request->has('deviceId')){
            $deviceId = $request->input('deviceId');
            $value = $request->input('value');
            DB::UPDATE('UPDATE voice_assistant SET value = ? where deviceId= ? ', [$value, $deviceId] );

            $result = DB::SELECT("SELECT * FROM voice_commands where vaId = ? and command =? and active = 'Yes'  order by id desc limit 1", [($deviceId),($value)]);
            if(count($result) > 0){
                $data = array();
                foreach ($result as $row)
                {
                    array_push($data, $row);
                }
                $status = 0;
                $src = "";
                if($data[0]->status == "On"){
                    $status = 0;
                    $src="/pictures/on.png";
                }
                elseif($data[0]->status == "Off"){
                    $status = 1;
                    $src="/pictures/off.png";
                }
                DB::UPDATE('UPDATE devices SET `status` = ?, src=? where id= ? ', [$status,$src, $data[0]->deviceId ] );
            }
            return response()->json(['message'=>'Data updated'], 200);
        }else {

            return response()->json(['message'=>'no data'], 400);
        }

    }
}
