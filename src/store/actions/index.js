import {
	ERROR_LOADING_NEWS_ITEMS,
	ERROR_LOADING_SOURCES,
	LOADING_NEWS_ITEMS,
	LOADING_SOURCES,
	RECEIVE_NEWS_ITEMS,
	RECEIVE_SOURCES, SELECTED_NEWS_ITEM,
	SELECTED_SOURCE,
	SET_FAVORITES_AS_CURRENT,
	TOGGLE_NEWS_AS_FAVORITE
} from '../actionTypes'

import {apiUrl, newsApiKey} from '../../utils/api'

const loadingSources = status => ({
	type: LOADING_SOURCES,
	status
});

const loadingNewsItems = status => ({
	type: LOADING_NEWS_ITEMS,
	status
});

const errorLoadingSources = (status = false, message = '') => ({
	type: ERROR_LOADING_SOURCES,
	status,
	message
});

const errorLoadingNewsItems = (status = false, message = '') => ({
	type: ERROR_LOADING_NEWS_ITEMS,
	status,
	message
});

const receiveSources = sources => ({
	type: RECEIVE_SOURCES,
	sources
});

const receiveNewsItems = newsItems => ({
	type: RECEIVE_NEWS_ITEMS,
	newsItems
});

const selectCurrentSource = source => ({
	type: SELECTED_SOURCE,
	source
});

const setFavoritesAsCurrent = () => ({
	type: SET_FAVORITES_AS_CURRENT
});

export const setSelectedNewsItem = newsItem => ({
	type: SELECTED_NEWS_ITEM,
	newsItem
});

export const fetchSources = () => dispatch => {
	dispatch(errorLoadingSources(false));
	dispatch(loadingSources(true));

	fetch(`${apiUrl}sources?apiKey=${newsApiKey}`)
		.then(response => response.json())
		.then(response => {
			if (response.status === 'ok') {
				dispatch(receiveSources(response.sources));
			} else {
				dispatch(errorLoadingSources(true, response.message));
			}

			dispatch(loadingSources(false));
		});
};

export const fetchNewsItems = source => dispatch => {
	dispatch(errorLoadingNewsItems(false));
	dispatch(loadingNewsItems(true));
	dispatch(setSelectedNewsItem({}));

	dispatch(selectCurrentSource(source));

	if (source.id === 'favorites') {
		dispatch(setFavoritesAsCurrent());
		dispatch(loadingNewsItems(false));

		return;
	}

	let url = `${apiUrl}everything?apiKey=${newsApiKey}`;

	if (source.id === 0) {
		// Hack for fetching news from all sources as NewsAPI does not allow it.
		url += `&q=news`;
	} else {
		url += `&sources=${source.id}`;
	}

	fetch(url)
		.then(response => response.json())
		.then(response => {
			if (response.status === 'ok' && response.totalResults > 0) {
				dispatch(receiveNewsItems(response.articles));
			} else if (response.status !== 'ok') {
				dispatch(errorLoadingNewsItems(true, response.message));
			} else if (response.totalResults === 0) {
				dispatch(errorLoadingNewsItems(true, 'No articles found for this source. Please click on other sources.'));
			}

			dispatch(loadingNewsItems(false));
		})
};

export const toggleFavorite = newsItem => ({
	type: TOGGLE_NEWS_AS_FAVORITE,
	newsItem
});
