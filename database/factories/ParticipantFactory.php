<?php

namespace Database\Factories;

use App\Models\Participant;
use Illuminate\Database\Eloquent\Factories\Factory;

class ParticipantFactory extends Factory
{
    protected $model = Participant::class;

    public function definition()
    {
        return [
            'email' => $this->faker->unique()->safeEmail,
            'name' => $this->faker->name,
            'phone' => $this->faker->phoneNumber,
            'restrictions' => json_encode($this->faker->randomElements(['gluten', 'lactose', 'nuts', 'none'], $this->faker->numberBetween(1, 3))),
            'passions' => json_encode($this->faker->randomElements(['reading', 'sports', 'coding', 'music', 'traveling'], $this->faker->numberBetween(1, 3))),
            'hobbies' => json_encode($this->faker->randomElements(['gaming', 'cooking', 'hiking', 'painting', 'dancing'], $this->faker->numberBetween(1, 3))),
        ];
    }
}
