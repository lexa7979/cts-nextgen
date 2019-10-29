/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */

import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

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
 *
 * @returns	{object}
 *		React component
 */
function composeFormikFields( formikBag ) {
	return <Form id="registerForm">
		<Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={2}>
			{composeFormResponseItem( formikBag )}
			{composeNameInputItem( formikBag )}
			{composeAttendingSelectItem( formikBag )}
			{composeFormButtons( formikBag )}
		</Grid>
	</Form>;
}

/**
 * @param	{object}	formikBag
 *
 * @returns	{object}	React component
 */
function composeFormResponseItem( formikBag ) {
	const { status, setStatus } = formikBag;

	const message = status && status.lastSubmit && !status.lastSubmit.showed ? status.lastSubmit.message : null;

	if ( message ) {
		// setStatus( { ...status, lastSubmit: { ...status.lastSubmit, showed: true } } );
		// const success = status.lastSubmit.success;

		return (
			<Snackbar
				// style={{ backgroundColor: success ?  }}
				anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
				open
				autoHideDuration={3000}
			>
				<SnackbarContent
					message={message}
					role="alertdialog"
				/>
			</Snackbar>
		);
	}

	return null;
}

/**
 * @param	{object}	formikBag
 *
 * @returns	{object}	React component
 */
function composeNameInputItem( formikBag ) {
	const { values, handleChange, errors } = formikBag;

	return (
		<Grid item container direction="row" spacing={1}>
			<Grid item xs={12} sm={6}>
				<TextField
					id="firstname"
					value={values.firstname}
					label="Firstname"
					onChange={handleChange}
					margin="normal"
					variant="outlined"
					fullWidth
					required
					error={Boolean( errors.firstname )}
					helperText={errors.firstname}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextField
					id="lastname"
					value={values.lastname}
					label="Lastname"
					onChange={handleChange}
					margin="normal"
					variant="outlined"
					fullWidth
					required
					error={Boolean( errors.lastname )}
					helperText={errors.lastname}
				/>
			</Grid>
		</Grid>
	);
}

/**
 * @param	{object}	formikBag
 *
 * @returns	{object}
 * 		React component
 */
function composeAttendingSelectItem( formikBag ) {
	const { values, handleChange } = formikBag;

	return (
		<Grid item container direction="column" justify="center" alignItems="stretch">
			<Grid item xs={12}>
				<FormLabel component="legend">
					Are you attending the conference?
				</FormLabel>
			</Grid>
			<Grid item xs={12}>
				<RadioGroup
					aria-label="position"
					name="attending"
					value={values.attending}
					onChange={handleChange}
					row
				>
					<FormControlLabel
						value="yes"
						label="Yes"
						labelPlacement="bottom"
						control={<Radio color="primary"/>}
					/>
					<FormControlLabel
						value="no"
						label="No"
						labelPlacement="bottom"
						control={<Radio color="primary"/>}
					/>
					<FormControlLabel
						value="maybe"
						label="Maybe"
						labelPlacement="bottom"
						control={<Radio color="primary"/>}
					/>
				</RadioGroup>
			</Grid>
		</Grid>
	);
}

/**
 * @param	{object}	formikBag
 *
 * @returns	{object}
 * 		React component
 */
function composeFormButtons( formikBag ) {
	const { dirty, isValid, isSubmitting } = formikBag;

	return (
		<Grid item container direction="row" justify="flex-end" spacing={2}>
			<Grid item>
				<Button type="submit" variant="contained" color="primary" disabled={!dirty || !isValid || isSubmitting}>
					Submit
				</Button>
			</Grid>
			<Grid item>
				<Button type="reset" variant="contained" disabled={!dirty}>
					Reset
				</Button>
			</Grid>
		</Grid>
	);
}