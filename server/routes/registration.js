const { getInstance } = require( "../services/AttendeeStorage" );

/**
 * Adds a request handler to the given Express.js app
 * which offers an easy API to register people attending to an event
 *
 * @this	{Application}
 *		Expected to be called in scope of Express.js app
 *
 * @param	{string}	basepath
 */
function handleAppRequest( basepath ) {
	const storage = getInstance();

	this.get( basepath, ( req, res ) => {
		const items = storage.listItems();
		res.status( 200 ).json( { success: true, count: items.length, items } );
	} );

	this.get( `${basepath}/:firstname/:lastname`, ( req, res ) => {
		const { firstname, lastname } = req.params;
		const item = storage.findItem( { firstname, lastname } );
		if ( item == null ) {
			res.status( 200 ).json( { success: false, code: "NOTFOUND" } );
		} else {
			res.status( 200 ).json( { success: true, item } );
		}
	} );

	this.put( basepath, ( req, res ) => {
		if (
			typeof req.body.firstname !== "string" || req.body.firstname === ""
			|| typeof req.body.lastname !== "string" || req.body.lastname === ""
			|| typeof req.body.attending !== "string" || req.body.attending === ""
		) {
			res.status( 400 );
			return;
		}

		try {
			const item = storage.saveItem( req.body );
			res.status( 200 ).json( { success: true, item } );
		} catch ( error ) {
			res.status( 500 ).send( error.message );
		}
	} );
}

module.exports = {
	handleAppRequest,
};
