<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Models\Site;
use Illuminate\Http\Request;

class CreateSiteController extends Controller
{
    public function checkSiteName(Request $request)
    {
        $sites = Site::where('site_name', $request->siteName)
    }
}
