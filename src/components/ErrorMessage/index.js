import React from 'react'

import './index.scss'

const ErrorMessage = props => {
	return (
		<div className={'error-message'}>{props.message}</div>
	);
};

ErrorMessage.defaultProps = {
	message: ''
};

export default ErrorMessage;
