<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use App\Models\Item;
use Illuminate\Http\Request;

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
}
