import React,{useEffect,useState} from 'react'
import Loader from './Loader';
import NewsItems from './NewsItems'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    // constructor(props) {
    //     super(props);
        
    // }
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {

        props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        props.setProgress(20);
        let data = await fetch(url);
        props.setProgress(40);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false)
        props.setProgress(100);

    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - News Flash`
        updateNews();
    }, [])
    
    

    // async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=39fbd18185694ed5bad526520b1e6cf6&page=1&pageSize=${props.pageSize}`;
        // this.setState({ loading: true })
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({ loading: false })
        // this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })
        // this.updateNews();

    // }

    const handlePreviousClick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=39fbd18185694ed5bad526520b1e6cf6&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({ loading: false });
        // this.setState({ articles: parsedData.articles })

        // this.setState({ page: this.state.page - 1 });
        setPages(page-1)
        updateNews();
    }

    const handleNextClick = async () => {
        // if (this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)) { }
        // else {
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=39fbd18185694ed5bad526520b1e6cf6&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
        // this.setState({ loading: true })
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({ loading: false })
        // this.setState({ articles: parsedData.articles })

        // this.setState({ page: this.state.page=this.state.page + 1 });
        setPages(page+1)
        updateNews();
    }
    
    const fetchMoreData = async() => {
        setPages(page+1)
        // this.setState({page: this.state.page+1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`; 
        // this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        // this.setState({ articles: articles.concat(parsedData.articles), totalResults: parsedData.totalResults, loading: false })
        
      };

    
        return (
            <>
                <div className='my-5'>
                    <h1 className="py-2 animate-charcter text-center" style={{marginTop: '90px'}}>Latest News Updates <br /> Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                    {loading && <Loader />}
                    <InfiniteScroll
                        dataLength={articles.length}
                        next={fetchMoreData}
                        hasMore={articles.length !== totalResults}
                        loader={<Loader/>}
                    >
                    <div className='container my-5'> 
                        <div className="row">
                            {articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItems title={element.title?.slice(0, 45)} description={element.description?.slice(0, 90)} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} />
                                </div>
                            })}
                        </div>
                    </div>
                    </InfiniteScroll>
                    {/* <div className="container d-flex justify-content-between my-5">
                        <button disabled={this.state.page === 1} type="button" className="btn btn-info" onClick={this.handlePreviousClick}> &larr; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-info" onClick={this.handleNextClick}>Next &rarr;</button> */}
                    {/* </div> */}
                </div>
            </>
        )
    
}


News.defaultProps = {
    country: 'in',
    pageSize: 9,
    catagory: 'general',

}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    catagory: PropTypes.string,
}