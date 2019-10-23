const { getInstance } = require( "./AttendeeStorage" );

const storage = getInstance();

describe( "Class AttendeeStorage -", () => {
	describe( "when initiated", () => {
		it( "without storage-ID - succeeds", () => {
			expect( typeof storage ).toBe( "object" );
			expect( storage.constructor.name ).toBe( "AttendeeStorage" );
		} );

		it( "with storage-ID \"test\" - delivers another instance", () => {
			const anotherStorage = getInstance( "test" );
			expect( anotherStorage ).not.toBe( storage );
		} );

		it( "without storage-ID, again - delivers same instance", () => {
			const anotherStorage = getInstance();
			expect( anotherStorage ).toBe( storage );
		} );
	} );

	describe( "when accessing stored test-data", () => {
		it( "- delivers exactly two complete recordsets", () => {
			const items = storage.listItems();
			expect( Array.isArray( items ) ).toBe( true );
			expect( items.length ).toBe( 2 );
			for ( let index = 0; index < items.length; index++ ) {
				expect( typeof items[index] ).toBe( "object" );
				expect( typeof items[index].firstname ).toBe( "string" );
				expect( typeof items[index].lastname ).toBe( "string" );
				expect( typeof items[index].attending ).toBe( "string" );
				expect( items[index].firstname ).not.toBe( "" );
				expect( items[index].lastname ).not.toBe( "" );
				expect( items[index].attending ).not.toBe( "" );
			}
		} );
	} );
} );
