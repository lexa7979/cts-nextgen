/* eslint-disable max-lines-per-function */

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

	it( "when receiving a PUT request without body - DECLINES it", async () => {
		const response = await fetch( `${baseurl}/${basepath}`, { method: "PUT" } );
		const data = await response.text();
		if ( response.status !== 400 ) {
			throw new Error( `Server responded with code ${response.status} and output "${data}"` );
		}
	} );

	it( "when receiving a PUT request with testdata in body - accepts it", async () => {
		const testData = { firstname: "Johnny", lastname: "Puma", attending: "no" };
		const requestOptions = {
			method:  "PUT",
			body:    JSON.stringify( testData ),
			headers: { "Content-Type": "application/json" },
		};
		const response = await fetch( `${baseurl}/${basepath}`, requestOptions );
		if ( response.status !== 200 ) {
			const data = await response.text();
			throw new Error( `Server responded with code ${response.status} and output "${data}"` );
		}
	} );

	it( "when receiving a PUT request with testdata in body - sends JSON object", async () => {
		const testData = { firstname: "Johnny", lastname: "Puma", attending: "no" };
		const requestOptions = {
			method:  "PUT",
			body:    JSON.stringify( testData ),
			headers: { "Content-Type": "application/json" },
		};
		const response = await fetch( `${baseurl}/${basepath}`, requestOptions );
		if ( response.status !== 200 ) {
			const data = await response.text();
			throw new Error( `Server responded with code ${response.status} and output "${data}"` );
		}

		const data = await response.json();
		expect( data ).toBeInstanceOf( Object );
		expect( typeof data.success ).toBe( "boolean" );
		expect( data.item ).toBeInstanceOf( Object );
		expect( typeof data.item.id ).toBe( "number" );
		expect( data.item.id ).toBeGreaterThan( 0 );
		expect( data.item.firstname ).toBe( testData.firstname );
		expect( data.item.lastname ).toBe( testData.lastname );
		expect( data.item.attending ).toBe( testData.attending );
	} );
} );
