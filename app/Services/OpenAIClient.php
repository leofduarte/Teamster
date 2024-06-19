<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
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
        $nome = $data['nome'];
        $objetivos = $data['objetivos'];
        $orcamento = $data['orcamento'];
        $localizacao = $data['localizacao'];
        $observacoes = $data['observacoes'];
        $dia = $data['dia'];
        $duracao = $data['duracao'];
        $numParticipantes = $data['numParticipantes'];

        $restrictions = [
            ['name' => "João", 'restriction' => "Intolerância à Lactose"],
            ['name' => "Maria", 'restriction' => "Alergia a frutos secos"],
            ['name' => "Pedro", 'restriction' => "Não sabe nadar muito bem"],
        ];

        $likes = [
            ['name' => "João", 'like' => "Jardinagem, natação, leitura"],
            ['name' => "Maria", 'like' => "Polo aquático, jogging, culinária"],
            ['name' => "Pedro", 'like' => "futebol, natação artística, música"],
        ];
        $allLikes = array_column($likes, 'like');

        $hobbies = [
            ['name' => "João", 'hobbie' => "crochet, escultura, desenho"],
            ['name' => "Maria", 'hobbie' => "sem hobbies"],
            ['name' => "Pedro", 'hobbie' => "pastelaria"],
        ];
        $allHobbies = array_column($hobbies, 'hobbie');
        $allRestrictions = array_column($restrictions, 'restriction');
        $objectivesString = implode(", ", $objetivos);

        $orcamentoString = implode(", ", $orcamento);

        $allRestrictionsString = implode(", ", $allRestrictions);
        $allLikesString = implode(", ", $allLikes);
        $allHobbiesString = implode(", ", $allHobbies);

        $content = "Planeia uma atividade de teambuilding com o objetivo de {$objectivesString} para {$numParticipantes} pessoas, na localização de {$localizacao}, Portugal no dia {$dia} com a duração máxima de {$duracao}.
                  Tenha em consideração o orçamento máximo definido para esta atividade de {$orcamentoString}€.
                  Leva em consideração que os interesses das pessoas envolvem \"" . $allLikesString . "\" e hobbies \"" . $allHobbiesString . "\".
                  Planeia a atividade tendo em conta apenas as características que a maioria das pessoas grupo tenha em comum de modo a proporcionar uma boa experiência personalizada.
                  De notar que conforme a dimensão do grupo a atividade vai atender mais ou menos a essas características, ou seja, o plano não pode envolver todos os gostos pessoais pois deste modo seria inconcebivel, mas sim tem de ir a encontro com o que está objetivado e o que a MAIORIA das pessoas tem em comum.
                  - As atividades não tem de levar em consideração todos os gostos, apenas aqueles que encontrares em comum ou que estejam de alguma forma relacionados .
                  - As atividades não tem de levar em consideração todos os hobbies, apenas aqueles que encontrares em comum ou que estejam de alguma forma relacionados.
                  - Todos os hobbies e gostos têm de fazer sentido como um todo (não vamos fazer uma jardinagem musical, por exemplo) e têm de ir em conta com os objetivos da atividade estipulados anteriormente.

                  No planeamento da atividade deves ter em atenção as restrições dos participantes: \"" . $allRestrictionsString . "\" este ponto é muito importante, deverás garantir que as restrições dos participantes não façam com que eles fiquem excluidos da atividade.
                  - Todas as atividades, sub-atividades, preparação da atividade, alimentação, pós-atividade, etc... devem levar em consideração as restrições dos participantes.

                  Por fim, tem também em conta as seguintes observações: {$observacoes}.

                  Aqui está o que deverás escrever em cada secção:

                  Descrição da atividade:
                    -   Uma descrição da atividade que deve ter uma explicação da ideia da mesma e da sua finalidade de forma detalhada.
                    -   Deverá também existir um ponto a referenciar o ponto de encontro da atividade e outro com uma duração estimada da atividade que nunca poderá exceder a duração estipulada anteriormente.

                  Atividades:
                    -   Guião exato e detalhado de todas as atividades que vão ocorrer e uma explicação detalhada e completa de cada uma das atividades e de como é que estas devem ser realizadas.
                        -  Qualquer jogo/ atividade / dinamica de grupo que apresentes deve ser devidamente explicada para que as pessoas a possam realizar sem ter de precisar de informação adicional.
                    -   No guião deverá estar também referenciada a alimentação durante o evento que deverá ter em conta as restrições alimentares dos participantes, este ponto é muito importante.

                  Horário:
                    Um Lista detalhada com o horario exato de todas as sub-atividades e, caso existam, momentos de almoço/ descanso, a realizar durante o teambuilding, esta lista deverá estar formatada da seguinte maneira -> (hora: atividade)

                  Tarefas:
                    Deverás fazer uma lista completa e detalhada de todas as tarefas que o organizador da atividade deverá cumprir para que a atividade de Teambuilding possa ser realizada especificando detalhadamente como é que o organizador pode realizar estas coisas.
                      Caso haja alimentação durante o evento deverás indicar os ingredientes a comprar e os preços em lojas na localidade selecionada.
                      Caso seja preciso preparar algo deverás explicar como se faz.
                      Caso seja preciso comprar / levar algo deverás explicar onde comprar na localidade selecionada e os preços em média.
                      Caso seja necessário alugar/ reservar um espaço para a atividade decorrer deverás dizer detalhadamente como é que o utilizador o pode fazer e os preços em média.

                  Informações:
                    Nesta categoria deverás fazer uma lista detalhada onde informas os participantes sobre o que é preciso levar/ prepararar para a atividade
                      Caso seja preciso preparar algo deverás explicar como se faz.
                      Caso seja preciso comprar / levar algo deverás explicar onde comprar na localidade selecionada
                      Caso existam participantes com restrições que precisem de informações adicionais deverás escreve-las aqui também detalhadamente.
                      Qualquer informação adicional para pessoas com restrições deve ser informada de maneira precisa, especificando caso seja necessário, onde comprar/ alugar e os preços em média.";

        try {
            Log::info("Req Body", ['body' => $data]);

            $response = OpenAI::chat()->create([
                'model' => 'gpt-4-turbo',
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => "A tua tarefa é criar uma atividade de team building personalizada e apresentar o resultado em Português Europeu.
                    Certifica-te de que a tua resposta seja clara, estruturada e leva em consideração todos os parâmetros fornecidos.
                    E atenção àquilo que sugeres, apresenta dados reais, que possam ser consultados e que sejam de confiança, como espaços para alugar, preços de atividades, websites (coloca o url, que seja real !!!), etc...

                    A resposta deverá ser apresentada EXATAMENTE na seguinte estrutura em JSON:
                    {
                        \"nome\": \" ...\"
                        \"descricao\": \" ...\",
                        \"atividades\": \"...\",
                        \"horario\": \" ...\",
                        \"tarefas_planeamento\": \" ...\",
                        \"tarefas_participante\": \" ...\"
                    }",
                    ],
                    [
                        'role' => 'user',
                        'content' => $content,
                    ],
                ],
                'max_tokens' => 4096,
            ]);

            $openaiResponse = $response->choices[0]->message->content;

            try {
                $jsonResponse = json_decode($openaiResponse, true);
                return response()->json($jsonResponse);
            } catch (\Exception $parseError) {
                Log::error("Erro ao parsear a resposta do OpenAI", ['error' => $parseError]);
                return response()->json(['error' => 'Erro ao processar a resposta do servidor.'], 500);
            }
        } catch (\Exception $error) {
            Log::error("Erro ao fazer a solicitação para o OpenAI", ['error' => $error]);
            return response()->json(['error' => 'Erro ao fazer a solicitação para o servidor.'], 500);
        }
    }


    public function generateCheckboxQuestion($data)
    {
        $response = OpenAI::chat()->create([
            'model' => 'gpt-4o',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => "Generate a label, tooltip, and a description text for a checkbox based on the following user input: {$data['askAPI']}.
            The label should be a short, descriptive text that tells the user what the checkbox is for.
            The tooltip should be a brief explanation of the checkbox's purpose.
            The description should provide more detailed information about the checkbox, such as what it does and why the user might want to use it.
            The label, tooltip, and description should be generated based on the text provided, without quotation marks, and in the following format:

            Label: [your label text]
            Tooltip: [your tooltip text]
            Description: [your description text]"
                ],
                [
                    'role' => 'user',
                    'content' => "{$data['askAPI']}"
                ]
            ],
            'max_tokens' => 4096,
        ]);

        $responseText = $response['choices'][0]['message']['content'];
        list($labelText, $tooltipText, $descriptionText) = explode("\n", $responseText);

        $label = trim(str_replace("Label: ", "", $labelText));
        $tooltip = trim(str_replace("Tooltip: ", "", $tooltipText));
        $description = trim(str_replace("Description: ", "", $descriptionText));


        return response()->json([
            'label' => $label,
            'tooltip' => $tooltip,
            'description' => $description,
        ]);
    }

    public function generateRadioQuestion($data)
    {
        $response = OpenAI::chat()->create([
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => "Generate a label and options for a radio input with 3 or 4 choices based on the following user input: {$data['askAPI']}.
            The label should be a short, descriptive text that tells the user what the radio input is for.
            The options should be appropriate for the context provided in the input, and there should be 3 or 4 options generated.
            The label and options should be generated based on the text provided, without quotation marks, and in the following format:

            Label: [your label text]
            Options:
            - [option 1]
            - [option 2]
            - [option 3]
            - [option 4 (if applicable)]"
                ],
                [
                    'role' => 'user',
                    'content' => "{$data['askAPI']}"
                ]
            ],
            'max_tokens' => 4096,
        ]);

        $responseText = $response['choices'][0]['message']['content'];
        $responseLines = explode("\n", $responseText);

        $label = trim(str_replace("Label: ", "", $responseLines[0]));
        $options = array_filter(array_map(function ($line) {
            return trim(str_replace("-", "", $line));
        }, array_slice($responseLines, 2)));

        return response()->json([
            'label' => $label,
            'options' => $options,
        ]);
    }

    public function generateTextQuestion($data)
    {
        $response = OpenAI::chat()->create([
            'model' => 'gpt-4o',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => "Generate a label, a placeholder, a tooltip, and a description text for a text input based on the following user input: {$data['askAPI']}.
            The label should be a short, descriptive text title that tells the user what the text input is for.
            The tooltip should be a brief explanation of the text input's purpose.
            The description should provide more detailed information about the text input, such as what it does and why the user might want to use it.
            The label, placeholder (if aplicable), tooltip (if aplicable), and description (if aplicable) should be generated based on the text provided, without quotation marks, and in the following format:

            Label: [your label text]
            Placeholder: [your placeholder text] (if applicable)
            Tooltip: [your tooltip text] (if applicable)
            Description: [your description text] (if applicable)"
                ],
                [
                    'role' => 'user',
                    'content' => "{$data['askAPI']}"
                ]
            ],
            'max_tokens' => 4096,
        ]);

        $responseText = $response['choices'][0]['message']['content'];
        list($labelText, $placeholderText, $tooltipText, $descriptionText) = explode("\n", $responseText);

        $label = trim(str_replace("Label: ", "", $labelText));
        $placeholder = trim(str_replace("Placeholder: ", "", $placeholderText));
        $tooltip = trim(str_replace("Tooltip: ", "", $tooltipText));
        $description = trim(str_replace("Description: ", "", $descriptionText));

        return response()->json([
            'label' => $label,
            'placeholder' => $placeholder,
            'tooltip' => $tooltip,
            'description' => $description,
        ]);
    }
}
