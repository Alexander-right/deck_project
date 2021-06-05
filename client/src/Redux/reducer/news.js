const InitialState = {
    fetchedArticles: [],
    articlesCount: 0,
    page: 1,
    isFetching: false,
    hasMore: true,
    fetchedPages: [],
};

const actionTypes = {
    FETCH_ARTICLES: 'FETCH_ARTICLES',
    CHANGE_PAGE: 'CHANGE_PAGE',
    CHANGE_FETCHING: 'CHANGE_FETCHING',
};


export default function(state = InitialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_ARTICLES:
            const hasMore = action.payload.articles.length >= 12;
            const fetchedPage = state.page;
            return ({...state, fetchedArticles: [...state.fetchedArticles, ...action.payload.articles], articlesCount: action.payload.articlesCount, isFetching: false, fetchedPages: [...state.fetchedPages, fetchedPage], hasMore});
        case actionTypes.CHANGE_PAGE:
            return ({...state, page: action.payload});
        case actionTypes.CHANGE_FETCHING:
            return({...state, isFetching: action.payload});
        default:
            return ({...state})
    }
}

export async function fetchArticles(dispatch, getState, arg) {
    const state = getState();
    const page = state.news.page;

    const response2 = await fetch('/api/v1/get-news',
        {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({page: page})
            })
        .then((res) => res.json());


    dispatch({ type: 'FETCH_ARTICLES', payload: { articles: response2 }})
}
