/* eslint-disable max-lines-per-function */

import React from "react";
import ReactDOM from "react-dom";

import Registration from "./Registration";

describe( "Component Registration -", () => {
	describe( "when rendering", () => {
		it( "without properties - FAILS", () => {
			const div = document.createElement( "div" );
			expect( () => {
				ReactDOM.render( <Registration />, div );
			} ).toThrowWithSuppressedOutput();
			ReactDOM.unmountComponentAtNode( div );
		} );

		it( "with valid properties - succeeds", () => {
			const div = document.createElement( "div" );
			expect( () => {
				ReactDOM.render( <Registration serverState="up" />, div );
			} ).toSucceedWithoutMessages();
			ReactDOM.unmountComponentAtNode( div );
		} );

		it( "with invalid properties - FAILS", () => {
			const div = document.createElement( "div" );
			expect( () => {
				ReactDOM.render( <Registration serverState="dummy" />, div );
			} ).toThrowWithSuppressedOutput();
			ReactDOM.unmountComponentAtNode( div );
		} );
	} );

	describe( "when rendering into snapshots", () => {
		it( "with server-state \"up\" - delivers expected result  (-> check snapshot)", () => {
			// eslint-disable-next-line quotes
			const testString = `<Registration serverState="up" />`;
			const testElement = <Registration serverState="up" />;
			const filename = "Registration-server-up";

			return expect( testElement ).toAsyncMatchNamedHTMLSnapshot( filename, testString );
		} );

		it( "with server-state \"down\" - delivers expected result  (->check snapshot)", () => {
			// eslint-disable-next-line quotes
			const testString = `<Registration serverState="down" />`;
			const testElement = <Registration serverState="down" />;
			const filename = "Registration-server-down";

			return expect( testElement ).toAsyncMatchNamedHTMLSnapshot( filename, testString );
		} );
	} );
} );
