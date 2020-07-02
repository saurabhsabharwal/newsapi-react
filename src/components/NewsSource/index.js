import React from 'react'
import {connect} from 'react-redux'

import {fetchNewsItems} from '../../store/actions'

import './index.scss'

const NewsSource = props => {
	const handleSourceClick = (e, id, name) => {
		props.fetchNewsItems({id, name});
	};

	return (
		<div className={'news-source-item'}>
			<button onClick={(e) => handleSourceClick(e, props.source.id, props.source.name)} className={props.source.id === props.selectedSource.id ? 'active' : ''}>
				<h4 className={'news-source-name'}>{props.source.name}{props.source.id === 'favorites' ? ` (${props.favoritesCount})` : ''}</h4>
				<p className={'news-source-description'}>{props.source.description}</p>
			</button>
		</div>
	)
};

NewsSource.defaultProps = {
	source: {
		name: 'All sources',
		id: 0,
		description: 'News from all news sources.'
	}
};

const mapStateToProps = state => ({
	selectedSource: state.NewsReducer.selectedSource,
	favoritesCount: state.NewsReducer.favoriteNews.length
});

const mapDispatchToProps = dispatch => ({
	fetchNewsItems: source => dispatch(fetchNewsItems(source)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsSource);
