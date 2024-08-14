import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BrowseProfiles = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get('/profile/browse');
      setUsers(res.data);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Browse Profiles</h1>
      {users.map(user => (
        <div key={user._id}>
          <img src={`/${user.profilePic}`} alt="Profile Picture" width="150" />
          <h2>{user.name}</h2>
          <p>Age: {user.profile?.age}</p>
          <p>Gender: {user.profile?.gender}</p>
          <p>Bio: {user.profile?.bio}</p>
          <p>Interests: {user.profile?.interests?.join(', ')}</p>
          <a href={`/messages/${user._id}`}>Send Message</a>
        </div>
      ))}
    </div>
  );
};

export default BrowseProfiles;
