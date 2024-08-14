import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MessageForm from './MessageForm';

const ProfileView = () => {
  const { profileId } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/profile/${profileId}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [profileId]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>{profile.name}'s Profile</h1>
      {profile.profilePic && <img src={`/${profile.profilePic}`} alt="Profile Picture" className="img-thumbnail" />}
      <p><strong>Age:</strong> {profile.age}</p>
      <p><strong>Gender:</strong> {profile.gender}</p>
      <p><strong>Bio:</strong> {profile.bio}</p>
      <p><strong>Interests:</strong> {profile.interests.join(', ')}</p>
      <p><strong>Date of Birth:</strong> {new Date(profile.dateOfBirth).toDateString()}</p>
      <p><strong>Height:</strong> {profile.height} cm</p>
      <p><strong>Marital Status:</strong> {profile.maritalStatus}</p>
      <p><strong>Mother Tongue:</strong> {profile.motherTongue}</p>
      <p><strong>Religion:</strong> {profile.religion}</p>
      <p><strong>City:</strong> {profile.city}</p>
      <p><strong>Pincode:</strong> {profile.pincode}</p>
      <p><strong>Department:</strong> {profile.department}</p>
      <MessageForm receiverId={profile._id} />
    </div>
  );
};

export default ProfileView;
