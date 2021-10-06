<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class logs_controller extends Controller
{
    public function GetLogs(Request $request){
        if ($request->has('userId')){
            $userId = $request->input('userId');
            $result = DB::SELECT("SELECT * FROM logs where userId = ? ORDER BY notifDate DESC limit 10", [($userId)]);
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
    public function InsertLog(Request $request){
        if ($request->has('userId')){
            $userId = $request->input('userId');
            $notifCode = $request->input('notifCode');
            $message = $request->input('message');

            DB::INSERT('INSERT into logs (notifCode,`message`,userId  ) VALUES (?,?,?) ', [ $notifCode, $message, $userId ] );

            //return response()->json(['message'=>'Data received'], 200);
        }else {

            //return response()->json(['message'=>'no data'], 400);
        }

    }

    public function ClearLogs(){

        DB::INSERT('TRUNCATE TABLE logs');

    }

}
