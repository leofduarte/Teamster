import React, { useState, useEffect } from 'react';
import notificacoes from '../../../../../Downloads/dashboard/my-dashboard-ines/src/data/notifications.json';
import { ScrollArea } from "../../../../../Downloads/dashboard/my-dashboard-ines/src/components/ui/scroll-area.jsx"

function Notifications() {
  const [formattedNotifications, setFormattedNotifications] = useState([]); // var de estado que armazena as notificacoes formatada corretamente
  const [notifications, setNotifications] = useState([]); // var de estado que armazena as notificacoes


  // Função para formatar o tempo decorrido
  const formatTimeAgo = (dateTime) => {
    const now = new Date();
    const notificationDate = new Date(dateTime); // Converter string para objeto Date
    const differenceInSeconds = Math.floor((now - notificationDate) / 1000);

    if (differenceInSeconds < 60) {
      return 'Agora';
    }

    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    if (differenceInMinutes < 60) {
      return `${differenceInMinutes} minuto${differenceInMinutes !== 1 ? 's' : ''}`;
    }

    const differenceInHours = Math.floor(differenceInMinutes / 60);
    if (differenceInHours < 24) {
      return `${differenceInHours} hora${differenceInHours !== 1 ? 's' : ''}`;
    }

    const differenceInDays = Math.floor(differenceInHours / 24);
    if (differenceInDays < 7) {
      return `${differenceInDays} dia${differenceInDays !== 1 ? 's' : ''}`;
    }

    const differenceInWeeks = Math.floor(differenceInDays / 7);
    return `${differenceInWeeks} semana${differenceInWeeks !== 1 ? 's' : ''}`;
  };

  // useEffect para formatar as notificações quando o componente é montado ou notificacoes mudam
  useEffect(() => {

    // fazer chamada à BD
    setNotifications(notificacoes); // Logica ficticia

    // formata a data das noticações
    const formatted = notificacoes.map((notificacao) => ({
      ...notificacao,
      formattedTimeAgo: formatTimeAgo(notificacao.dateTime)
    }));
    setFormattedNotifications(formatted);
  }, []);

  return (
    <div className="p-5 joyride-notifications">
      <div className="text-center mt-3 mb-4">
        <h2 className="font-manjari font-semibold text-2xl">NOTIFICAÇÕES</h2>
      </div>
      <div className="flex items-center justify-center">
        <ScrollArea className="h-72 w-72 rounded-md border overflow-y-auto">
          <div className="p-4">
            {formattedNotifications.map((notificacao) => (
              <div key={notificacao.id}>
                <div className="flex justify-between mb-3 mt-2">
                  <p className="text-sm">{notificacao.title}</p>
                  <p className="text-xs text-slate-400">{notificacao.formattedTimeAgo}</p>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

export default Notifications;
