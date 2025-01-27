import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useParams } from "react-router-dom";
import "../SCSS/profile.scss";

export const Profile = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [profile, setProfile] = useState([]);
  const [pitches, setPitches] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const token = cookies.access_token;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const userID = window.localStorage.getItem("userID");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/users/me",
          config
        );
        setProfile(response.data);
      } catch (e) {
        alert("Internal server error");
      }
    };
    fetchProfile();

    const fetchPitches = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/pitchesSpecific`,
          config
        );
        setPitches(response.data);
      } catch (e) {
        alert("Internal error");
      }
    };
    fetchPitches();
  }, []);

  const onSubmitUserUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(
        "http://localhost:5000/users/me",
        {
          username,
        },
        config
      );
      alert("Saved. Please refresh to view changes");
    } catch (e) {
      alert("Invalid updates");
    }
  };

  const onDeleteUser = async (event) => {
    event.preventDefault();
    try {
      await axios.delete("http://localhost:5000/users/me", config);
      alert("User Profile Deleted");
      setCookies("access_token", "");
      window.localStorage.removeItem("userID");
    } catch (e) {
      alert("Invalid action");
    }
  };

  return (
    <div>
      <h1 className="heading-profile">Profile</h1>
      <div className="fields">
        <span className="fields-label">Username: </span>
        <span className="fields-profile">{profile.username}</span>
      </div>
      <div className="fields">
        <span className="fields-label">Email: </span>
        <span className="fields-profile">{profile.email}</span>
      </div>

      <hr />

      <h2 className="update-heading">Update Your Profile</h2>
      <form className="profile-form" onSubmit={onSubmitUserUpdate}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button>Edit</button>
      </form>
      <div className="delete">
        <span>Danger Zone ⚠️ Cannot be undone :</span>
        <button className="delete-button" onClick={onDeleteUser}>
          Delete User
        </button>
      </div>

      <hr />

      <div>
        <h1 className="job-profile-heading">Your Job Postings</h1>
        <ul>
          {pitches.map((pitchMap) => (
            <li key={pitchMap._id}>
              <br />
              <div className="pitch-container">
                <div className="top-part">
                  <div className="logo-company-site">
                    <div>
                      <img src={pitchMap.logo} alt="" />
                    </div>
                    <div>
                      <h1>{pitchMap.company}</h1>
                      <Link
                        to={`https://${pitchMap.website}`}
                        target="_blank"
                      >
                        {pitchMap.website}
                      </Link>
                      <div className="amount">
                        ${pitchMap.amountRaised} raised
                      </div>
                    </div>
                  </div>

                  <div className="founder-year">
                    <div>Founders: {pitchMap.founders}</div>
                    <div>Year Started: {pitchMap.yearStarted}</div>
                  </div>
                </div>
                {/* THIS SCSS IS TAKEN FROM PITCHES.SCSS*/}
                <div className="job-container">
                  <div>
                    <div>
                      Position: {pitchMap.ideas} . ${pitchMap.salary} .{" "}
                    </div>
                    <div>
                      {pitchMap.email} . HQ - {pitchMap.jobLocation}
                    </div>
                  </div>
                  <Link to={`/post/${pitchMap._id}`}>
                    <button className="learn-more">More...</button>
                  </Link>
                </div>
              </div>
              <br />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
