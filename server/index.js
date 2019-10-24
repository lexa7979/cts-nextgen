const express = require( "express" );
const app = express();
const port = 3011;

const routes = require( "./routes" );
Object.keys( routes )
	.filter( name => typeof routes[name].handleAppRequest === "function" )
	.forEach( name => {
		routes[name].handleAppRequest.call( app, `/${name}` );
		// eslint-disable-next-line no-console
		console.log( `Routes installed for http://localhost:${port}/${name}` );
	} );

// eslint-disable-next-line no-console
app.listen( port, () => console.log( `\nDatabase server is listening on http://localhost:${port}` ) );
