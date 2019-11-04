/* eslint-disable no-use-before-define */

import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from "@material-ui/core/styles";

import Logo from "@lexa79/react-dot-matrix-logo";

import "./App.scss";
import Registration from "./components/Registration";

const theme = responsiveFontSizes( createMuiTheme() );

export default App;

/**
 * @returns	{object}
 *		Main React.js component
 */
function App() {
	const [ pingInterval, setPingInterval ] = useState( null );
	const [ serverState, setServerState ] = useState( "down" );

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect( () => setupServerPing( pingInterval, setPingInterval, setServerState ), [] );

	return (
		<ThemeProvider theme={theme}>
			<div className="app">
				<CssBaseline/>
				<div className="header">
					<Logo
						text={"CYGNI TECH SUMMIT\n2020_"}
						background="#333"
						color={[ "white", "#9c4" ]}
						zoom={4}
						animation="running-point:#09f"
					/>
				</div>
				<Grid container direction="row" alignItems="center" wrap="nowrap" className="main">
					<Grid item xs></Grid>
					<Grid item xs={12} md={8} lg={6} xl={4}>
						<Registration serverState={serverState}/>
					</Grid>
					<Grid item xs></Grid>
				</Grid>
				<div className="footer">
					<Logo
						text="BY LEXA"
						background="#333"
						color="#9c4"
						zoom={2}
						animation="running-point:#333"
					/>
				</div>
			</div>
		</ThemeProvider>
	);
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
