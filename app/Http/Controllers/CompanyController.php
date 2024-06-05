<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\License;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function create()
    {
// return view to create a new company
    }

    public function store(Request $request)
    {
// validate and store new company
    }

    public function purchaseLicense(Request $request, Company $company)
    {
// validate and store new license for a company
    }

    public function show(Company $company)
    {
// return view to show company profile
    }
}
