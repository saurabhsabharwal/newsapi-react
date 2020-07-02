import React from 'react'
import {connect} from 'react-redux'

import NewsListItem from '../NewsListItem'
import FavoriteNews from '../FavoriteNews'
import Loading from '../Loading'
import ErrorMessage from '../ErrorMessage'

import './index.scss'

const NewsList = props => {
	return (
		<div className={'news-list-container'}>
			<div className={'news-list-heading'}>
				<h3>{props.selectedSource.name}{`${props.selectedSource.name.startsWith('Favorites') ? '(' + props.favoritesCount + ')' : ''}`}</h3>
			</div>
			<div className={'news-list-items'}>
				{
					!props.error.status ?
						props.loading ?
							<Loading/> :
							props.selectedSource.name.startsWith('Favorites') ?
								<FavoriteNews/> :
								props.newsItems.length > 0 ?
									props.newsItems.map((art, i) => <NewsListItem news={art} key={i}/>) :
									<ErrorMessage message={'Select a source to view articles here.'}/> :
						<ErrorMessage message={props.error.message}/>
				}
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	loading: state.NewsReducer.newsItemsLoading,
	error: state.NewsReducer.errorLoadingNewsItems,
	newsItems: state.NewsReducer.newsItems,
	selectedSource: state.NewsReducer.selectedSource,
	favoriteNews: state.NewsReducer.favoriteNews,
	favoritesCount: state.NewsReducer.favoriteNews.length
});

export default connect(mapStateToProps)(NewsList);
