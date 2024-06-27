import React, { useState, useEffect } from 'react';
import eventsData from '../data/events.json';

function Events() {
  const monthShortNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]; // Array com o diminutivo dos meses do ano
  const [events, setEvents] = useState([]); // guarda todos os eventos recebido da BD
  const [filteredEvents, setFilteredEvents] = useState([]); // guarda apenas os eventos futuros
  const [date, setDate] = useState(new Date()); 

  // Simulação de chamada à base de dados para obter eventos
  useEffect(() => {
    const fetchEvents = () => {
      // Simulando uma chamada fictícia à base de dados
      setEvents(eventsData);
    };

    fetchEvents();
  }, []);

  // Função para formatar a data
  const formatDate = (dateTime) => {
    const date = new Date(dateTime);
    const day = date.getDate();
    const month = monthShortNames[date.getMonth()];
    return `${day} ${month}`;
  };

  // Função para verificar se uma data é hoje
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  // Função para filtrar eventos do dia ou futuros
  const filterEvents = (events) => {
    const today = new Date();
    const futureEvents = events.filter(event => new Date(event.dateTime) >= today);
    setFilteredEvents(futureEvents);
  };

  // Filtrando eventos quando os eventos são atualizados
  useEffect(() => {
    filterEvents(events);
  }, [events]);

  return (
    <div className="bg-white drop-shadow-md rounded-lg text-center p-5 joyride-events">
      <h2 className="text-2xl font-bold mb-2 font-manjari">PRÓXIMOS EVENTOS</h2>
      <div>
        {filteredEvents.length === 0 ? (
          <p className="text-sm">Quando tiver um evento surgirá aqui</p>
        ) : (
          filteredEvents.map((event) => {
            const eventDate = new Date(event.dateTime);
            const isEventToday = isToday(eventDate);
            return (
              <div key={event.id}>
                <div className="flex justify-between mb-2 mt-2">
                  <p className={`text-lg  ${isEventToday ? 'font-semibold' : 'font-medium'}`}>
                    {formatDate(event.dateTime)}
                  </p>
                  <p className={`text-sm underline mt-1 ${isEventToday ? 'font-semibold' : ''}`}>
                    {event.title}
                  </p>
                </div>
                <hr />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Events;
