const assert = require( "assert" );

const storageInstances = {};

/**
 * Managing people some are registrated to attend av event.
 *
 * Characteristics:
 * - The data is held in memory and not persisted.
 * - Every recordset saves firstname, lastname and an attending-switch.
 * - There will always be at most one recordset for every given pair of firstname and lastname
 *		(compared case-insensitive).
 */
class AttendeeStorage {
	/**
	 * Delivers an object instance to work with.
	 *
	 * @param	{string}	storageID
	 *
	 * @returns	{AttendeeStorage}
	 */
	static getInstance( storageID = "default" ) {
		assert( typeof storageID === "string" && storageID !== "",
			`Invalid type of argument "storageID" (${typeof storageID})` );

		if ( storageInstances[storageID] == null ) {
			storageInstances[storageID] = new AttendeeStorage();
		}

		return storageInstances[storageID];
	}

	// eslint-disable-next-line require-jsdoc
	constructor() {
		this.data = [
			{ id: 1, firstname: "Alexander", lastname: "Urban", attending: "yes" },
			{ id: 2, firstname: "Johnny", lastname: "Puma", attending: "no" },
		];

		this.locales = [ "sv-SE", "de-DE" ];
	}

	/**
	 * Looks up the recordset with the given firstname and lastname.
	 *
	 * @param	{object}	searchData
	 * @param	{string}	searchData.firstname
	 * @param	{string}	searchData.lastname
	 *
	 * @returns	{object|null}
	 *		Complete found recordset; or
	 *		Null if no recordset was found
	 */
	findItem( searchData ) {
		assert( searchData != null && typeof searchData === "object",
			`Invalid type of argument "searchData" (${typeof searchData})` );
		assert( typeof searchData.firstname === "string" && searchData.firstname !== "",
			`Invalid argument "searchData.firstname" (${searchData.firstname})` );
		assert( typeof searchData.lastname === "string" && searchData.lastname !== "",
			`Invalid argument "searchData.lastname" (${searchData.lastname})` );

		const firstname = searchData.firstname.toLocaleLowerCase( this.locales );
		const lastname = searchData.lastname.toLocaleLowerCase( this.locales );

		for ( let index = 0; index < this.data.length; index++ ) {
			if (
				firstname === this.data[index].firstname.toLocaleLowerCase( this.locales )
				&& lastname === this.data[index].lastname.toLocaleLowerCase( this.locales )
			) {
				return this.data[index];
			}
		}

		return null;
	}

	/**
	 * Stores the given recordset in memory.
	 *
	 * If a recordset with same firstname and lastname was stored before
	 * the old data will be dismissed.
	 *
	 * @param	{object}	recordData
	 * @param	{string}	recordData.firstname
	 * @param	{string}	recordData.lastname
	 * @param	{string}	recordData.attending
	 *
	 * @returns	{object}
	 * @throws
	 */
	saveItem( recordData ) {
		assert( recordData != null && typeof recordData === "object",
			`Invalid type of argument "recordData" (${typeof recordData})` );
		Object.keys( recordData ).forEach( key => {
			if ( [ "firstname", "lastname", "attending" ].includes( key ) ) {
				assert( typeof recordData[key] === "string" && recordData[key] !== "",
					`Invalid argument "recordData.${key}" (${recordData[key]})` );
			} else {
				throw new Error( `Unknown argument "recordData.${key}" (${recordData[key]})` );
			}
		} );

		const oldItem = this.findItem( { firstname: recordData.firstname, lastname: recordData.lastname } );

		if ( oldItem == null ) {
			const newID = this.data.reduce( ( id, record ) => Math.max( id, record.id ), 0 ) + 1;
			const newItem = { ...recordData, id: newID };
			this.data.push( newItem );
			return newItem;
		}

		for ( let index = 0; index < this.data.length; index++ ) {
			if ( this.data[index].id === oldItem.id ) {
				this.data[index] = { ...recordData, id: oldItem.id };
				return this.data[index];
			}
		}

		throw new Error( "Unexpectedly can't found old item any longer" );
	}

	/**
	 * Delivers a list of all currently stored recordsets.
	 *
	 * @returns	{object[]}
	 */
	listItems() {
		return this.data;
	}
}

module.exports = {
	getInstance: AttendeeStorage.getInstance,
};
