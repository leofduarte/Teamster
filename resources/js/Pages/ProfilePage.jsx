import React, { useEffect, useState } from "react";
import ParticipantLayout from "./ParticipantLayout";
import EditProfile from "../components_ines/EditProfile";
import Level from "../components_ines/Level";


function ProfilePage(props) {
    const [component, setComponent] = useState(null);

    useEffect(() => {
        if (window.location.href === "/participantprofile") {
            setComponent(<EditProfile ParticipantProps={props}/>);
        } else {
            setComponent(<Level ParticipantProps={props}/>);
        }
    }, []);

    return (
        <ParticipantLayout>
            {component}
        </ParticipantLayout>
    );
}

export default ProfilePage;
