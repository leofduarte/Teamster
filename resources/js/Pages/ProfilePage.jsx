import React from 'react';
import LayoutParticipant from './LayoutParticipant.jsx';
import EditProfile from '../components_ines/EditProfile.jsx'

function ProfilePage() {
  return (
    <LayoutParticipant hasBottomSection={false} backButton={true}>
      <EditProfile />
    </LayoutParticipant>
  );
}

export default ProfilePage;
