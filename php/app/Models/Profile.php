<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Profile extends Model
{
	use SoftDeletes;

	protected $table = 'profiles';

	protected $fillable = [
		'user_id', 'first_name', 'last_name', 'gender', 'birth_date'
	];

	public function auth()
	{
		return $this->belongsTo('App\Models\User');
	}
}
