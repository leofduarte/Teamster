<?php

namespace App\Services;

use OpenAI\Laravel\Facades\OpenAI;

class OpenAIClient
{
    private $client;

    public function __construct()
    {
        $this->client = new OpenAI(env('OPENAI_API_KEY'));
    }

    public function generateText($data)
    {
        $response = OpenAI::chat()->create([
        'model' => 'gpt-3.5-turbo',
        'messages' => [
            [
                'role' => 'system',
                'content' => "Planeie uma atividade de teambuilding com o objetivo de {$data['objetivo']} para um(a) {$data['tipologia']} de trabalho composto(a) por {$data['numparticipantes']} pessoas com as seguintes idades: ".implode(', ', $data['idades']).", na localização de {$data['cidade']} com a duração de {$data['duracao']}. Leva em consideração que os interesses das pessoas envolvem ".implode(', ', $data['likes'])." e hobbies ".implode(', ', $data['hobbies']).". No planeamento da atividade deve ter em atenção as restrições dos participantes: ".implode(', ', $data['restricoes']).". Igualmente, tem em consideração o orçamento máximo definido para esta atividade é de {$data['orcamento']}€ por pessoa."
            ],
            [
                'role' => 'user',
                'content' => 'Apresenta-me a tua resposta em duas partes: uma parte para a logística dos organizadores e outra para o planeamento dos participantes.'
            ]
        ],
            'max_tokens' => 64
        ]);

return $response -> choices[0]->message->content;
    }
}
