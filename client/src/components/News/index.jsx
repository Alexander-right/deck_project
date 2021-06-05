import React from 'react'
import {Link, Route, useParams} from 'react-router-dom'
import { fetchArticles } from "../../Redux/reducer/news";
import { connect } from "react-redux";
import { store } from "../../Redux/reducer";
import NewsMore from "./news-more-component"
import AllNews from './all-news';
import { withRouter } from "react-router";
import ReactPaginate from 'react-paginate';
import './index.css'



class NewsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            API_KEY: '5cb805ea2a2049fabdeade2b6d733227',
            articles: [],
            articlesCount: 0,
        };

        this.handlePageClick = this.handlePageClick.bind(this)
        this.fetchArticles = this.fetchArticles.bind(this)
    }

    async componentDidMount() {
        this.fetchArticles()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.news.page === this.props.news.page) return;
        this.fetchArticles()
    }

    get formattedArticles() {
        return this.props.news.fetchedArticles && this.props.news.fetchedArticles.map((article, id) => {
            return(
                <Link to={`/news/${id}`} className={'articleLink'} style={{ maxWidth: '600px', marginBottom: 24, display: 'block', color: 'rgb(97, 67, 38)', borderBottom: '1px solid rgba(97, 67, 38, 0.3)'}}>
                    <h4>{article.title}</h4>
                    <span>{article.author}</span>
                </Link>
            )
        })
    }

    fetchArticles() {
        this.props.changeFetching(true);
        store.dispatch(fetchArticles)
    }

    get currentArticle() {
        const id = parseInt(this.props.match.params.id, 10);

        if (!Number.isInteger(id)) {
            return;
        }

        return this.props.news.fetchedArticles[id]
    }

    get pagination(){
        const pages = Math.ceil(this.props.news.articlesCount / 100);
        console.log(Math.ceil(this.props.news.articlesCount / 100));
        const formattedPages = Array.from({length: pages}, (x, i) => i).map(p => <Link style={{marginRight: 8}} to={`?page=${p+1}`}>{p + 1}</Link>)
        return formattedPages;
    }

    handlePageClick(ev) {
        this.props.changePage(this.props.news.page + 1)
    }


    render() {
        return (
            <div style={{padding: '24px'}}>
                <Route exact path={["/news"]} render={(props) => <AllNews articles={this.formattedArticles}/>}/>
                <Route exact path={"/news/:id"} render={(props) => <NewsMore content={this.currentArticle}/>}/>
                {!this.props.news.isFetching && this.props.news.hasMore && <div className={'moreButton'} style={{ padding: '8px 16px'}} onClick={this.handlePageClick}>{'Еще'}</div>}
                {this.props.news.isFetching && <div className="dot-flashing"></div>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        news: state.news
    }
};

const mapDispatchToProps = (dispatch) => ({
    changePage: (page) => dispatch({ type: 'CHANGE_PAGE', payload: page}),
    changeFetching: (curState) => dispatch({type: 'CHANGE_FETCHING', payload: curState}),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewsContainer))
