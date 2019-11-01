/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */

import React from "react";
import * as yup from "yup";

import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

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
		} )
		.required(),
} );
/* eslint-enable no-template-curly-in-string */

export default RegistrationItemAttending;

/**
 * Renders a component which contains elements so that the user
 * can determine if he/she is attending the conference or not.
 *
 * @param	{object}	props
 *
 * @returns	{object}	React component
 */
function RegistrationItemAttending( props ) {
	propsSchema.strict().validateSync( props );	// eslint-disable-line no-sync

	const { values, handleChange } = props.formikBag;

	return (
		<Grid item container direction="column" justify="center" alignItems="stretch">
			<Grid item xs={12}>
				<FormLabel component="legend">
					Are you attending the conference?
				</FormLabel>
			</Grid>
			<Grid item xs={12}>
				<RadioGroup
					aria-label="choose one"
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
