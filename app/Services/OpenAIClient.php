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

        $objetivosString = implode(", ", $data['objetivos']);
        $orcamentoString = implode(", ", $data['orcamento']);

        $response = OpenAI::chat()->create([
            'model' => 'gpt-4o',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => "Planeie uma atividade de teambuilding com o objetivo de {$objetivosString}, para {$data['numParticipantes']} pessoas e na localização de {$data['localizacao']}.
                      A atividade será realizada na seguinte data {$data['dia']} .
                      Igualmente, tenha em consideração o orçamento máximo definido para esta atividade de {$orcamentoString}€.
                      Têm em conta as seguintes observações: \"{$data['observacoes']}\".
                      Deverás planear a atividade tendo em conta a Lista de alergias/intolerâncias e incapacidades dos participantes, caso existam, este ponto é muito importante.
                      Apresenta-me a tua resposta em duas partes: uma com o título \"Logística para os organizadores\" e outra com o título \"Informações para os participantes\".
                      A estrutura da resposta retornada da logística dos organizadores deve ter exatamente este formato:
                      1. Nome da Atividade:
                      2. Objetivo da atividade;
                      3. Preço (estimativa);
                      4. Antes da atividade:
                        - Definir um ponto de encontro
                        - Lista de tarefas detalhadas de logística (equipamento necessário, material para alugar/ reservar, e qualquer outra informação relevante para garantir uma experiência bem-sucedida)
                        - Lista de atividades que vão ser realizadas bem como a sua devida explicação
                      5. Durante a atividade:
                        - Lista das diferentes tarefas com as suas explicações DETALHADAS e com duração horária de cada uma

                      6. Após-atividade:
                      A estrutura  da resposta retornada do plano dos participantes deve ter exatamente este formato:
                      1.Título da atividade;
                      2. Mini-descrição (1 paragrafo do que consiste a atividade)
                      3. Número de participantes;
                      4. Duração
                      5. Ponto de encontro;
                      6. Alimentação durante o evento (ementa);"
                ],
                [
                    'role' => 'user',
                    'content' => 'Apresenta-me a tua resposta em duas partes: uma parte para a logística dos organizadores e outra para o planeamento dos participantes.'
                ]
            ],
            'max_tokens' => 4096,
        ]);

        return $response -> choices[0]->message->content;
    }

    public function generateCheckboxQuestion($data)
    {
        $response = OpenAI::chat()->create([
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => "Generate a label, tooltip, and description for a checkbox based on the following user input: {$data['askAPI']}"
                ],
                [
                    'role' => 'user',
                    'content' => 'Generate the text'
                ]
            ],
            'max_tokens' => 4096,
        ]);

        $content = $response->choices[0]->message->content;

        // Print the content to the console for debugging
        error_log($content);

        return response()->json([
            'label' => $matches[1] ?? '',
            'tooltip' => $matches[2] ?? '',
            'description' => $matches[3] ?? '',
        ]);
    }
}
