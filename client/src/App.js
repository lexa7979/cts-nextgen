import React, { useState, useEffect } from "react";
import "./App.scss";

/**
 * Main React.js component
 */
function App() {
	const [ serverPingInterval, setServerPingInterval ] = useState( null );
	const [ serverState, setServerState ] = useState( false );

	useEffect( () => {
		if ( serverPingInterval == null ) {
			setServerPingInterval( setInterval( async () => {
				const response = await fetch( "/health" );
				if ( response.status === 200 ) {
					const output = await response.text();
					setServerState( output === "OK" );
				} else {
					setServerState( false );
				}
			}, 3000 ) );
		}

		return () => clearInterval( serverPingInterval );
	}, [ serverPingInterval ] );

	return <div className="App">
		<div className={`server-state ${serverState ? "up" : "down"}`}>
			{serverState ? "Server is UP" : "Server is DOWN"}
		</div>
	</div>;
}

export default App;
