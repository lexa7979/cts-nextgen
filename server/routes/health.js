/**
 * Adds a request handler to the given Express.js app
 * which makes it easy for the client to check if the server is available.
 *
 * @this	{Application}
 *		Expected to be called in scope of Express.js app
 *
 * @param	{string}	basepath
 */
function handleAppRequest( basepath ) {
	this.get( basepath, ( req, res ) => {
		res.status( 200 ).send( "OK" );
	} );
}

module.exports = {
	handleAppRequest,
};
