/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */

import React from "react";
import * as yup from "yup";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

/* eslint-disable no-template-curly-in-string */
const propsSchema = yup.object( {
	formikBag: yup.object()
		.shape( {
			values:	      yup.object()
				.required()
				.test( "is-object", "${path}: object expected", value => value instanceof Object ),
			handleChange: yup.object()
				.required()
				.test( "is-function", "${path}: callback expected", value => typeof value === "function" ),
			errors:       yup.object()
				.required()
				.test( "is-object", "${path}: object expected", value => value instanceof Object ),
		} )
		.required(),
} );
/* eslint-enable no-template-curly-in-string */

export default RegistrationItemName;

/**
 * Renders a component which contains element to let
 * the user input his/her name.
 *
 * @param	{object}	props
 *
 * @returns	{object}	React component
 */
function RegistrationItemName( props ) {
	propsSchema.strict().validateSync( props );	// eslint-disable-line no-sync

	const { values, handleChange, errors } = props.formikBag;

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
