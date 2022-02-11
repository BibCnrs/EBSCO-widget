import 'babel-polyfill';
import { assert } from 'chai';
import Enzyme, * as enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

var React = require('react');

Enzyme.configure({ adapter: new Adapter() });
require.extensions['.css'] = function() {
    return null;
}; // allow to ignore css required by react-fa during test

global.assert = assert;
global.React = React;
global.enzyme = enzyme;
global.window.__SERVER_URL__ = 'http://localhost:3000/ebsco';
