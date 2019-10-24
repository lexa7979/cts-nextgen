const fetch = require( "node-fetch" );

const baseurl = "http://localhost:3011";
const basepath = "health";

describe( `Route /${basepath} -`, () => {
	it( "when receiving a GET request without parameters - accepts it", async () => {
		const response = await fetch( `${baseurl}/${basepath}` );
		expect( response.status ).toBe( 200 );
	} );

	it( "when receiving a GET request without parameters - delivers string", async () => {
		const response = await fetch( `${baseurl}/${basepath}` );
		const data = await response.text();
		expect( data ).toBe( "OK" );
	} );

	it( "when receiving a GET request with one parameter - DECLINES it", async () => {
		const response = await fetch( `${baseurl}/${basepath}/John` );
		expect( response.status ).toBe( 404 );
	} );
} );
