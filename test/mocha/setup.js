import { assert } from 'chai';
import * as enzyme from 'enzyme';
var React = require('react/addons');

require.extensions['.css'] = function() {return null;}; // allow to ignore css required by react-fa during test

global.assert = assert;
global.TestUtils = React.addons.TestUtils;
global.React = React;
global.enzyme = enzyme;
