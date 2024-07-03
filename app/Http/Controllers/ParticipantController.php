<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use App\Models\Item;
use App\Models\ParticipantAuth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ParticipantController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'participant_id' => 'required|exists:participants,id',
            'items' => 'required|array',
            'items.*.id' => 'required|exists:items,id',
            'items.*.response' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 400);
        }

        $participant = Participant::find($request->participant_id);

        if (!$participant) {
            return response()->json([
                'message' => 'Participant not found',
            ], 404);
        }

        foreach ($request->items as $itemData) {
            $item = Item::find($itemData['id']);

            if (!$item) {
                continue;
            }

            $participant->items()->attach($item->id, ['response' => $itemData['response']]);
        }

        return response()->json([
            'message' => 'Responses saved successfully',
        ]);
    }

    public function getParticipants()
    {
        $participants = Participant::with('items')->get();

        return response()->json([
            'participants' => $participants,
        ]);
    }

    public function ParticipantLayout()
{
    //checkar se está logado o participant
    //$participant = Participant::where('email', 'leandroduarte@ua.pt')->firstOrFail();
    //// Auth::guard('participants')->login($participant);
//    dd(auth()->guard('participants')->check());
     if(Auth::guard('participants')->check()) {
         $id = Auth::guard('participants')->user()->id;

         $participant = Participant::with(['teams.participants'])->find($id);

         if (!$participant) {
             return response()->json([
                 'message' => 'Participant not found',
             ], 404);
         }

         return Inertia::render('ParticipantLayout', [
             "message" => "Participant found successfully",
             'participant' => $participant,
         ]);

     }else{
         route('participant.login');
    }

}

    public function ProfilePage()
    {
        $id = 347;
        $participant = Participant::with(['teams.participants'])->find($id);

        if (!$participant) {
            return response()->json([
                'message' => 'Participant not found',
            ], 404);
        }

        return Inertia::render('ProfilePage', [
            "message" => "Participant found successfully",
            'participant' => $participant,
        ]);
    }

    public function getParticipantData($id)
    {
        $participant = Participant::with('teams')->find($id);

        return response()->json([
            'participant' => $participant,
        ]);
    }

    public function saveParticipantsInfo(Request $request, $id)
    {
        // Validate the request data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        // Retrieve the existing participant
        $participant = Participant::findOrFail($id);

        // Update the participant's name
        $participant->name = $validated['name'];
        $participant->save();

        // Return a response
        return response()->json([
            'message' => 'Participant name updated successfully',
            'participant' => $participant,
        ], 200);
    }

    public function saveTraits(Request $request, $id)
    {

        $validated = $request->validate([
            'passions' => 'required|string',
            'hobbies' => 'required|string',
        ]);

        $participant = Participant::findOrFail($id);

        $participant->passions = json_decode($validated['passions'], true);
        $participant->hobbies = json_decode($validated['hobbies'], true);

        \Log::info('Participant data before saving:', [
            'id' => $participant->id,
            'passions' => $participant->passions,
            'hobbies' => $participant->hobbies,
        ]);

        if($request->is_complete){
            $participant->quest = true;
        }

        $result = $participant->save();

        if ($result) {
            \Log::info('Participant data after saving:', [
                'id' => $participant->id,
                'passions' => $participant->fresh()->passions,
                'hobbies' => $participant->fresh()->hobbies,
            ]);

            if($request->is_complete){
                return response()->json([
                    'message' => 'Traits finished successfully!',
                    'participant' => $participant->fresh()
                ], 200);
            }

            return response()->json([
                'message' => 'Traits updated successfully!',
                'participant' => $participant->fresh()
            ], 200);
        } else {
            return response()->json([
                'message' => 'Failed to update traits',
                'errors' => $participant->getErrors()
            ], 422);
        }
    }

    public function saveRestrictions(Request $request, $id)
    {
        $validated = $request->validate([
            'restrictions' => 'required|string',
        ]);


        $participant = Participant::findOrFail($id);

        $participant->restrictions = json_decode($validated['restrictions'], true);

        \Log::info('Participant data before saving:', [
            'id' => $participant->id,
            'restrictions' => $participant->restrictions,
        ]);


        if($request->is_complete){
            $participant->quest = true;
        }

        $result = $participant->save();

        if ($result) {
            \Log::info('Participant data after saving:', [
                'id' => $participant->id,
                'restrictions' => $participant->fresh()->restrictions,
            ]);

            if($request->is_complete){
                return response()->json([
                    'message' => 'Restrictions finished successfully!',
                    'participant' => $participant->fresh()
                ], 200);
            }

            return response()->json([
                'message' => 'Restrictions updated successfully!',
                'participant' => $participant->fresh()
            ], 200);
        } else {
            return response()->json([
                'message' => 'Failed to update restrictions',
                'errors' => $participant->getErrors()
            ], 422);
        }

    }

    public function appendTraits(Request $request, $id)
    {
        $validated = $request->validate([
            'passions' => 'required|array',
            'hobbies' => 'required|array',
        ]);

        $participant = Participant::findOrFail($id);

        $currentPassions = $participant->passions ?? [];
        $currentHobbies = $participant->hobbies ?? [];

        $newPassions = array_unique(array_merge($currentPassions, $validated['passions']));
        $newHobbies = array_unique(array_merge($currentHobbies, $validated['hobbies']));

        $participant->passions = $newPassions;
        $participant->hobbies = $newHobbies;

        \Log::info('Participant data before saving:', [
            'id' => $participant->id,
            'passions' => $participant->passions,
            'hobbies' => $participant->hobbies,
        ]);

        $participant->quest = true;
        $result = $participant->save();

        if ($result) {
            \Log::info('Participant data after saving:', [
                'id' => $participant->id,
                'passions' => $participant->fresh()->passions,
                'hobbies' => $participant->fresh()->hobbies,
            ]);

            return response()->json([
                'message' => 'Traits appended successfully!',
                'participant' => $participant->fresh()
            ], 200);
        } else {
            return response()->json([
                'message' => 'Failed to append traits',
                'errors' => $participant->getErrors()
            ], 422);
        }
    }
}
