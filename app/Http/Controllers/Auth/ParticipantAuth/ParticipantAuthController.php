<?php

namespace App\Http\Controllers\Auth\ParticipantAuth;

use App\Models\ParticipantAuth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\Controller;

class ParticipantAuthController extends Controller
{
    public function login(Request $request)
    {
        $email = $request->input('email');
        $code = rand(100000, 999999);

        ParticipantAuth::create([
            'email' => $email,
            'code' => $code,
            'created_at' => Carbon::now(),
        ]);

        Mail::send('emails.participantcode', ['code' => $code], function ($message) use ($email) {
            $message->to($email)->subject('ParticipantAuth Code');
        });

        return response()->json(['message' => 'Code sent to email']);
    }

    public function verifyCode(Request $request)
    {
        $email = $request->input('email');
        $code = $request->input('code');

        $record = ParticipantAuth::where('email', $email)
            ->where('code', $code)
            ->where('created_at', '>', Carbon::now()->subMinutes(10))
            ->first();

        if ($record) {
            $participant = Auth::guard('participants')->getProvider()->retrieveByCredentials(['email' => $email]);



            //ParticipantAuth::where('email', $email)->delete();


            //$request->session()->put('participant_email', $email);
            Auth::guard('participants')->login($participant);

            dd(Auth::guard('participants')->user());
            return response()->json(['message' => 'ParticipantAuth successful']);
        } else {
            return response()->json(['message' => 'Invalid or expired code'], 400);
        }
    }
}
