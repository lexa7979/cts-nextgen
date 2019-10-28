/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */

import React from "react";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default FormRegister;

const propsSchema = yup.object( {
	serverState: yup.string().required()
		.lowercase()
		.oneOf( [ "up", "down" ] ),
} );

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
 * @param	{object}	values
 * @param	{object}	formikBag
 * @param	{function}	formikBag.setSubmitting
 * @param	{function}	formikBag.resetForm
 */
function submitFormik( values, { setSubmitting, resetForm } ) {
	// eslint-disable-next-line no-console
	console.log( values );
	resetForm();
	setSubmitting( false );
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
function composeFormikFields( { dirty, isValid, isSubmitting } ) {
	return <Form id="registerForm">
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
		<button type="submit" disabled={!dirty || !isValid || isSubmitting}>Submit</button>
	</Form>;
}
