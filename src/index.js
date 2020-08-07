import 'fontsource-roboto';
import 'core-js/stable';
import 'regenerator-runtime';
import React from 'react';
import { render } from 'react-dom';
import App from './modules/app/App';

document.title = 'Card Memory';
render(<App />, document.getElementById('root'));
