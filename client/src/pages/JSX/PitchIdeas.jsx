import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import "../SCSS/PitchIdeas.scss";

export const PitchIdeas = () => {
  const userID = window.localStorage.getItem("userID");
  const [cookies, setCookies] = useCookies(["access_token"]);
  const token = cookies.access_token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const [startUp, setstartUp] = useState({
    company: "",
    website: "",
    logo: "",
    founders: "",
    email: "",
    yearStarted: 0,
    amountRaised: 0,
    ideas: "",
    jobDescription: "",
    salary: 0,
    equity: 0,
    jobLocation: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setstartUp({ ...startUp, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5000/pitchIdeas", startUp, config);
      alert("Posted");
      navigate("/profile");
    } catch (e) {
      alert("Unexpected error");
    }
  };

  return (
    <div>
      <h1 className="heading-pitch-ideas">Create Pitch</h1>
      <form className="pitch-idea-form" onSubmit={onSubmit}>
        <label htmlFor="company">Company: <sup>*</sup> </label>
        <input
          type="text"
          id="company"
          name="company"
          required
          onChange={handleChange}
        />
        <label htmlFor="website">Website: </label>
        <input
          type="text"
          id="website"
          name="website"
          placeholder="www.website.com"
          onChange={handleChange}
        />
        <label htmlFor="company">Logo: </label>
        <input
          type="text"
          id="logo"
          name="logo"
          placeholder="logo link"
          onChange={handleChange}
        />
        <label htmlFor="founders">Founders: <sup>*</sup> </label>
        <input
          type="text"
          name="founders"
          id="founders"
          required
          onChange={handleChange}
        />
        <label htmlFor="email">Email: <sup>*</sup></label>
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="mydream@company.com"
          onChange={handleChange}
        />
        <label htmlFor="jobDescription">Pitch Description: <sup>*</sup></label>
        <textarea
          name="jobDescription"
          id="jobDescription"
          required
          onChange={handleChange}
        />
        <p>Please do not use " , - / " in number fields</p>
        <label htmlFor="yearStarted">Started <sup>*</sup> (year): </label>
        <input
            type="number"
            name="yearStarted"
            id="yearStarted"
            required
            onChange={handleChange}
        />
        <label htmlFor="amountRaised">Amount Raised: <sup>*</sup> ($)</label>
        <input
            type="number"
            name="amountRaised"
            id="amountRaised"
            onChange={handleChange}
        />
        {/* <div className="two-fields">
          <label htmlFor="yearStarted">Started <sup>*</sup> (year): </label>
          <label htmlFor="amountRaised">Amount Raised: <sup>*</sup> ($)</label>
        </div>
        <div className="two-fields">
          <input
            type="number"
            name="yearStarted"
            id="yearStarted"
            required
            onChange={handleChange}
          />
          <input
            type="number"
            name="amountRaised"
            id="amountRaised"
            onChange={handleChange}
          />
        </div> */}

        {/* <div className="two-fields">
          <label htmlFor="salary">Salary/Month ($): </label>
          <label htmlFor="equity">Equity ($): </label>
        </div>
        <div className="two-fields">
          <input
            type="number"
            name="salary"
            id="salary"
            placeholder="per month"
            onChange={handleChange}
          />
          <input
            type="number"
            step="0.01"
            name="equity"
            id="equity"
            onChange={handleChange}
          />
        </div> */}
        <label htmlFor="ideas">Position Title: <sup>*</sup> </label>
        <input
          type="text"
          name="ideas"
          id="ideas"
          required
          placeholder="CFO/CEO/Marketing Manager..."
          onChange={handleChange}
        />
        <label htmlFor="jobLocation">Head Quaters: <sup>*</sup> </label>
        <input
          type="text"
          name="jobLocation"
          id="jobLocation"
          required
          onChange={handleChange}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};
