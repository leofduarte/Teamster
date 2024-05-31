import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';

const app = express();
app.use(cors());
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: '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',
});

app.post('/api-v1/activity-planning', async (req, res) => {
  const { objetivo, tipologia, numparticipantes, duracao, orcamento, hobbies, likes, cidade, idades, restricoes } = req.body;
  console.log(req.body);

  const content = `Planeie uma atividade de teambuilding com o objetivo de ${objetivo} para um(a) ${tipologia} de trabalho composto(a) por ${numparticipantes} pessoas com as seguintes idades: "${(idades || []).join(', ')}", na localização de ${cidade} com a duração de ${duracao}. Leva em consideração que os interesses das pessoas envolvem "${(likes || []).join(', ')}" e hobbies "${(hobbies || []).join(', ')}". No planeamento da atividade deve ter em atenção as restrições dos participantes: "${(restricoes || []).join(', ')}". Igualmente, tem em consideração o orçamento máximo definido para esta atividade é de ${orcamento}€ por pessoa.

  Apresenta-me a tua resposta em duas partes: uma parte para a logística dos organizadores e outra para o planeamento dos participantes.
  A estrutura da logística dos organizadores deve incluir:
  1. Antes da atividade (logística detalhada para a atividade estar preparada e divulgada);
  2. Durante a atividade  (pontos de plano de atividades e tarefas e sub explicação das mesmas com duração horária de cada ponto);
  3. Após-atividade;
  4. Considerações adicionais.
  A estrutura do plano dos participantes deve incluir:
  1. Título da atividade;
  2. Objetivo da atividade; 
  3 Número de participantes;
  4. Duração
  5. Ponto de encontro;
  6. Preço (estimativa); 
  7. Alimentação durante o evento (ementa);
  8. Detalhes da atividade (pontos de plano de atividades e sub explicação das mesmas com duração horária de cada ponto);
  9. Considerações adicionais (equipamento necessário, material para alugar/ reservar, e qualquer outra informação relevante para garantir uma experiência bem-sucedida).`

  console.log(content);

  try {
    const msg = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1024,
      messages: [{ role: "user" , content: content }]
  });
    console.log(msg);
    res.json(msg);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//! GPT4
// import OpenAI from 'openai';
// const openai = new OpenAI({ apiKey: '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' });
// const content = "Planeia uma atividade de team building para 5 pessoas, com interesse em musica, fotografia e atividades ao ar livre, em Aveiro"
// async function main() {
//     try {
//         const stream = await openai.chat.completions.create({
//             model: "gpt-4-0125-preview",
//             messages: [{ role: "user", content: {content}}],
//             stream: true,
//         });
//         for await (const chunk of stream) {
//             process.stdout.write(chunk.choices[0]?.delta?.content || "");
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }
// main();

//! DALL-E
// import OpenAI from "openai";
// const openai = new OpenAI({ apiKey: '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' });
// async function main() {
//   const image = await openai.images.generate({ model: "dall-e-3", prompt: "A cute baby sea otter" });
//   console.log(image.data);
//}
// main();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});