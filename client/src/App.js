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
		<div className={`server-state ${serverState}`}>{`Server is ${String( serverState ).toUpperCase()}`}</div>
	</div>;
}

/**
 * Please note:
 * This function will be used together with useEffect(),
 * so it has to synchronically return nothing or a function.
 *
 * @param	{number}	pingInterval
 * @param	{function}	setPingInterval
 * @param	{function}	setServerState
 *
 * @returns	{null|function}
 */
function setupServerPing( pingInterval, setPingInterval, setServerState ) {
	// eslint-disable-next-line require-jsdoc
	const checkAndSetServerState = async () => {
		const available = await isServerAvailable();
		setServerState( available ? "up" : "down" );
	};

	if ( pingInterval == null ) {
		setTimeout( checkAndSetServerState, 100 );

		const intervalID = setInterval( checkAndSetServerState, 3000 );
		setPingInterval( intervalID );
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
