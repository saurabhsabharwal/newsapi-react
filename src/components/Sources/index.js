import React, {useEffect} from 'react'
import {connect} from 'react-redux';

import NewsSource from '../NewsSource'
import Loading from '../Loading'

import {fetchSources} from "../../store/actions";

import './index.scss'
import ErrorMessage from "../ErrorMessage";

const Sources = props => {
	const {fetchSources} = props;

	useEffect(() => {
		fetchSources();
	}, [fetchSources]);

	const favorites = {
		id: 'favorites',
		name: `Favorites`
	};

	return (
		<div className={'news-sources-container'}>
			<div className={'sources-heading'}>
				<h3>News Sources</h3>
			</div>
			<div className={'news-sources-list'}>
				<NewsSource/>
				{
					!props.error.status ?
						props.loading ?
							<Loading /> :
							props.sources.length > 0 ?
								props.sources.map(src => <NewsSource source={src} key={src.id}/>) :
								<ErrorMessage message={'No sources found!'}/> :
						<ErrorMessage message={props.error.message} />
				}
			</div>
			<div className={'favorite-news'}>
				<NewsSource source={favorites} />
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	loading: state.NewsReducer.sourcesLoading,
	error: state.NewsReducer.errorLoadingSources,
	sources: state.NewsReducer.sources,
});

const mapDispatchToProps = dispatch => ({
	fetchSources: () => dispatch(fetchSources())
});

export default connect(mapStateToProps, mapDispatchToProps)(Sources);
