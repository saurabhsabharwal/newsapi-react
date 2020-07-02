import React from 'react'

import Sources from '../Sources'
import NewsList from '../NewsList'
import NewsItem from '../NewsItem'

import './index.scss'

const App = () => {
	return (
		<div className={'app-container'}>
			<Sources/>
			<NewsList/>
			<NewsItem/>
		</div>
	);
};

export default App;
