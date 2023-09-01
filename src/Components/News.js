import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setloading] = useState(true)
  const [page, setpage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)



  const Updatenews = () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=5ace15aa80ba43c5b794e0a783f50bd1&page=${page}&pageSize=${props.pageSize}`;
    fetch(url).then((res) => res.json())
      .then((json) => {
        setArticles(json.articles)
        setTotalResults(json.totalResults)
        setloading(false)
      });
    props.setProgress(100);
  }

  useEffect(() => {
    Updatenews();
  }, [])


  
  const fetchData = () => {
    setpage(page + 1);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=5ace15aa80ba43c5b794e0a783f50bd1&page=${page+1}&pageSize=${props.pageSize}`;
    fetch(url).then((res) => res.json())
      .then((json) => {
        setArticles(articles.concat(json.articles))
        setTotalResults(json.totalResults)
        setloading(false)

      });
  };


return (
  <>
    <h2 className='text-center' style={{ margin: "40px  0px",  marginTop: "80px" }}>NewsFeed - Top Headlines </h2>
    {/*{loading && <Spinner/>}*/}
    <InfiniteScroll
      dataLength={articles.length}
      next={fetchData}
      hasMore={articles.length !== totalResults}
      loader={<Spinner />}
    >
      <div className='container'>
        <div className='row'>
          {articles.map((element) => {
            return <div className='col-md-4' key={element.url}>
              <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage}
                newsUrl={element.url} author={element.author} date={element.publishedAt} />
            </div>
          })}
        </div>
      </div>
    </InfiniteScroll>

  </>
)
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}
export default News
