const fetch = require( "node-fetch" );

const baseurl = "http://localhost:3011";
const basepath = "registration";

describe( `Route /${basepath} -`, () => {
	it( "when receiving a GET request without parameters - accepts it", async () => {
		const response = await fetch( `${baseurl}/${basepath}` );
		expect( response.status ).toBe( 200 );
	} );

	it( "when receiving a GET request without parameters - sends JSON object", async () => {
		const response = await fetch( `${baseurl}/${basepath}` );
		const data = await response.json();
		expect( data ).toBeInstanceOf( Object );
		expect( typeof data.count ).toBe( "number" );
		expect( Array.isArray( data.items ) ).toBeTruthy();
	} );

	it( "when receiving a GET request with one parameter - DECLINES it", async () => {
		const response = await fetch( `${baseurl}/${basepath}/John` );
		expect( response.status ).toBe( 404 );
	} );

	it( "when receiving a GET request with two parameters - accepts it", async () => {
		const response = await fetch( `${baseurl}/${basepath}/John/Doe` );
		expect( response.status ).toBe( 200 );
	} );

	it( "when receiving a GET request with two parameters - sends JSON object", async () => {
		const response = await fetch( `${baseurl}/${basepath}/John/Doe` );
		const data = await response.json();
		expect( data ).toBeInstanceOf( Object );
		expect( typeof data.success ).toBe( "boolean" );
		if ( data.success ) {
			expect( data.item ).toBeInstanceOf( Object );
		} else {
			expect( typeof data.code ).toBe( "string" );
			expect( data.code ).toBe( "NOTFOUND" );
		}
	} );
} );
