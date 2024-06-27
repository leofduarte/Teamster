import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Simulação de chamada à base de dados
const fetchDepartments = () => {
  return [
    { id: 1, name: 'Marketing' },
    { id: 2, name: 'Engenharia' },
    { id: 3, name: 'Recursos Humanos' },
  ];
};

const fetchPositions = () => {
  return [
    { id: 1, name: 'Gerente' },
    { id: 2, name: 'Desenvolvedor' },
    { id: 3, name: 'Analista' },
  ];
};

const Information = ({ onNext, onPrev }) => {
  const [departments, setDepartments] = useState([]); // guarda os departamentos 
  const [positions, setPositions] = useState([]); // guarda as posições 
  const [name, setName] = useState(''); // guarda o nome do utilizador
  const [selectedDepartment, setSelectedDepartment] = useState(''); // guarda a seleção do departamento
  const [selectedPosition, setSelectedPosition] = useState(''); // guuarda a seleção do departamento


  useEffect(() => { // Simulação do carregamento inicial das opções de departamento e cargo
    // TEM SE DE FAZER CHAMADA À BD
    setDepartments(fetchDepartments());
    setPositions(fetchPositions());
  }, []);

  // Função para verificar se o formulário é válido
  const isFormValid = () => {
    return name.trim() !== '' && selectedDepartment !== '' && selectedPosition !== '';
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-8">Questionário de interesses</h2>
      <div className="p-8 w-full max-w-2xl">
        <div className="flex space-x-10 mb-20">
          <div className="flex-1">
            <label className="block text-sm">Nome</label>
            <Input
              type="text"
              className="mt-1 p-2 w-full border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm">Departamento</label>
            <Select onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um departamento" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((department) => (
                  <SelectItem key={department.id} value={department.name}>
                    {department.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label className="block text-sm">Cargo</label>
            <Select onValueChange={setSelectedPosition}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um cargo" />
              </SelectTrigger>
              <SelectContent>
                {positions.map((position) => (
                  <SelectItem key={position.id} value={position.name}>
                    {position.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-between">
          <Button variant="outline" className="px-6" onClick={onPrev}>
            Voltar
          </Button>
          <Button className="px-6" onClick={onNext} disabled={!isFormValid()}>
            Prosseguir
          </Button>
        </div>
      </div>
    </>
  );
};

export default Information;
