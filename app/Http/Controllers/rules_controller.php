<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class rules_controller extends Controller
{
    public function GetRules(Request $request){
        if ($request->has('userId')){
            $userId = $request->input('userId');
            $result = DB::SELECT("SELECT * FROM rules where userId = ?", [($userId)]);
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
    public function GetRulesNum(Request $request){
        if ($request->has('userId')){
            $userId = $request->input('userId');
            $result = DB::SELECT("SELECT COUNT(ruleId) as totalRules FROM rules where userId = ? AND isActive = 'yes' ", [($userId)]);
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
    public function AddNewRules(Request $request){
        if ($request->has('userId')){
            $userId = $request->input('userId');
            $ruleDescription = $request->input('ruleDescription');
            $isActive = $request->input('isActive');
            $deviceId = $request->input('deviceId');
            $deviceStat = $request->input('deviceStat');
            $isMinMax = $request->input('isMinMax');
            $sensorId = $request->input('sensorId');
            $minVal = $request->input('minVal');
            $maxVal = $request->input('maxVal');
            $isTimer = $request->input('isTimer');
            $from = $request->input('from');
            $to = $request->input('to');

            DB::INSERT('INSERT into rules (userId,ruleDescription, isActive, deviceId,deviceStat, isMinMax, sensorId, minVal, maxVal, isTimer, `from`, `to` ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?) ', [ $userId ,$ruleDescription, $isActive, $deviceId,$deviceStat, $isMinMax, $sensorId, $minVal, $maxVal, $isTimer, $from, $to ] );

            //return response()->json(['message'=>'Data received'], 200);
        }else {

            //return response()->json(['message'=>'no data'], 400);
        }

    }

    public function DeleteRule(Request $request){
        if ($request->has('ruleId')){
            $ruleId  = $request->input('ruleId');
            DB::DELETE('DELETE from rules where ruleId = ? ', [$ruleId ] );

            return response()->json(['message'=>'Data received'], 200);
        }else {

            return response()->json(['message'=>'no data'], 400);
        }

    }

    public function UpdateRule(Request $request){
        if ($request->has('ruleId')){
            $ruleId = $request->input('ruleId');
            $isActive = $request->input('isActive');
            $deviceId = $request->input('deviceId');
            $deviceStat = $request->input('deviceStat');
            $ruleDescription = $request->input('ruleDescription');
            $isMinMax = $request->input('isMinMax');
            $sensorId = $request->input('sensorId');
            $minVal = $request->input('minVal');
            $maxVal = $request->input('maxVal');
            $isTimer = $request->input('isTimer');
            $from = $request->input('from');
            $to = $request->input('to');
            DB::UPDATE('UPDATE rules SET ruleDescription=?, isActive=?, deviceId=?,deviceStat=?, isMinMax=?, sensorId=?, minVal=?, maxVal=?, isTimer=?, `from`=?, `to`=? where ruleId= ? ', [$ruleDescription, $isActive, $deviceId, $deviceStat ,$isMinMax,$sensorId ,$minVal , $maxVal,$isTimer ,$from ,$to , $ruleId] );

            return response()->json(['message'=>'Data received'], 200);
        }else {

            return response()->json(['message'=>'no data'], 400);
        }

    }
}
