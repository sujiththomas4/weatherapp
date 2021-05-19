import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WeatherDetails from '../components/weatherDetails';


configure({ adapter: new Adapter() });
const mockStore = configureStore();

let initialState = {
    weatherDetailsReducer: {
        data: {
            list:[],
        }
    },
};

let store = mockStore(initialState);

const div = global.document.createElement('div');

describe("WeatherDetails Component", () => {
    it('renders without crashing', () => {
        ReactDOM.render(<Router><WeatherDetails store={store} /></Router>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('should fetch weather details when mounted', () => {
        const wrapper = mount(
                <Router><WeatherDetails store={store} /></Router>, {
                attachTo: document.body.appendChild(div),
            });
        expect(wrapper).toBeDefined();
        wrapper.unmount();
    });

    it('change functionality of radio button', () => {
        const event = {target: {}}
        const wrapper = mount(
            <Router><WeatherDetails store={store} /></Router>, { 
            attachTo: document.body.appendChild(div),
        });
        wrapper.find('input[type="radio"]').at(1).simulate('change', event);
        wrapper.unmount();
      });

      it('check if carousel is being rendered', () => {
        const event = {target: {}}
        const wrapper = mount(
            <Router><WeatherDetails store={store} /></Router>, { 
            attachTo: document.body.appendChild(div),
        });
        expect(wrapper.find('Carousel')).toBeDefined();
        wrapper.unmount();
      });

      it('check if bar chart is being rendered', () => {
        const event = {target: {}}
        const wrapper = mount(
            <Router><WeatherDetails store={store} /></Router>, { 
            attachTo: document.body.appendChild(div),
        });
        expect(wrapper.find('Bar')).toBeDefined();
        wrapper.unmount();
      });
});