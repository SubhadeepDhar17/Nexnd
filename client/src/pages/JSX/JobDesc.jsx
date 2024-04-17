import React, { useEffect, useState } from "react";
import "../SCSS/JobDesc.scss";
import { useCookies } from "react-cookie";
import { useNavigate, useParams, Link } from "react-router-dom";
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
    <div className="idea-container">
      <div className="name-logo-founder-year">
        <h1 className="job-heading">{post.company}</h1>
        <img src={post.logo} alt=""/>
        <div className="founder-and-year">
            <div>Founders: {post.founders}</div>
            <div>Year Started: {post.yearStarted}</div>
        </div>
      </div>
      <div className="rest-of-idea">
        <div className="amountRaised-website"> ${post.amountRaised} Raised || 
          <Link to={`https://www.${post.website}`} target='_blank'> {post.website} </Link>|| 
        </div>
        <div><b className="idea-labels">Contact: </b> {post.email}</div>
        <div><b className="idea-labels">HQ: </b> {post.jobLocation} </div>
        <div><b className="idea-labels"> Position: </b> {post.ideas}</div>
        <div><b className="idea-labels">Description - </b> <br /> {post.jobDescription}</div>
      </div>
    </div>
  );
};

export default PostRender;
