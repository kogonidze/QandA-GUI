import React from 'react';
import { Header } from './Header';
import { HomePage } from './HomePage';

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { fontFamily, fontSize, gray2 } from './Styles';

const App: React.FC = () => {
  return (
    <div
      css={css`
        font-family: ${fontFamily};
        font-size: ${fontSize};
        color: ${gray2};
      `}
    >
      <Header />
      <HomePage />
    </div>
  );
};

export default App;
