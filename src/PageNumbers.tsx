/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppState } from './Store';

interface Props {
  countOfPages: number;
}

export const PageNumbers: FC<Props> = ({ countOfPages }) => {
  var arrayOfPages = new Array(countOfPages);

  for (let i = 0; i < arrayOfPages.length; i++) {
    arrayOfPages[i] = i;
  }

  return (
    <div
      css={css`
        align-items: center;
      `}
    >
      {arrayOfPages.map((n) => {
        return (
          <span
            key={n}
            css={css`
              padding: 5px;
              margin: 10px;
            `}
          >
            <NavLink activeStyle={{ color: 'red' }} to={`/${n + 1}`}>
              {n + 1}
            </NavLink>{' '}
          </span>
        );
      })}
    </div>
  );
};
const mapStateToProps = (store: AppState) => {
  return {
    countOfPages: store.questions.countOfPages,
  };
};
export default connect(mapStateToProps)(PageNumbers);
