import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Profile = () => {
  const [user, setUser] = useState({});
    useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get('/profile');
      setUser(res.data);
    };
    fetchUser();
  }, []);
   const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await axios.post('/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    window.location.reload();
  };
  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <img src={`/${user.profilePic}`} alt="Profile Picture" width="150" />
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="number" name="age" placeholder="Age" defaultValue={user.profile?.age} required />
        <input type="text" name="gender" placeholder="Gender" defaultValue={user.profile?.gender} required />
        <textarea name="bio" placeholder="Bio" defaultValue={user.profile?.bio} required />
        <input type="text" name="interests" placeholder="Interests" defaultValue={user.profile?.interests?.join(', ')} required />
        <input type="file" name="profilePic" />
        <button type="submit">Update Profile</button>
      </form>
      <a href="/browse">Browse Profiles</a>
      <a href="/matches">View Matches</a>
    </div>
  );
};

export default Profile;
