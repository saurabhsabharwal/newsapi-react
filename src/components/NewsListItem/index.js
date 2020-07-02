import React from 'react'
import {connect} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar as solidStar} from '@fortawesome/free-solid-svg-icons'
import {faStar as regularStar} from '@fortawesome/free-regular-svg-icons'

import {setSelectedNewsItem, toggleFavorite} from '../../store/actions'

import './index.scss'

const NewsListItem = props => {
	let date = new Date(props.news.publishedAt);
	date = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.toLocaleTimeString('en-US')}`;

	const handleToggleFavorite = (e, newsItem) => {
		e.preventDefault();

		props.toggleFavorite(newsItem);
	};

	let star = regularStar;

	props.favoriteNews.forEach(news => {
		if (props.news.url === news.url) {
			star = solidStar;
		}
	});

	const handleNewsItemClick = e => {
		e.preventDefault();

		props.selectNews(props.news);
	};

	return (
		<div className={'news-list-item'}>
			<div
				className={['news-list-item-wrapper', props.selectedNews.url === props.news.url ? "active" : ""].join(' ')}>
				<div className={'news-image'}>
					<button className={'image-container'} style={{backgroundImage: `url('${props.news.urlToImage}')`}}/>
				</div>
				<div className={'news-info'}>
					<h4 title={props.news.title}>
						<button onClick={e => handleNewsItemClick(e)}>{props.news.title}</button>
					</h4>
					<p className={'news-author'}>{props.news.author}</p>
					<p className={'news-date-time'}>{date}</p>

					<div className={'favorite-toggle'}>
						<button onClick={e => handleToggleFavorite(e, props.news)}>
							<FontAwesomeIcon icon={star}/>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	favoriteNews: state.NewsReducer.favoriteNews,
	selectedNews: state.NewsReducer.selectedNewsItem
});

const mapDispatchToProps = dispatch => ({
	toggleFavorite: newsItem => dispatch(toggleFavorite(newsItem)),
	selectNews: newsItem => dispatch(setSelectedNewsItem(newsItem))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsListItem);
