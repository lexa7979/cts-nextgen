/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */

import React from "react";
import * as yup from "yup";

import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import { green } from "@material-ui/core/colors";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";

/* eslint-disable no-template-curly-in-string */
const propsSchema = yup.object( {
	formikBag: yup.object()
		.shape( {
			status:    yup.object()
				.test(
					"is-object-or-undef",
					"${path}: object expected",
					value => value == null || value instanceof Object
				),
			setStatus: yup.object().required()
				.test(
					"is-function",
					"${path}: callback expected",
					value => typeof value === "function"
				),
		} )
		.required(),
} );
/* eslint-enable no-template-curly-in-string */

const userdefinedStyles = makeStyles( theme => ( {
	success: {
		backgroundColor: green[600],
	},
	error: {
		backgroundColor: theme.palette.error.dark,
	},
	icon: {
		fontSize: 20,
	},
	iconVariant: {
		fontSize:    20,
		opacity:     0.9,
		marginRight: theme.spacing( 1 ),
	},
	message: {
		display:    "flex",
		alignItems: "center",
	},
} ) );

export default RegistrationItemResponse;

/**
 * Renders a component which shows a response message,
 * e.g. after a register form was submitted.
 *
 * @param	{object}	props
 *
 * @returns	{object}	React component
 */
function RegistrationItemResponse( props ) {
	propsSchema.strict().validateSync( props );	// eslint-disable-line no-sync

	const { status, setStatus } = props.formikBag;
	if ( !status || !status.lastSubmit ) {
		return null;
	}

	const { message, success, closed } = status.lastSubmit;
	if ( closed ) {
		return null;
	}

	const Icon = success ? CheckCircleIcon : ErrorIcon;
	const classes = userdefinedStyles();

	const handleSnackbarClose = () => {	// eslint-disable-line require-jsdoc
		setStatus( { ...status, lastSubmit: { ...status.lastSubmit, closed: true } } );
	};

	return (
		<Snackbar
			anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
			open
			autoHideDuration={6000}
			onClose={handleSnackbarClose}
		>
			<SnackbarContent
				className={success ? classes.success : classes.error }
				aria-describedby="response-snackbar"
				message={
					<span id="response-snackbar" className={classes.message}>
						<Icon className={classes.iconVariant}/>
						{message}
					</span>
				}
				action={[
					<IconButton key="close" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
						<CloseIcon className={classes.icon}/>
					</IconButton>,
				]}
			/>
		</Snackbar>
	);
}
