import React, { useState, useEffect } from "react";
import "./Card.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Clock from "../clock.js/clock";

const Card = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedUserName, setSelectedUserName] = React.useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const handleOpen = (userName) => {
    setOpen(true);
    setSelectedUserName(userName);
  };
  const handleClose = () => setOpen(false);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  useEffect(() => {
    const fetchCountryList = async () => {
      try {
        const response = await fetch("http://worldtimeapi.org/api/timezone");
        const data = await response.json();
        setCountries(data);
        setSelectedCountry(data[0]);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountryList();
  }, []);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const getUserPostCount = () => {
    const userPostCount = {};
    posts.forEach((post) => {
      if (userPostCount[post.userId]) {
        userPostCount[post.userId]++;
      } else {
        userPostCount[post.userId] = 1;
      }
    });
    return userPostCount;
  };

  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Unknown";
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Object.keys(getUserPostCount())

    .slice(indexOfFirstPost, indexOfLastPost)
    .map((userId) => (
      <div
        class="container-card"
        key={userId}
        onClick={() => handleOpen(getUserName(parseInt(userId)))}
      >
        <div class="title-card">
          <div>
            <h4>User Name: </h4>
          </div>
          <div>
            <h4>{getUserName(parseInt(userId))}</h4>
          </div>
        </div>
        <div class="post-card">
          <div>
            <h4>Post Count: </h4>
          </div>
          <div>
            <h4>{getUserPostCount()[userId]}</h4>
          </div>
        </div>
      </div>
    ));

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Button onClick={handleOpen}></Button>

      <Modal open={open} onClose={handleClose}>
        <div class="box">
          <div class="header-title">
            <h4 class="back">
              <a href="home">Back</a>
            </h4>

            <div class="tc">
              <select value={selectedCountry} onChange={handleCountryChange}>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <p class="clock">
                <Clock />
              </p>
            </div>
            <h4 class="back">
              <a href="stst">Stop </a>
            </h4>
          </div>
          <h5 class="pro">Profile Page </h5>
          <div class="box-profile">
            <div class="user-info">
              <Typography> Name: {selectedUserName}</Typography>
              <div class="ad">
                <Typography>Address: {selectedCountry}</Typography>
                <Typography>
                  email: {} Number:{}
                </Typography>
              </div>
            </div>

            <div class="box-post-user">
              {Object.keys(getUserPostCount()).map((userId) => {
                if (selectedUserName === getUserName(parseInt(userId))) {
                  const userPosts = posts
                    .filter((post) => post.userId === parseInt(userId))
                    .slice(0, 3);

                  return (
                    <div key={userId} class="box-post-peruser">
                      {userPosts.map((post) => (
                        <div key={post.id}>
                          <div
                            onClick={() =>
                              handleOpen(getUserName(parseInt(userId)))
                            }
                          >
                            <p>{post.title}</p>

                            <p>
                              {post.body.length > 50
                                ? `${post.body.substring(0, 50)}...`
                                : post.body}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </Modal>

      {currentPosts}

      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)}>Prev</button>
        <button onClick={() => paginate(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Card;
