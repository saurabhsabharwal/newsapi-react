import React from 'react'
import {connect} from 'react-redux'

import NewsListItem from '../NewsListItem'
import ErrorMessage from '../ErrorMessage'

const FavoriteNews = props => {
	return (
		props.favoritesCount > 0 ?
			props.favoriteNews.map((art, i) => <NewsListItem news={art} key={i}/>) :
			<ErrorMessage message={'Mark some news items as favorites to view them here.'}/>
	);
};

const mapStateToProps = state => ({
	favoriteNews: state.NewsReducer.favoriteNews,
	favoritesCount: state.NewsReducer.favoriteNews.length
});

export default connect(mapStateToProps)(FavoriteNews);
