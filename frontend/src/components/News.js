import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button,Form, Row, Col, Container } from "reactstrap";
import Footer from './Footer';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updatenews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pagesize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parseddata = await data.json();
    props.setProgress(70);
    setArticles(parseddata.articles);
    setTotalResults(parseddata.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - WebNews`;
    updatenews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apikey}&page=${
      page + 1
    }&pageSize=${props.pagesize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parseddata = await data.json();
    setArticles(articles.concat(parseddata.articles));
    setTotalResults(parseddata.totalResults);
  };

  if(loading) return (
    <div>
        <Spinner />
    </div>
  )

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        WebNews - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {/* // {loading && <Spinner />} */}
      {loading ? (
        <Spinner />
      ) : (
        <InfiniteScroll
          dataLength={articles?.length || 0}
          next={fetchMoreData}
          hasMore={articles?.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles?.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      title={
                        element.title
                          ? element.title.slice(0, 70)
                          : "Breaking News"
                      }
                      description={
                        element.description
                          ? element.description.slice(0, 90)
                          : "Done by doing research, experts, and reading news articles."
                      }
                      imageurl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://img.etimg.com/thumb/msid-104337472,width-1200,height-630,imgsize-763014,overlay-etmarkets/photo.jpg"
                      }
                      newsurl={
                        element.url
                          ? element.url
                          : "https://www.fxstreet.com/news/gold-price-extends-upside-amid-multi-year-high-yields-and-middle-east-conflict-202310110941"
                      }
                      author={element.author ? element.author : "NewsWeb"}
                      date={element.publishedAt}
                      source={
                        element.source.name ? element.source.name : "NewsWeb"
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      )}
      <div className="news_letter_section">
                <Container>
                    <Row className='center_input'>
                        <Col className='col-xxl-7 col-xl-7 col-lg-7 col-md-6 col-sm-12 col-12'>
                            <div className='Newsletter-title'>
                                <h2>Newsletter</h2>
                                <p>Get E-mail updates about our latest shop and special offers.</p>
                            </div>
                        </Col>
                        <Col className="col-xxl-5 col-xl-5 col-lg-5 col-md-6 col-sm-12 col-12">
                            <Form className="news-form">
                                <input id="newsLetter" placeholder="Enter Your Email Address" type="email"  name="newsLetter" className='newsletter-field'></input>
                                <Button type="btn"> Subscribe </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
                <br /><br />
            <Footer />

            </div>
    </>
  );
};

News.defaultProps = {
  country: "in",
  category: "general",
  pagesize: 9,
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pagesize: PropTypes.number,
};

export default News;
