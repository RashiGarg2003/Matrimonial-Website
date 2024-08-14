import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Matches = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const res = await axios.get('/profile/matches');
      setUsers(res.data);
    };

    fetchMatches();
  }, []);

  return (
    <div>
      <h1>Your Matches</h1>
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

export default Matches;
