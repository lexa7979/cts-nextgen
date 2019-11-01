/* eslint-disable no-use-before-define */

export {
	submitRegistration,
};

/**
 * Helper function which takes the input data of the register form
 * and tries to post it to the database server.
 *
 * @param	{object}	inputValues
 * @param	{object}	formikBag
 */
async function submitRegistration( inputValues, formikBag ) {
	const { status, setStatus, resetForm, setSubmitting } = formikBag;

	const saveError = await checkAndSaveAttendeeOnServer( inputValues );

	if ( saveError == null ) {
		resetForm( { status: { lastSubmit: { success: true, message: "Registration successful" } } } );
	} else {
		setStatus( { ...status, lastSubmit: { success: false, message: saveError } } );
	}

	setSubmitting( false );
}

/**
 * @param	{object}	attendeeData
 *
 * @returns	{null|string}
 *		Null if successful; or
 *		Error-message in case of problems.
 */
async function checkAndSaveAttendeeOnServer( attendeeData ) {
	const checkResult = await checkAttendeeOnServer( attendeeData );
	if ( checkResult !== false ) {
		return checkResult === true
			? "The given person was already registered, before"
			: checkResult;
	}

	const saveResult = await saveAttendeeOnServer( attendeeData );
	return saveResult;
}

/**
 * @param	{object}	attendeeData
 *
 * @returns	{boolean|string}
 *		True (or false) iff a registration for the given person
 *			was (not) found on the server; or
 *		Error-message in case of problems.
 */
async function checkAttendeeOnServer( attendeeData ) {
	const task = "Checking the registration on the server";

	try {
		const response = await fetch( `/registration/${attendeeData.firstname}/${attendeeData.lastname}` );
		if ( response.status !== 200 ) {
			return `${task} failed`;
		}

		const data = await response.json();
		return data.success;
	} catch ( err ) {
		return `${task} failed with error ${err.message}`;
	}
}

/**
 * @param	{object}	attendeeData
 *
 * @returns	{null|string}
 *		Null if successful; or
 *		Error-message in case of problems.
 */
async function saveAttendeeOnServer( attendeeData ) {
	const task = "Saving the registration on the server";

	try {
		const response = await fetch(
			"/registration",
			{
				method:  "PUT",
				body:    JSON.stringify( attendeeData ),
				headers: { "Content-Type": "application/json" },
			}
		);
		if ( response.status !== 200 ) {
			return `${task} failed with code ${response.status}`;
		}

		const data = await response.json();
		return data.success ? null : `${task} failed`;
	} catch ( err ) {
		return `${task} failed with error ${err.message}`;
	}
}
