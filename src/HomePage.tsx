import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useEffect, useState, FC } from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { PrimaryButton } from './Styles';
import { QuestionList } from './QuestionList';
import { Page } from './Page';
import { PageTitle } from './PageTitle';
import { RouteComponentProps } from 'react-router-dom';
import {
  AppState,
  getUnansweredQuestionsActionCreator,
  getAllQuestionsActionCreator,
  getAnsweredQuestionsActionCreator,
} from './Store';
import { useAuth } from './Auth';
import {
  getUnansweredQuestions,
  getAnsweredQuestions,
  getAllQuestions,
  QuestionData,
} from './QuestionsData';
import arrowDown from './arrowDown.png';
import arrowUp from './arrowUp.png';

interface Props extends RouteComponentProps {
  getUnansweredQuestions: () => Promise<void>;
  questions: QuestionData[] | null;
  questionsLoading: boolean;
  getAllQuestions: () => Promise<void>;
  getAnsweredQuestions: () => Promise<void>;
}

export const HomePage: FC<Props> = ({
  history,
  questions,
  questionsLoading,
  getUnansweredQuestions,
  getAllQuestions,
  getAnsweredQuestions,
}) => {
  const [filterQuestionsMode, setFilterQuestionsMode] = useState('Unanswered');
  const [sortingQuestionsMode, setSortingQuestionsMode] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (questions == null || filterQuestionsMode === 'Unanswered') {
      getUnansweredQuestions();
    }
    if (filterQuestionsMode === 'Answered') {
      getAnsweredQuestions();
    }
    if (filterQuestionsMode === 'All') {
      getAllQuestions();
    }
  }, [filterQuestionsMode]);

  const handleAskQuestionClick = () => {
    history.push('/ask');
  };
  const handleClickOnSortingByDescTimeBtn = () => {
    questions?.sort(function (a, b) {
      if (a.title > b.title) {
        return 1;
      }
      if (a.title < b.title) {
        return -1;
      }
      // a должно быть равным b
      return 0;
    });
  };
  const handleClickOnSortingByAscTimeBtn = () => {
    questions?.sort(function (a, b) {
      return b.created.getDate() - a.created.getDate();
    });

    return questions;
  };
  const { isAuthenticated } = useAuth();

  return (
    <Page>
      <div
        css={css`
          margin: 50px auto 20px auto;
          padding: 30px 20px;
          max-width: 600px;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
          `}
        >
          {filterQuestionsMode === 'All' && (
            <PageTitle> All Questions </PageTitle>
          )}

          {filterQuestionsMode === 'Answered' && (
            <PageTitle> Answered Questions </PageTitle>
          )}

          {filterQuestionsMode === 'Unanswered' && (
            <PageTitle>Unanswered Questions </PageTitle>
          )}

          {isAuthenticated && (
            <PrimaryButton onClick={handleAskQuestionClick}>
              Ask a question
            </PrimaryButton>
          )}
        </div>
        <div>
          <div>
            <input
              type="radio"
              value="Unanswered"
              name="FilterQuestions"
              onClick={() => setFilterQuestionsMode('Unanswered')}
              defaultChecked
            />
            <input
              type="radio"
              value="Answered"
              name="FilterQuestions"
              onClick={() => setFilterQuestionsMode('Answered')}
            />
            <input
              type="radio"
              value="All"
              name="FilterQuestions"
              onClick={() => setFilterQuestionsMode('All')}
            />
            <button onClick={() => handleClickOnSortingByDescTimeBtn()}>
              <img src={arrowDown} alt="down arror" width="20" height="20" />
            </button>
            <button onClick={() => handleClickOnSortingByAscTimeBtn()}>
              <img src={arrowUp} alt="down arror" width="20" height="20" />
            </button>
          </div>
        </div>
        {questionsLoading ? (
          <div
            css={css`
              font-size: 16px;
              font-style: italic;
            `}
          >
            Loading
          </div>
        ) : (
          <QuestionList data={questions || []} />
        )}
      </div>
    </Page>
  );
};

const mapStateToProps = (store: AppState) => {
  return {
    questions: store.questions.unanswered,
    questionsLoading: store.questions.loading,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getUnansweredQuestions: () =>
      dispatch(getUnansweredQuestionsActionCreator()),
    getAllQuestions: () => dispatch(getAllQuestionsActionCreator()),
    getAnsweredQuestions: () => dispatch(getAnsweredQuestionsActionCreator()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
