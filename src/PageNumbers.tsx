import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { AppState } from './Store';

interface Props {
  countOfPages: number;
}

export const PageNumbers: FC<Props> = ({ countOfPages }) => {
  return <Link to="/1">ЧИСЛО СТРАНИЦ: {countOfPages}</Link>;
};
const mapStateToProps = (store: AppState) => {
  return {
    countOfPages: store.questions.countOfPages,
  };
};
export default connect(mapStateToProps)(PageNumbers);
