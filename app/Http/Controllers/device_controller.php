<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class device_controller extends Controller
{
    public function GetControlDevice(Request $request){
        if ($request->has('userId')){
            $userId = $request->input('userId');
            $result = DB::SELECT("SELECT id, deviceName, status, description, areaId, src FROM devices where userId = ?", [($userId)]);
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
    public function GetUnallocatedDev(Request $request){
        if ($request->has('userId')){
            $userId = $request->input('userId');
            $result = DB::SELECT("SELECT count(id) as unallocateddev FROM devices where userId = ? and areaId='none' ", [($userId)]);
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

        public function UnallocatedDev(Request $request){
        if ($request->has('userId')){
            $userId = $request->input('userId');
            $result = DB::SELECT("SELECT id, deviceName FROM devices where userId = ? and areaId='none' ", [($userId)]);
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

    public function GetDeviceStatus(Request $request){
        if ($request->has('id')){
            $id = $request->input('id');
            $result = DB::SELECT("SELECT status FROM devices where id = ?", [($id)]);
            $data = array();
                // return response()->json(['message'=>'Data received'], 200);
            foreach ($result as $row)
            {
                array_push($data, $row);
            }

            echo ($data[0]->status);
        }else {

            return response()->json(['message'=>'no data'], 400);
        }

    }

    public function GetControlDeviceNum(Request $request){
        if ($request->has('userId')){
            $userId = $request->input('userId');
            $result = DB::SELECT("SELECT COUNT(id) AS totalDevice FROM devices where userId = ?", [($userId)]);
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
    public function AddNewDevice(Request $request){
        if ($request->has('id')){
            $id = $request->input('id');
            $deviceName = $request->input('deviceName');
            $description = $request->input('description');
            $src= $request->input('src');
            $status = $request->input('status');
            $userId = $request->input('userId');
            $areaId = "none";
            DB::INSERT('INSERT into devices (id, deviceName, status, description, src, userId, areaId ) VALUES (?,?,?,?,?,?,?) ', [ $id ,$deviceName , $status, $description, $src, $userId, $areaId ] );

            return response()->json(['message'=>'Data received'], 200);
        }else {

            return response()->json(['message'=>'no data'], 400);
        }

    }

    public function UpdateDevice(Request $request){
        if ($request->has('id')){
            $id = $request->input('id');
            $deviceName = $request->input('deviceName');
            $description = $request->input('description');
            DB::UPDATE('UPDATE devices SET deviceName = ?, description =?  where id= ? ', [$deviceName , $description , $id] );

            return response()->json(['message'=>'Data received'], 200);
        }else {

            return response()->json(['message'=>'no data'], 400);
        }

    }
    public function UpdateDeviceStat(Request $request){
        if ($request->has('id')){
            $id = $request->input('id');
            $status = $request->input('status');
            $src = $request->input('src');
            DB::UPDATE('UPDATE devices SET status = ?, src =?  where id= ? ', [$status , $src , $id] );

            return response()->json(['message'=>'Data received'], 200);
        }else {

            return response()->json(['message'=>'no data'], 400);
        }

    }

    public function UpdateDeviceArea(Request $request){
        if ($request->has('id')){
            $id = $request->input('id');
            $areaId = $request->input('areaId');
            DB::UPDATE('UPDATE devices SET areaId = ?  where id= ? ', [$areaId  , $id] );

            return response()->json(['message'=>'Data received'], 200);
        }else {

            return response()->json(['message'=>'no data'], 400);
        }

    }
    public function DeleteDevice(Request $request){
        if ($request->has('id')){
            $id = $request->input('id');
            DB::DELETE('DELETE from devices where id= ? ', [$id] );

            return response()->json(['message'=>'Data received'], 200);
        }else {

            return response()->json(['message'=>'no data'], 400);
        }

    }


}
