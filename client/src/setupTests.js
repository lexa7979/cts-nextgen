
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import React from "react";
// import ReactDOMServer from "react-dom/server";

import MyMatchers from "@lexa79/jest-matchers";

Enzyme.configure( { adapter: new Adapter() } );

// Avoid problems when testing Material UI components:
React.useLayoutEffect = React.useEffect;

// Add some useful matchers to Jest:
// MyMatchers.connectRenderer( ReactDOMServer );
MyMatchers.connectRenderer( Enzyme );
expect.extend( MyMatchers );
