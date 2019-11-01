/* eslint-disable max-lines-per-function */

import React from "react";
import ReactDOM from "react-dom";

import RegistrationItemAttending from "./RegistrationItemAttending";

const exampleFormikBag = {
	values:       { firstname: "", lastname: "", attending: "yes" },
	handleChange: () => null,
};

describe( "Component RegistrationItemAttending -", () => {
	describe( "when rendering", () => {
		it( "without properties - FAILS", () => {
			const div = document.createElement( "div" );
			expect( () => {
				ReactDOM.render( <RegistrationItemAttending />, div );
			} ).toThrowWithSuppressedOutput();
			ReactDOM.unmountComponentAtNode( div );
		} );

		it( "with valid properties - succeeds", () => {
			const div = document.createElement( "div" );
			expect( () => {
				ReactDOM.render( <RegistrationItemAttending formikBag={exampleFormikBag} />, div );
			} ).toSucceedWithoutMessages();
			ReactDOM.unmountComponentAtNode( div );
		} );

		it( "with invalid properties - FAILS", () => {
			const div = document.createElement( "div" );
			expect( () => {
				ReactDOM.render( <RegistrationItemAttending formikBag={{}} />, div );
			} ).toThrowWithSuppressedOutput();
			ReactDOM.unmountComponentAtNode( div );
		} );
	} );

	describe( "when rendering into snapshots", () => {
		it( "with valid properties - delivers expected result  (-> check snapshot)", () => {
			// eslint-disable-next-line quotes
			const testString = `<RegistrationItemAttending formikBag={exampleFormikBag} />`;
			const testElement = <RegistrationItemAttending formikBag={exampleFormikBag} />;
			const filename = "RegistrationItemAttending";

			return expect( testElement ).toAsyncMatchNamedHTMLSnapshot( filename, testString );
		} );
	} );
} );
