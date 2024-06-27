import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import questionsData from '../data/mandatory.json';

const MandatoryQuestions = ({ onNext, onPrev, onComplete }) => {
  const questions = questionsData.questions; // var que guarda as questões do arquivo json -> FAZER AQUI CHAMDA À BD
  const [answers, setAnswers] = useState({}); // var de estado que armazena as respostas do utilizador

  // Função para atualizar as respostas do utilizador
  const handleChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  // Função para verificar se o formulário está válido
  const isFormValid = () => {
    // O formulário é válido se todas as perguntas forem respondidas e nenhuma resposta está vazia
    // ESTA PARTE PODE NÃO SER NECESSÁRIA DEPENDE DA LÓGICA DA TABELA DAS PERGUNTAS E RESPOSTAS NA BD
    return Object.keys(answers).length === questions.length && Object.values(answers).every(answer => answer !== '');
  };

  return (
    <div className="p-8 w-full max-w-2xl">
      <h2 className="text-3xl font-bold mb-8">Questionário de interesses</h2>
      {questions.map((question) => (
        <div className="mb-8 bg-white p-8 rounded-lg drop-shadow-md" key={question.id}>
          <label className="block text-lg mb-4 font-semibold">{question.question}</label>
          {question.options.length > 0 ? (
            <RadioGroup onValueChange={(value) => handleChange(question.id, value)}>
              {question.options.map((option, index) => (
                <label key={index} className="flex items-center mb-2">
                  <RadioGroupItem value={option} />
                  <span className="ml-2">{option}</span>
                </label>
              ))}
            </RadioGroup>
          ) : (
            <textarea
              className="w-full p-2 border rounded"
              onChange={(e) => handleChange(question.id, e.target.value)}
              rows="4"
            ></textarea>
          )}
        </div>
      ))}
      <div className="flex justify-between">
        <Button variant="outline" className="px-6" onClick={onPrev}>
          Voltar
        </Button>
        <div className="flex space-x-4">
          <Button className="px-6" onClick={onNext} disabled={!isFormValid()}>
            Continuar Questionário
          </Button>
          {isFormValid() ? (
              <Button className="px-6" onClick={onComplete}>
                Terminar
              </Button>
          ) : (
            <Button className="px-6" disabled>
              Terminar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MandatoryQuestions;
