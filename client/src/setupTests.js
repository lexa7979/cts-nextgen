
import React from "react";
import ReactDOMServer from "react-dom/server";

import MyMatchers from "@lexa79/jest-matchers";

// Avoid problems when testing Material UI components:
React.useLayoutEffect = React.useEffect;

// Add some useful matchers to Jest:
MyMatchers.connectRenderer( ReactDOMServer );
expect.extend( MyMatchers );
