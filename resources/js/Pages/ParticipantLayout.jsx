import React from 'react';
import Logo from '../components_ines/Logo';
import Events from '../components_ines/Events';
import Notifications from '../components_ines/Notifications';
import ParticipantProfileSettings from '../components_ines/ParticipantProfileSettings';
import Team from '../components_ines/Team';
import Medals from '../components_ines/Medals';
import Level from '../components_ines/Level';

function User() {
    return (
        <div className="min-h-screen bg-[#F8F7FC] flex flex-col items-center p-8 font-poppins ">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="flex flex-col space-y-8">
                    <Logo />
                    <Events />
                    <Notifications />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <Level />
                </div>
                <div className="flex flex-col space-y-8">
                    <ParticipantProfileSettings />
                    <Team />
                </div>
            </div>
            <div className="w-full max-w-5xl mt-4">
                <Medals />
            </div>
        </div>
    );
}

export default User;
