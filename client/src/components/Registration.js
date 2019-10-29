/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */

import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import Grid from "@material-ui/core/Grid";

import RegistrationItemResponse from "./RegistrationItemResponse";
import RegistrationItemName from "./RegistrationItemName";
import RegistrationItemAttending from "./RegistrationItemAttending";
import RegistrationItemButtons from "./RegistrationItemButtons";
import { submitRegistration } from "./RegistrationSubmit";

const propsSchema = yup.object( {
	serverState: yup.string().required()
		.lowercase()
		.oneOf( [ "up", "down" ] ),
} );

export default Registration;

/**
 * Renders a component which lets the user input data
 * to register for the conference.
 *
 * @param	{object}	props
 *
 * @returns	{object}
 *		React component
 */
function Registration( props ) {
	propsSchema.strict().validateSync( props );	// eslint-disable-line no-sync

	return props.serverState === "up"
		? composeForm()
		: composeDisabledForm();
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
			onSubmit={submitRegistration}
		>
			{composeFormikFields}
		</Formik>
	</div>;
}

/**
 * @param	{object}	formikBag
 *
 * @returns	{object}
 *		React component
 */
function composeFormikFields( formikBag ) {
	return (
		<Form id="registerForm">
			<Grid
				container
				direction="column"
				justify="flex-start"
				alignItems="stretch"
				spacing={2}
			>
				<RegistrationItemResponse formikBag={formikBag}/>
				<RegistrationItemName formikBag={formikBag}/>
				<RegistrationItemAttending formikBag={formikBag}/>
				<RegistrationItemButtons formikBag={formikBag}/>
			</Grid>
		</Form>
	);
}

/**
 * @returns	{object}
 */
function composeDisabledForm() {
	return <div>
		Register form is temporary disabled because of missing connection to the database server
	</div>;
}
