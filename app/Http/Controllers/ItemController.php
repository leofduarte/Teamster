<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Item;

class ItemController
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'items' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 400);
        }

        $validationResults = [];

        foreach ($request->items as $key => $value) {
            $validator2 = Validator::make($value, [
                'description' => [Rule::requiredIf($value['type'] != 'radio' && $value['type'] != 'checkbox'), 'nullable', 'string'],
                'label' => 'required|string',
                'options' => [Rule::requiredIf($value['type'] == 'radio'), 'nullable', 'array'],
                'placeholder' => [Rule::requiredIf($value['type'] != 'radio' && $value['type'] != 'checkbox'), 'nullable', 'string'],
                'tooltip' => [Rule::requiredIf($value['type'] != 'radio' && $value['type'] != 'checkbox'), 'nullable', 'string'],
                'type' => 'required|string',
                'value' => 'nullable', 'string', 'array',
            ]);

            $validationResults[] = $validator2->validated();
        }

        if ($validator->fails()) {
            print_r($validator->errors()->all());
            return Inertia::render('EmployeeForm', [
                'errors' => $validator->errors()->all(),
            ]);
        }

        foreach ($validationResults as $itemData) {
            $item = new Item();
            $item->description = isset($itemData['description']) ? $itemData['description'] : '';
            $item->label = $itemData['label'];

            if ($itemData['type'] === 'radio') {
                $options = isset($itemData['options']) ? $itemData['options'] : [];
                $optionsJson = json_encode($options);
                if ($optionsJson === false) {
                    error_log(json_last_error_msg());
                    $optionsJson = json_encode([]);
                }
                $item->options = $optionsJson;
            } else {
                $item->options = null;
            }

            $item->placeholder =  isset($itemData['placeholder']) ? $itemData['placeholder'] : '';
            $item->tooltip = isset($itemData['tooltip']) ? $itemData['tooltip'] : '';
            $item->type = $itemData['type'];

            // Handle checkbox value
            if ($itemData['type'] === 'checkbox') {
                $item->value = isset($itemData['value']) ? $itemData['value'] : '0';
            } else {
                $item->value = isset($itemData['value']) ? $itemData['value'] : ' ';
            }

            $item->save();
        }

        return response()->json([
            'message' => 'Items saved successfully',
        ]);
    }

    public function index(): \Inertia\Response
    {
        $items = Item::all();
        return Inertia::render('Render_EmployeeForm', [
            'items' => $items,
        ]);
    }

  /*  public function show($id):
    {
        $item = Item::findOrFail($id);

        return Inertia::render('Render_EmployeeForm', [
            'item' => $item,
        ]);
    }*/
}
