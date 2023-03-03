import React, { Component } from "react";

const NewsItems = (props) => {
  let { title, description, imageUrl, newsUrl, author, date } = props;
  return (
    <div>
      <div className="card my-3">
        <img src={!imageUrl ? "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg" : imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <span className="badge rounded-pill text-bg-success">New</span>

          <p className="card-text">{description}</p>
          <p className="card-text">
            <small>
              by {!author ? "unknown" : author} updated <b>{new Date(date).toGMTString()}</b>
            </small>
          </p>
          <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItems;
