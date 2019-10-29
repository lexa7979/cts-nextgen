/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */

import React from "react";
import * as yup from "yup";

import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

const propsSchema = yup.object( {
	formikBag: yup.object().required(),
} );

export default RegistrationItemAttending;

/**
 * @param	{object}	props
 *
 * @returns	{object}	React component
 */
function RegistrationItemAttending( props ) {
	propsSchema.strict().validate( props );

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
