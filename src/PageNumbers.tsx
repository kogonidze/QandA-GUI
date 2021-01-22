import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
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
    <div>
      {arrayOfPages.map((n) => {
        return (
          <span>
            <Link to={`/${n + 1}`}>{n + 1}</Link>{' '}
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
