import React, { useEffect, useState } from 'react';
import Calendar from '../components_ines/Calendar.jsx';
import Notifications from '../components_ines/Notifications.jsx';
import Profile from '../components_ines/Profile.jsx';
import { Layout } from './Layout.jsx';
import DashboardContent from '../components_ines/DashboardContent.jsx';
import Joyride from 'react-joyride';

function DashboardPage() {
  const [runTutorial, setRunTutorial] = useState(false); // var de estado que faz ou não executar o tutorial

  useEffect(() => {
    // Verifica se o tutorial já foi visualizado
    // Guarda T ou F conformizado no Local Storage
    const isTutorialSeen = localStorage.getItem('tutorialSeen');
    if (!isTutorialSeen) {
      setRunTutorial(true);
    }
  }, []);

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = ['finished', 'skipped'];

    if (finishedStatuses.includes(status)) { // Se tutorial acabado ou skipado
      localStorage.setItem('tutorialSeen', 'true'); // > Marcado como visto
      setRunTutorial(false); // > Não executa o tutorial
    }
  };

  const steps = [
    {
      target: '.joyride-statistics',
      content: 'Aqui você vê as estatísticas da equipa.',
      placement: 'right',
    },
    {
      target: '.joyride-teams',
      content: 'Selecione a equipa que você deseja visualizar.',
      placement: 'top',
    },
    {
      target: '.joyride-profile',
      content: 'Pode editar o seu perfil aqui.',
      placement: 'left',
    },
    {
      target: '.joyride-calendar',
      content: 'Aqui pode visualizar o seu calendário de eventos.',
      placement: 'left',
    },
    {
      target: '.joyride-notifications',
      content: 'Receba as notificações aqui.',
      placement: 'left',
    },
  ];

  // Conteúdo lateral direito (Perfil, Calendário e Notificações)
  const sidebarContent = (
    <div className="flex-1 flex flex-col gap-5">
      <div className="joyride-profile">
        <Profile />
      </div>
      <div className="joyride-calendar">
        <Calendar />
      </div>
      <div className="joyride-notifications">
        <Notifications />
      </div>
    </div>
  );

  return (
    <Layout sidebar={sidebarContent}>
      <Joyride
        steps={steps}
        continuous={true}
        showSkipButton={true}
        showProgress={true}
        run={runTutorial}
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: '#f04',
            zIndex: 1000,
          },
        }}
      />
      <DashboardContent /> {/* Conteúdo central -> Estatísticas e Equipas */}
    </Layout>
  );
}

export default DashboardPage;
