/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */

import React from "react";
import * as yup from "yup";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const propsSchema = yup.object( {
	formikBag: yup.object().required(),
} );

export default RegistrationItemButtons;

/**
 * @param	{object}	props
 *
 * @returns	{object}	React component
 */
function RegistrationItemButtons( props ) {
	propsSchema.strict().validate( props );

	const { dirty, isValid, isSubmitting } = props.formikBag;

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
