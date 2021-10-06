<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSensors extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sensors', function (Blueprint $table) {
            $table->string('id');
            $table->string('deviceName');
            $table->integer('value');
            $table->integer('minval')->default('0');
            $table->integer('maxval')->default('100');
            $table->string('description');
            $table->string('userId');
            $table->string('areaId');
            $table->timestamp('Date')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sensors');
    }
}
