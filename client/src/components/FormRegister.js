/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */

import React from "react";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const propsSchema = yup.object( {
	serverState: yup.string().required()
		.lowercase()
		.oneOf( [ "up", "down" ] ),
} );

export default FormRegister;

/**
 * Renders a component which lets the user input data
 * to register for the conference.
 *
 * @param	{object}	props
 *
 * @returns	{object}
 *		React component
 */
function FormRegister( props ) {
	propsSchema.strict().validateSync( props );	// eslint-disable-line no-sync

	return props.serverState === "up"
		? composeForm()
		: composeDisabledForm();
}

/**
 * @returns	{object}
 */
function composeDisabledForm() {
	return <div>
		Register form is temporary disabled because of missing connection to the database server
	</div>;
}

/* eslint-disable newline-per-chained-call */
/**
 * Object schema used for default values and validation of the input form
 */
const formInputSchema = yup.object( {
	firstname: yup.string().default( "" ).trim()
		.min( 1, "Enter your firstname, here" ),
	lastname:  yup.string().default( "" ).trim()
		.min( 1, "Enter your lastname, here" ),
	attending: yup.string().default( "" )
		.oneOf( [ "yes", "no", "maybe" ], "Choose one of the options, here" ),
} );
/* eslint-enable newline-per-chained-call */

/**
 * @returns	{object}
 */
function composeForm() {
	return <div>
		<h1>Register for the conference</h1>
		<Formik
			initialValues={formInputSchema.default()}
			validationSchema={formInputSchema}
			validateOnMount={true}
			onSubmit={submitFormik}
		>
			{composeFormikFields}
		</Formik>
	</div>;
}

/**
 * @param	{object}	inputValues
 * @param	{object}	formikBag
 * @param	{object}	formikBag.setStatus
 * @param	{function}	formikBag.resetForm
 * @param	{function}	formikBag.setSubmitting
 */
async function submitFormik( inputValues, { status, setStatus, resetForm, setSubmitting } ) {
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

/**
 * @param	{object}	formikBag
 * @param	{boolean}	formikBag.dirty
 * @param	{boolean}	formikBag.isValid
 * @param	{boolean}	formikBag.isSubmitting
 *
 * @returns	{object}
 *		React component
 */
function composeFormikFields( { status, dirty, isValid, isSubmitting } ) {
	return <Form id="registerForm">
		<div>{status && status.lastSubmit && status.lastSubmit.message}</div>
		<div>
			<label htmlFor="firstname">Firstname:</label>
			<Field name="firstname" id="firstname" />
			<ErrorMessage name="firstname" component="div" />
		</div>
		<div>
			<label htmlFor="lastname">Lastname:</label>
			<Field name="lastname" id="lastname" />
			<ErrorMessage name="lastname" component="div" />
		</div>
		<div>
			<label htmlFor="attending">Are you attending the conference?</label>
			<Field type="radio" id="attendingYes" name="attending" value="yes"/>
			<label htmlFor="attendingYes">Yes</label>
			<Field type="radio" id="attendingNo" name="attending" value="no"/>
			<label htmlFor="attendingNo">No</label>
			<Field type="radio" id="attendingMaybe" name="attending" value="maybe"/>
			<label htmlFor="attendingMaybe">Maybe</label>
			<ErrorMessage name="attending" component="div" />
		</div>
		<div>
			<button type="submit" disabled={!dirty || !isValid || isSubmitting}>Submit</button>{" "}
			<button type="reset" disabled={!dirty}>Reset</button>
		</div>
	</Form>;
}
