import React from 'react';

const ConnectionTiles = props => {
	let connections = props.effectParameterNames.map(connection => {
		return (
			<div className="connection-tiles" key={Date.now + Math.random() * 100}>
				{connection}
			</div>
		);
	});

	return <div className={props.className}>{connections}</div>;
};

export default ConnectionTiles;
