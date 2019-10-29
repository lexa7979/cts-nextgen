/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */

import React from "react";
import * as yup from "yup";

import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

const propsSchema = yup.object( {
	formikBag: yup.object().required(),
} );

export default RegistrationItemResponse;

/**
 * @param	{object}	props
 *
 * @returns	{object}	React component
 */
function RegistrationItemResponse( props ) {
	propsSchema.strict().validate( props );

	const { status, setStatus } = props.formikBag;

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
