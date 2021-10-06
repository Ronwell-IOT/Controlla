<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class commands_controller extends Controller
{
    public function saveCommand(Request $request){


        if ($request->has('vaId')){
            $vaId = $request->input('vaId');
            $deviceId = $request->input('deviceId');
            $userId = $request->input('userId');
            $status = $request->input('status');
            $active = $request->input('active');
            $command = strtolower($request->input('command'));

            $result = DB::SELECT("SELECT * FROM voice_commands where command =? and `vaId`=? and userId= ? order by id desc limit 1", [($command),($vaId),($userId)]);
            if(count($result) == 0){
                DB::INSERT('INSERT into voice_commands (deviceId, userId, `vaId`, `status`, active, command ) VALUES (?,?,?,?,?,?) ', [ $deviceId , $userId, $vaId, $status, $active, $command ] );
                return response()->json(['message'=>'Data received'], 200);
            }elseif(count($result) >0){
                DB::UPDATE('UPDATE voice_commands SET deviceId = ? `status`=? , command=?, active=? , where `vaId`=? and userId= ? ', [$deviceId ,$status, $active, $command ,$vaId,$userId] );
                return response()->json(['message'=>'Data updated'], 200);
            }

        }else {

            return response()->json(['message'=>'no data'], 400);
        }

    }
    public function getCommands(Request $request){
        if ($request->has('userId')){
            $userId = $request->input('userId');
            $vaId = $request->input('vaId');
            $result = DB::SELECT("SELECT voice_commands.command,voice_commands.id, devices.deviceName, voice_commands.status, voice_commands.active from voice_commands INNER JOIN devices on devices.id = voice_commands.deviceId where voice_commands.userId = ? and voice_commands.vaId=?", [($userId),($vaId)]);
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
    public function deleteCommand(Request $request){
        if ($request->has('userId')){
            $id = $request->input('id');
            $userId = $request->input('userId');
            $vaId = $request->input('vaId');
            DB::delete("delete from voice_commands where id = ? and userId =? and vaid = ?", [($id),($userId),($vaId)]);
            return response()->json(['message'=>'deleted'], 200);
        }else {

            return response()->json(['message'=>'no data'], 400);
        }

    }
    public function updateActiveCommand(Request $request){
        if ($request->has('userId')){
            $id = $request->input('id');
            $userId = $request->input('userId');
            $vaId = $request->input('vaId');
            $active = $request->input('active');
            DB::UPDATE('UPDATE voice_commands SET active=? where id = ? and `vaId`=? and userId= ? ', [$active,$id,$vaId,$userId] );
            return response()->json(['message'=>'Data updated'], 200);
        }else {

            return response()->json(['message'=>'no data'], 400);
        }

    }
}
