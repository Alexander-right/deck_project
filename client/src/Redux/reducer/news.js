const InitialState = {
    fetchedArticles: [],
    articlesCount: 0,
    page: 1,
    isFetching: false,
};

const actionTypes = {
    FETCH_ARTICLES: 'FETCH_ARTICLES',
    CHANGE_PAGE: 'CHANGE_PAGE',
    CHANGE_FETCHING: 'CHANGE_FETCHING',
};


export default function(state = InitialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_ARTICLES:
            console.log(action.payload, 'payload');
            return ({...state, fetchedArticles: action.payload.articles, articlesCount: action.payload.articlesCount, isFetching: false});
        case actionTypes.CHANGE_PAGE:
            return ({...state, page: action.payload});
        case actionTypes.CHANGE_FETCHING:
            return({...state, isFetching: action.payload, fetchedArticles: []});
        default:
            return ({...state})
    }
}

export async function fetchArticles(dispatch, getState, arg) {
    const state = getState();
    const response = await fetch(`https://newsapi.org/v2/everything?q=Apple&from=2021-05-05&pageSize=5&page=${state.news.page}&sortBy=popularity&apiKey=5cb805ea2a2049fabdeade2b6d733227`)
        .then((res) => res.json());

    dispatch({ type: 'FETCH_ARTICLES', payload: { articles: response.articles, articlesCount: response.totalResults }})
}
