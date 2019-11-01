/* eslint-disable max-lines-per-function */

import React from "react";
import ReactDOM from "react-dom";

import RegistrationItemButtons from "./RegistrationItemButtons";

const exampleFormikBag = {
	dirty:        false,
	isValid:      false,
	isSubmitting: false,
};

describe( "Component RegistrationItemButtons -", () => {
	describe( "when rendering", () => {
		it( "without properties - FAILS", () => {
			const div = document.createElement( "div" );
			expect( () => {
				ReactDOM.render( <RegistrationItemButtons />, div );
			} ).toThrowWithSuppressedOutput();
			ReactDOM.unmountComponentAtNode( div );
		} );

		it( "with valid properties - succeeds", () => {
			const div = document.createElement( "div" );
			expect( () => {
				ReactDOM.render( <RegistrationItemButtons formikBag={exampleFormikBag} />, div );
			} ).toSucceedWithoutMessages();
			ReactDOM.unmountComponentAtNode( div );
		} );

		it( "with invalid properties - FAILS", () => {
			const div = document.createElement( "div" );
			expect( () => {
				ReactDOM.render( <RegistrationItemButtons formikBag={{}} />, div );
			} ).toThrowWithSuppressedOutput();
			ReactDOM.unmountComponentAtNode( div );
		} );
	} );

	describe( "when rendering into snapshots", () => {
		it( "with valid properties - delivers expected result  (-> check snapshot)", () => {
			// eslint-disable-next-line quotes
			const testString = `<RegistrationItemButtons formikBag={exampleFormikBag} />`;
			const testElement = <RegistrationItemButtons formikBag={exampleFormikBag} />;
			const filename = "RegistrationItemButtons";

			return expect( testElement ).toAsyncMatchNamedHTMLSnapshot( filename, testString );
		} );
	} );
} );
