import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const ProfileSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [gender, setGender] = useState('');
  const [religion, setReligion] = useState('');
  const [state, setState] = useState('');
  const [location, setLocation] = useState('');
  const [profiles, setProfiles] = useState([]);
  const history = useHistory();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/profile/search', {
        searchTerm,
        minAge,
        maxAge,
        gender,
        religion,
        state,
        location
      });
      setProfiles(response.data);
    } catch (error) {
      console.error('Error searching profiles:', error);
    }
  };

  const handleProfileSelect = (profileId) => {
    history.push(`/profile/${profileId}`);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="searchTerm">Search Profiles</label>
          <input
            type="text"
            id="searchTerm"
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="minAge">Min Age</label>
          <input
            type="number"
            id="minAge"
            className="form-control"
            value={minAge}
            onChange={(e) => setMinAge(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="maxAge">Max Age</label>
          <input
            type="number"
            id="maxAge"
            className="form-control"
            value={maxAge}
            onChange={(e) => setMaxAge(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender <span style={{ color: 'red' }}>*</span></label>
          <select
            id="gender"
            className="form-control"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="religion">Religion</label>
          <input
            type="text"
            id="religion"
            className="form-control"
            value={religion}
            onChange={(e) => setReligion(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            className="form-control"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">GAIL Location</label>
          <input
            type="text"
            id="location"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
      <div className="profile-results">
        {profiles.map((profile) => (
          <div
            key={profile._id}
            onClick={() => handleProfileSelect(profile._id)}
            style={{ cursor: 'pointer', margin: '10px 0', padding: '10px', border: '1px solid #ccc' }}
          >
            <h4>{profile.name}</h4>
            <p>{profile.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSearch;
