import 'core-js/stable';
import 'regenerator-runtime';
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import theme from './modules/app/styles/theme';

const renderWithTheme = (target) => {
  return render(
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>{target}</ThemeProvider>
    </>,
  );
};

global.renderWithTheme = renderWithTheme;
