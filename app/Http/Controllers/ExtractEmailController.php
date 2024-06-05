<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExtractEmailController extends Controller
{
public function validateEmails(Request $request)
{
    $emails = $request->input('emails');
    $removeDuplicates = $request->input('removeDuplicates');

    $validator = Validator::make($emails, [
        '*.email' => 'required|email',
    ]);

    if ($validator->fails()) {
        return response()->json(['message' => "Invalid emails detected in your list."], 400);
    }

    $uniqueEmails = array_unique(array_column($emails, 'email'));
    if (count($uniqueEmails) < count($emails)) {
        if ($removeDuplicates) {
            $emails = array_intersect_key($emails, $uniqueEmails);

            return response()->json(['message' => 'Email validation successful. Duplicates removed.', 'emails' => array_values($emails)], 200);
        } else {
            return response()->json(['message' => "Duplicate emails detected in your list. No action taken."], 400);
        }
    }

    return response()->json(['message' => 'Email validation successful. No duplicates found.', 'emails' => $emails], 200);
}



    public function storeUniqueEmails(Request $request)
    {
        $emails = $request->input('emails');
        $newEmails = [];
        $existingEmails = [];

        $validator = Validator::make($emails, [
            '*.email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => "Invalid emails detected in your list."], 400);
        }

        foreach ($emails as $email) {
            $existingEmail = Participant::firstWhere('email', $email['email']);
            if (!$existingEmail) {
                Participant::create(['email' => $email['email']]);
                $newEmails[] = $email['email'];
            } else {
                $existingEmails[] = $email['email'];
            }
        }

        if (count($newEmails) === 0) {
            return response()->json(['message' => 'No new emails were added to the database.'], 400);
        }

        return response()->json([
            'message' => 'Emails processed successfully.',
            'newEmails' => $newEmails,
            'existingEmails' => $existingEmails
        ], 200);
    }

}
