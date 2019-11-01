/* eslint-disable max-lines-per-function */

import React from "react";
import ReactDOM from "react-dom";

import RegistrationItemName from "./RegistrationItemName";

const exampleFormikBag = {
	values:       { firstname: "", lastname: "", attending: "" },
	handleChange: () => null,
	errors:       {},
};

describe( "Component RegistrationItemName -", () => {
	describe( "when rendering", () => {
		it( "without properties - FAILS", () => {
			const div = document.createElement( "div" );
			expect( () => {
				ReactDOM.render( <RegistrationItemName />, div );
			} ).toThrowWithSuppressedOutput();
			ReactDOM.unmountComponentAtNode( div );
		} );

		it( "with valid properties - succeeds", () => {
			const div = document.createElement( "div" );
			expect( () => {
				ReactDOM.render( <RegistrationItemName formikBag={exampleFormikBag} />, div );
			} ).toSucceedWithoutMessages();
			ReactDOM.unmountComponentAtNode( div );
		} );

		it( "with invalid properties - FAILS", () => {
			const div = document.createElement( "div" );
			expect( () => {
				ReactDOM.render( <RegistrationItemName formikBag={{}} />, div );
			} ).toThrowWithSuppressedOutput();
			ReactDOM.unmountComponentAtNode( div );
		} );
	} );

	describe( "when rendering into snapshots", () => {
		it( "with valid properties - delivers expected result  (-> check snapshot)", () => {
			// eslint-disable-next-line quotes
			const testString = `<RegistrationItemName formikBag={exampleFormikBag} />`;
			const testElement = <RegistrationItemName formikBag={exampleFormikBag} />;
			const filename = "RegistrationItemName";

			return expect( testElement ).toAsyncMatchNamedHTMLSnapshot( filename, testString );
		} );
	} );
} );
