import {produce} from 'immer'
import {
	ERROR_LOADING_NEWS_ITEM,
	ERROR_LOADING_NEWS_ITEMS,
	ERROR_LOADING_SOURCES,
	LOADING_NEWS_ITEM,
	LOADING_NEWS_ITEMS,
	LOADING_SOURCES,
	RECEIVE_NEWS_ITEMS,
	RECEIVE_SOURCES, SELECTED_NEWS_ITEM,
	SELECTED_SOURCE, SET_FAVORITES_AS_CURRENT, TOGGLE_NEWS_AS_FAVORITE
} from '../actionTypes'

const baseState = {
	sourcesLoading: false,
	newsItemsLoading: false,
	newsItemLoading: false,
	errorLoadingSources: false,
	errorLoadingNewsItems: false,
	errorLoadingNewsItem: false,
	selectedSource: {
		id: '0',
		name: 'All sources'
	},
	sources: [],
	newsItems: [],
	favoriteNews: [],
	selectedNewsItem: {}
};

const NewsReducer = produce((draft, action) => {
	switch (action.type) {
		case LOADING_SOURCES:
			draft.sourcesLoading = action.status;

			return draft;

		case LOADING_NEWS_ITEMS:
			draft.newsItemsLoading = action.status;

			return draft;

		case LOADING_NEWS_ITEM:
			draft.newsItemLoading = action.status;

			return draft;

		case ERROR_LOADING_SOURCES:
			draft.errorLoadingSources = {
				status: action.status,
				message: action.message
			};

			return draft;

		case ERROR_LOADING_NEWS_ITEMS:
			draft.errorLoadingNewsItems = {
				status: action.status,
				message: action.message
			};

			return draft;

		case ERROR_LOADING_NEWS_ITEM:
			draft.errorLoadingNewsItem = {
				status: action.status,
				message: action.message
			};

			return draft;

		case RECEIVE_SOURCES:
			draft.sources = action.sources;

			return draft;

		case SELECTED_SOURCE:
			draft.selectedSource = action.source;

			return draft;

		case RECEIVE_NEWS_ITEMS:
			draft.newsItems = action.newsItems;

			return draft;

		case TOGGLE_NEWS_AS_FAVORITE:
			let foundFav = false;

			draft.favoriteNews.forEach((news, i) => {
				if (news.url === action.newsItem.url) {
					draft.favoriteNews.splice(i, 1);

					foundFav = true;
				}
			});

			if (foundFav) {
				return draft;
			}

			draft.favoriteNews = [...draft.favoriteNews, action.newsItem];

			return draft;

		case SET_FAVORITES_AS_CURRENT:
			draft.newsItems = draft.favoriteNews;

			return draft;

		case SELECTED_NEWS_ITEM:
			draft.selectedNewsItem = action.newsItem;

			return draft;

		default:
			return draft;
	}
}, baseState);

export default NewsReducer;
