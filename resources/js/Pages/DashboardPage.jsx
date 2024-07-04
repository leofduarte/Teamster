import React, { useEffect, useState } from "react";
import Calendar from "../components_ines/Calendar.jsx";
import Profile from "../components_ines/Profile.jsx";
import { Layout } from "./Layout.jsx";
import DashboardContent from "../components_ines/DashboardContent.jsx";
import Joyride from "react-joyride";

function DashboardPage(props) {
    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const teams = props.teams;

    const handleTeamSelect = (teamId) => {
        setSelectedTeamId(teamId);
    };

    //? Lógica do Tutorial
    const [runTutorial, setRunTutorial] = useState(false);
    useEffect(() => {
        const isTutorialSeen = localStorage.getItem("tutorialSeen");
        if (!isTutorialSeen) {
            setRunTutorial(true);
        }
    }, []);

    const handleJoyrideCallback = (data) => {
        const { status } = data;
        const finishedStatuses = ["finished", "skipped"];

        if (finishedStatuses.includes(status)) {
            localStorage.setItem("tutorialSeen", "true");
            setRunTutorial(false);
        }
    };

    const steps = [
        {
            target: ".joyride-statistics",
            content: "Aqui pode ver as estatísticas das suas equipaa",
            placement: "right",
        },
        {
            target: ".joyride-teams",
            content: "Aqui pode selecionar a equipa que deseja visualizar.",
            placement: "top",
        },
        {
            target: ".joyride-calendar",
            content: "Aqui pode visualizar o seu calendário de eventos.",
            placement: "left",
        },
    ];

    //? Conteudo da Sidebar
    const sidebarContent = (
        <div className="flex-1 flex flex-col">
            <div>
                <Profile id={props.auth} />
            </div>
            <div className="joyride-calendar">
                <Calendar
                    teams={teams}
                    selectedTeamId={selectedTeamId}
                    onSelectTeam={handleTeamSelect}
                />
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
                        primaryColor: "#f04",
                        zIndex: 1000,
                    },
                }}
            />
            <DashboardContent
                teams={teams}
                selectedTeamId={selectedTeamId}
                onSelectTeam={handleTeamSelect}
            />
        </Layout>
    );
}

export default DashboardPage;
