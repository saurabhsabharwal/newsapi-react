import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'

import './index.scss'

const Loading = () => {
	return (
		<div className={'loading'}>
			<FontAwesomeIcon icon={faSpinner} spin/>
		</div>
	);
};

export default Loading;
