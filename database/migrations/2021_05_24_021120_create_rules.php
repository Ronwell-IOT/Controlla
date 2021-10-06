<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRules extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rules', function (Blueprint $table) {
            $table->bigIncrements('ruleId');
            $table->string('ruleDescription');
            $table->string('userId');
            $table->string('isActive');
            $table->string('deviceId');
            $table->integer('deviceStat')->default(0);
            $table->string('isMinMax')->nullable();
            $table->string('sensorId')->nullable();
            $table->integer('minVal')->nullable();
            $table->integer('maxVal')->nullable();
            $table->string('isTimer')->nullable();
            $table->time('from')->nullable();
            $table->time('to')->nullable();
            $table->timestamp('Date')->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rules');
    }
}
