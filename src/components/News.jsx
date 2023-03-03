import React, { useEffect, useState } from "react";

import NewsItems from "./NewsItems";
import Spiner from "./Spiner";
import PropTypes from "prop-types";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setloading] = useState(false);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);
  // const [progress, setProgress] = useState(0);

  // constructor() {
  //   super();
  //    state = {
  //     articles: [],
  //     loading: false,
  //     page: 1,
  //   };
  // }
  const updateInfo = async () => {
    props.setProgress(30);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ccb37e4fa5974e3db0ae857f956f72df&page=${props.page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedata = await data.json();
    //  setState({
    //   articles: parsedata.articles,
    //   totalResults: parsedata.totalResults,
    // });
    setArticles(parsedata.articles);
    settotalResults(parsedata.totalResults);
    props.setProgress(100);
  };

  useEffect(() => {
    updateInfo();
  }, []);
  // componentDidMount = async () => {
  //   updateInfo();
  // };

  const gotoprivious = async () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    props.setProgress(30);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ccb37e4fa5974e3db0ae857f956f72df&page=${page - 1}pageSize=${props.pageSize}`;
    setpage(page + 1);
    setloading(true);
    let data = await fetch(url);
    let parsedata = await data.json();

    //  setState({ articles: parsedata.articles });
    setArticles(parsedata.articles);
    setloading(false);
    setpage(page - 1);

    //  updateInfo();
    //  setState({
    //   page:    page - 1,
    //   loading: false,
    // });
    props.setProgress(100);
  };
  const gotonext = async () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (page + 1 > Math.ceil(totalResults / props.pageSize)) {
    } else {
      props.setProgress(30);
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ccb37e4fa5974e3db0ae857f956f72df&page=${page + 1}&pageSize=${props.pageSize}`;
      //  setState({ loading: true });
      setloading(true);
      let data = await fetch(url);
      let parsedata = await data.json();
      //  setState({ articles: parsedata.articles });
      setArticles(parsedata.articles);
      setpage(page + 1);
      setloading(false);
      //  updateInfo();
      //  setState({
      //   page:    page + 1,
      //   loading: false,
      // });
      props.setProgress(100);
    }
  };

  return (
    <div className="container my-1">
      <h1 className="text-center" style={{ fontSize: "100px" }}>
        Taza News
      </h1>
      {loading && <Spiner />}
      <div className="row my-3">
        {!loading &&
          articles.map((element) => {
            return (
              <div className="movie-list-item-img col-md-4" key={element.url}>
                <div className="movie-list-item-img">
                  <NewsItems title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                </div>
              </div>
            );
          })}
      </div>
      <div className="container d-flex justify-content-between">
        <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={gotoprivious}>
          &larr;Privious
        </button>
        <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={gotonext}>
          Next &rarr;
        </button>
      </div>
    </div>
  );
};
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
