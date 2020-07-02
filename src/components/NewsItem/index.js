import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar as solidStar} from '@fortawesome/free-solid-svg-icons'
import {faStar as regularStar} from '@fortawesome/free-regular-svg-icons'

import ErrorMessage from "../ErrorMessage";

import {toggleFavorite} from "../../store/actions";

import './index.scss'

const NewsItem = props => {
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		let foundFav = false;

		props.favoriteNews.forEach(news => {
			if (news.url === props.news.url) {
				foundFav = true;
			}
		});

		setIsFavorite(foundFav);
	}, [props.news, props.favoriteNews, isFavorite]);

	const handleFavoriteClick = e => {
		e.preventDefault();

		props.toggleFavorite(props.news);
	};

	return (
		<div className={'news-item-container'}>
			{
				props.news.hasOwnProperty('title') ?
					<>
						<div className={'news-item-heading'}>
							<h4 title={props.news.title}>
								{props.news.title}
								<div className={'favorite-toggle'}>
									<button onClick={e => handleFavoriteClick(e)}><FontAwesomeIcon
										icon={isFavorite ? solidStar : regularStar}/></button>
								</div>
							</h4>
						</div>
						<div className={'news-item-content'}>
							{
								props.news.urlToImage ?
									<div className={'news-item-image'}>
									<span className={'image-container'}
										  style={{backgroundImage: `url('${props.news.urlToImage}')`}}/>
									</div> :
									''
							}

							<div className={'news-content'}>
								<p>
									{props.news.content} <a href={props.news.url} target={'_blank'}
															rel={'noopener noreferrer'}>Click here to read more.</a>
									<br/>
								</p>
							</div>
						</div>
					</>
					: <ErrorMessage message={'Select a news article to view here.'}/>
			}

		</div>
	);
};

const mapStateToProps = state => ({
	news: state.NewsReducer.selectedNewsItem,
	favoriteNews: state.NewsReducer.favoriteNews
});

const mapDispatchToProps = dispatch => ({
	toggleFavorite: newsItem => dispatch(toggleFavorite(newsItem))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsItem);


