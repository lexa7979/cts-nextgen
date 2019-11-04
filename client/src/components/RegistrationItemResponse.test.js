/* eslint-disable max-lines-per-function */

import React from "react";
import ReactDOM from "react-dom";

import RegistrationItemResponse from "./RegistrationItemResponse";

const initialFormikBag = {
	status:    {},
	setStatus: () => null,
};

const submitFormikBag = {
	status:    { lastSubmit: { success: true, message: "Test submit was successful" } },
	setStatus: () => null,
};

const failureFormikBag = {
	status:    { lastSubmit: { success: false, message: "Test submit failed" } },
	setStatus: () => null,
};

describe( "Component RegistrationItemResponse -", () => {
	describe( "when rendering", () => {
		it( "without properties - FAILS", () => {
			const div = document.createElement( "div" );
			expect( () => {
				ReactDOM.render( <RegistrationItemResponse />, div );
			} ).toThrowWithSuppressedOutput();
			ReactDOM.unmountComponentAtNode( div );
		} );

		it( "with valid properties - succeeds", () => {
			const div = document.createElement( "div" );
			expect( () => {
				ReactDOM.render( <RegistrationItemResponse formikBag={initialFormikBag} />, div );
			} ).toSucceedWithoutMessages();
			ReactDOM.unmountComponentAtNode( div );
		} );

		it( "with invalid properties - FAILS", () => {
			const div = document.createElement( "div" );
			expect( () => {
				ReactDOM.render( <RegistrationItemResponse formikBag={{}} />, div );
			} ).toThrowWithSuppressedOutput();
			ReactDOM.unmountComponentAtNode( div );
		} );
	} );

	describe( "when rendering into snapshots", () => {
		it( "with valid properties - delivers expected result  (-> check snapshot)", () => {
			// eslint-disable-next-line quotes
			const testString = `<RegistrationItemName formikBag={exampleFormikBag} />`;
			const testElement = <RegistrationItemResponse formikBag={initialFormikBag} />;
			const filename = "RegistrationItemName-initial";

			return expect( testElement ).toAsyncMatchNamedHTMLSnapshot( filename, testString );
		} );

		it( "with valid properties - delivers expected result  (-> check snapshot)", () => {
			// eslint-disable-next-line quotes
			const testString = `<RegistrationItemName formikBag={exampleFormikBag} />`;
			const testElement = <RegistrationItemResponse formikBag={submitFormikBag} />;
			const filename = "RegistrationItemName-submit";

			return expect( testElement ).toAsyncMatchNamedHTMLSnapshot( filename, testString );
		} );

		it( "with valid properties - delivers expected result  (-> check snapshot)", () => {
			// eslint-disable-next-line quotes
			const testString = `<RegistrationItemName formikBag={exampleFormikBag} />`;
			const testElement = <RegistrationItemResponse formikBag={failureFormikBag} />;
			const filename = "RegistrationItemName-failure";

			return expect( testElement ).toAsyncMatchNamedHTMLSnapshot( filename, testString );
		} );
	} );
} );
