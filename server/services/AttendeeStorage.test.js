/* eslint-disable max-lines-per-function */

const { getInstance } = require( "./AttendeeStorage" );

/**
 * Randomly constructs a word which is not already contained in a given list.
 * @param	{string[]}	allKnownNames
 * @returns {string}
 */
function newRandomName( allKnownNames ) {
	const constants = "bdfghklmnprstvw";
	const vocals = "aeiou";

	const allKnownNamesLowercase = allKnownNames.map( name => name.toLowerCase() );

	let newName = "";
	for ( let index = 0; index < 10; index++ ) {
		newName += constants.substr( Math.floor( Math.random() * constants.length ), 1 )
			+ vocals.substr( Math.floor( Math.random() * vocals.length ), 1 );
		if ( index > 0 && !allKnownNamesLowercase.includes( newName ) ) {
			return newName.substr( 0, 1 ).toUpperCase() + newName.substr( 1 );
		}
	}

	throw new Error( "Failed to randomly compose previously unused name" );
}

describe( "Class AttendeeStorage -", () => {
	describe( "when initiated", () => {
		it( "using storage-ID \"test\" - succeeds", () => {
			const storage = getInstance( "test" );

			expect( storage ).toBeInstanceOf( Object );
			expect( storage.constructor.name ).toBe( "AttendeeStorage" );
		} );

		it( "without a storage-ID - delivers another instance", () => {
			const storage = getInstance( "test" );

			const anotherStorage = getInstance();
			expect( anotherStorage ).not.toBe( storage );
		} );

		it( "using storage-ID \"test\", again - delivers same instance as before", () => {
			const storage = getInstance( "test" );

			const anotherStorage = getInstance( "test" );
			expect( anotherStorage ).toBe( storage );
		} );
	} );

	describe( "when accessing initially stored test-data", () => {
		it( "as a list with listItems() - delivers exactly two complete recordsets", () => {
			const storage = getInstance( "test" );
			const allInitialItems = [ ...storage.listItems() ];

			expect( Array.isArray( allInitialItems ) ).toBeTruthy();
			expect( allInitialItems.length ).toBe( 2 );
		} );

		it( "as a list with listItems() - delivers recordsets in expected format", () => {
			const storage = getInstance( "test" );
			const allInitialItems = [ ...storage.listItems() ];

			for ( let index = 0; index < allInitialItems.length; index++ ) {
				const item = allInitialItems[index];
				expect( item ).toBeInstanceOf( Object );

				const { id, firstname, lastname, attending } = item;
				expect( [ typeof id, typeof firstname, typeof lastname, typeof attending ] )
					.toEqual( [ "number", "string", "string", "string" ] );

				expect( id ).toBeGreaterThan( 0 );
				expect( firstname ).not.toBe( "" );
				expect( lastname ).not.toBe( "" );
				expect( attending ).not.toBe( "" );
			}
		} );

		it( "individually with findItem() - delivers same data as before", () => {
			const storage = getInstance( "test" );
			const allInitialItems = [ ...storage.listItems() ];

			allInitialItems.forEach( initialItem => {
				const { firstname, lastname } = initialItem;

				const foundItem = storage.findItem( { firstname, lastname } );
				expect( foundItem ).toEqual( initialItem );
			} );
		} );


		it( "individually with findItem() and lowercase data - delivers same data as before", () => {
			const storage = getInstance( "test" );
			const allInitialItems = [ ...storage.listItems() ];

			allInitialItems.forEach( initialItem => {
				const firstnameLowerCase = initialItem.firstname.toLowerCase();
				const lastnameLowerCase = initialItem.lastname.toLowerCase();

				if (
					firstnameLowerCase === initialItem.firstname.toUpperCase()
					|| lastnameLowerCase === initialItem.lastname.toUpperCase()
				) {
					throw new Error( "Bad test data" );
				}

				const foundItem = storage.findItem( {
					firstname: firstnameLowerCase,
					lastname:  lastnameLowerCase,
				} );
				expect( foundItem ).toEqual( initialItem );
			} );
		} );

		it( "individually with findItem() and uppercase data - delivers same data as before", () => {
			const storage = getInstance( "test" );
			const allInitialItems = [ ...storage.listItems() ];

			allInitialItems.forEach( initialItem => {
				const firstnameUpperCase = initialItem.firstname.toUpperCase();
				const lastnameUpperCase = initialItem.lastname.toUpperCase();

				if (
					firstnameUpperCase === initialItem.firstname.toLowerCase()
					|| lastnameUpperCase === initialItem.lastname.toLowerCase()
				) {
					throw new Error( "Bad test data" );
				}

				const foundItem = storage.findItem( {
					firstname: firstnameUpperCase,
					lastname:  lastnameUpperCase,
				} );
				expect( foundItem ).toEqual( initialItem );
			} );
		} );
	} );

	describe( "when storing new data", () => {
		it( "using the already stored names - only changes the existing recordsets", () => {
			const storage = getInstance( "test" );
			const allPreviousItems = [ ...storage.listItems() ];

			allPreviousItems.forEach( previousItem => {
				const newItem = {
					firstname: previousItem.firstname,
					lastname:  previousItem.lastname,
					attending: previousItem.attending === "yes" ? "no" : "yes",
				};

				const storedItem = storage.saveItem( newItem );
				expect( storedItem ).toEqual( { ...newItem, id: previousItem.id } );
			} );

			const allNewItems = [ ...storage.listItems() ];
			expect( allNewItems.length ).toBe( allPreviousItems.length );

			allPreviousItems.forEach( previousItem => {
				const { firstname, lastname } = previousItem;
				const foundItem = storage.findItem( { firstname, lastname } );

				expect( foundItem ).toBeInstanceOf( Object );
				expect( foundItem.id ).toBe( previousItem.id );
				expect( foundItem.attending ).not.toBe( previousItem.attending );
			} );
		} );

		it( "using previously unknown names - adds new recordsets with unique IDs", () => {
			const storage = getInstance( "test" );
			const allPreviousItems = [ ...storage.listItems() ];

			for ( let index = 0; index < 10; index++ ) {
				const allStoredItems = [ ...storage.listItems() ];

				const firstname = newRandomName( allStoredItems.map( item => item.firstname ) );
				const lastname = newRandomName( allStoredItems.map( item => item.lastname ) );

				const storedItem = storage.saveItem( { firstname, lastname, attending: "maybe" } );
				expect( typeof storedItem.id ).toBe( "number" );
				expect( allStoredItems.map( item => item.id ).includes( storedItem.id ) ).toBeFalsy();
			}

			const allStoredItems = [ ...storage.listItems() ];
			expect( allStoredItems.length ).toBe( allPreviousItems.length + 10 );
		} );
	} );
} );
