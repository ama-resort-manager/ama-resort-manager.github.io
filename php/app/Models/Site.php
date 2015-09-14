<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Site extends Model
{
    use SoftDeletes;

    protected $table = 'site';

    protected $fillable = [
    	'site_name', 'description', 'addtess', 'contact', 'status'
    ];

    public function users()
    {
    	return $this->belongsToMany('App\Models\User');
    }
}
