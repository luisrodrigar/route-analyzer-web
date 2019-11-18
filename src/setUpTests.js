import { configure } from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';
import 'jest-enzyme';
// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
import '@testing-library/react/cleanup-after-each';
// this adds jest-dom's custom assertions
import 'jest-dom/extend-expect';

configure({ adapter: new Adapter() });