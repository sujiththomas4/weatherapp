import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

jest.mock('react-dom');

it('App renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
