<?php

namespace App\Console\Commands;
use Illuminate\Support\Carbon;

use Illuminate\Console\Command;

class checkRuleSchedule extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'rules:checkSchedule';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check schedule in rules and update the device';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $hour = Carbon::now('GMT+8')->format('H');
        $min = Carbon::now('GMT+8')->format('i');
        $secs = Carbon::now('GMT+8')->format('s');
        echo $hour,":", $min,":", $secs;
    }
}
