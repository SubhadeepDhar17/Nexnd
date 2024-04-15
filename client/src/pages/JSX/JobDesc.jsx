import React, { useEffect, useState } from "react";
import "../SCSS/JobDesc.scss";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const PostRender = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [post, setPost] = useState([]);
  const postID = useParams().id;
  const token = cookies.access_token;

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/pitchesDesc/" + postID
        );
        setPost(response.data);
      } catch (e) {
        alert("Server error");
      }
    };

    fetchSinglePost();
  }, []);

  return (
    <div className="job-container">
      <div className="name-and-logo">
        <h1 className="job-heading">{post.company}</h1>
        <img src={post.logo} alt=""/>  
      </div>
      <div>Founder: {post.founders} || Website: {post.website} || Estd: {post.yearStarted}</div>
      <div>Contact: {post.email}</div>
      <div>Salary: {post.salary} || Equity: {post.equity} || Location: {post.jobLocation}</div>
      <div>Amount Raised: {post.amountRaised}</div>
      <div>Objective: {post.ideas}</div>
      <div>Description: {post.jobDescription}</div>
    </div>
  );
};

export default PostRender;
