import React, { useState, useEffect } from 'react';
import events from '../data/events.json';
import { Calendar as UICalendar } from "../Components/ui/calendar.jsx";

function Calendar() {
  const [date, setDate] = useState(new Date()); // Estado que armazena a data atual
  const [filteredEvents, setFilteredEvents] = useState([]); // Estado para armazenar os eventos filtrados
  const [selectedEvent, setSelectedEvent] = useState(null); // Estado para armazenar o evento selecionado no calendário

  const monthShortNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]; // Array com os nomes abreviados dos meses

  // Função para formatar a data ("dia diminutivo-mês")
  const formatDate = (dateTime) => {
    const date = new Date(dateTime);
    const day = date.getDate();
    const month = monthShortNames[date.getMonth()];
    return `${day} ${month}`;
  };

  // filtrar os próximos eventos baseados na data selecionada
  // Fazer chamda à BD !!!
  useEffect(() => {
    const now = new Date();
    const filtered = events.filter(event => {
      const eventDate = new Date(event.dateTime);
      return eventDate >= now;
    });
    setFilteredEvents(filtered);
  }, [date]); // atualiza sempre que a data mudar

  // Função para lidar com a seleção de um dia no calendário
  const handleSelectDate = (selectedDate) => {
    setSelectedEvent(null); // Limpa o evento selecionado ao mudar de data
    const formattedSelectedDate = selectedDate.toDateString();
    const event = filteredEvents.find(event => new Date(event.dateTime).toDateString() === formattedSelectedDate);
    setSelectedEvent(event || null);
  };

  return (
    <div className="p-5 joyride-calendar">
      <div className="text-center mb-4">
        <h2 className="font-manjari font-semibold text-2xl">CALENDÁRIO</h2>
      </div>
      <div className="mb-4 flex justify-center">
        <UICalendar
          mode="single"
          selected={date}
          onSelect={setDate}
          onSelectDate={handleSelectDate}
          className="rounded-md border"
        />
      </div>
      <div className="mx-10">
        <h3 className="font-manjari mb-4 font-semibold text-xl">Próximos Eventos</h3>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => { // mapeia o array dos eventos
            const eventDate = new Date(event.dateTime); // guarda a data do evento
            const isEventSelected = selectedEvent && selectedEvent.id === event.id; // confirma se está selecionado
            const isHighlighted = eventDate.toDateString() === date.toDateString(); // realçe conforme a coincidência das datas

            return (
              <div key={event.id} className={`flex justify-between mb-3 mt-2 ${isEventSelected ? 'font-semibold text-lg' : ''}`}>
                <p className={isHighlighted ? 'font-semibold text-lg' : ''}>{formatDate(event.dateTime)}</p>
                <p className={`underline ${isHighlighted ? 'font-bold' : 'text-sm '}`}>{event.title}</p>
              </div>
            );
          })
        ) : (
          <p>Nenhum evento futuro encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default Calendar;
