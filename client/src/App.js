/* eslint-disable no-use-before-define */

import React, { useState, useEffect } from "react";

import "./App.scss";

export default App;

/**
 * @returns	{object}
 *		Main React.js component
 */
function App() {
	const [ pingInterval, setPingInterval ] = useState( null );
	const [ serverState, setServerState ] = useState( false );

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect( () => setupServerPing( pingInterval, setPingInterval, setServerState ), [] );

	return <div className="App">
		<div className={`server-state ${serverState ? "up" : "down"}`}>
			{serverState ? "Server is UP" : "Server is DOWN"}
		</div>
	</div>;
}

/**
 * @param	{number}	pingInterval
 * @param	{function}	setPingInterval
 * @param	{function}	setServerState
 *
 * @returns	{null|function}
 */
function setupServerPing( pingInterval, setPingInterval, setServerState ) {
	if ( pingInterval == null ) {
		setTimeout( () => {
			const intervalID = setInterval( async () => {
				const serverState = await isServerAvailable();
				setServerState( serverState );
			}, 3000 );
			setPingInterval( intervalID );
		}, 100 );
	}

	return () => {
		if ( pingInterval != null ) {
			clearInterval( pingInterval );
		}
	};
}

/**
 * @returns	{boolean}
 */
async function isServerAvailable() {
	try {
		const response = await fetch( "/health" );
		if ( response.status === 200 ) {
			const output = await response.text();
			return output === "OK";
		}
	} catch ( error ) {
		return false;
	}

	return false;
}
