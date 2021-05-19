import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Loader from '../components/loader';

configure({ adapter: new Adapter() });
jest.mock('react-dom');

const div = global.document.createElement('div');

describe("Loader Component", () => {
    it('renders without crashing', () => {
        ReactDOM.render(<Router><Loader /></Router>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});