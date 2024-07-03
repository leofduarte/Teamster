import React from 'react';
import Logo from '../components_ines/Logo';
import Events from '../components_ines/Events';
import Notifications from '../components_ines/Notifications';
import Team from '../components_ines/Team';
import Medals from '../components_ines/Medals';
import { Button } from "@/Components/ui/button";
import ParticipantProfileSettings from "@/components_ines/ParticipantProfileSettings.jsx";
// import { Link } from 'react-router-dom';

const LayoutParticipant = (props, { children, hasRightSidebar = true, hasBottomSection = true, backButton = false }) => {
console.log("LayoutParticipant props:", props); 

  return (
    <div className="min-h-screen bg-[#F8F7FC] flex flex-col items-center p-8 font-poppins">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1 flex flex-col space-y-8">
          <div className="joyride-logo">
            <Logo />
          </div>
          <div className="joyride-events">
            <Events />
          </div>
          <div className="joyride-notifications">
            <Notifications />
          </div>
          {backButton && (
            <div className="flex justify-end">
              {/*<Link to="/user">*/}
                <Button variant="outline" className="ml-auto">Voltar</Button>
              {/*</Link>*/}
            </div>
          )}
        </div>

        <div className={`col-span-${hasRightSidebar ? '2' : '3'} flex flex-col items-center`}>
          {children}
        </div>

        {hasRightSidebar && (
          <div className="col-span-1 flex flex-col space-y-8">
            <div className="joyride-profile">
                <ParticipantProfileSettings />
            </div>
            <div className="joyride-team">
              <Team ParticipantProps={props} />
            </div>
          </div>
        )}
      </div>

      {hasBottomSection && (
        <div className="w-full max-w-6xl mt-4">
          <div className="joyride-medals">
            <Medals />
          </div>
        </div>
      )}
    </div>
  );
};

export default LayoutParticipant;
