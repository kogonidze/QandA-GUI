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
  sortQuestionsByNameAscCreator,
  sortQuestionsByNameDescCreator,
  sortQuestionsByDateDescCreator,
  sortQuestionsByDateAscCreator,
  setCountOfPagesActionCreator,
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
  countOfPages: number;
  getAllQuestions: () => Promise<void>;
  getAnsweredQuestions: () => Promise<void>;
  sortQuestionsByNameDesc: () => Promise<void>;
  sortQuestionsByNameAsc: () => Promise<void>;
  sortQuestionsByDateDesc: () => Promise<void>;
  sortQuestionsByDateAsc: () => Promise<void>;
  setCountOfPagesAction: (countOfPages: number) => Promise<void>;
}

export const HomePage: FC<Props> = ({
  history,
  questions,
  questionsLoading,
  countOfPages,
  getUnansweredQuestions,
  getAllQuestions,
  getAnsweredQuestions,
  sortQuestionsByNameDesc,
  sortQuestionsByNameAsc,
  sortQuestionsByDateDesc,
  sortQuestionsByDateAsc,
  setCountOfPagesAction,
}) => {
  const [filterQuestionsMode, setFilterQuestionsMode] = useState('Unanswered');
  const [sortingQuestionsMode, setSortingQuestionsMode] = useState('DESC');

  useEffect(() => {
    if (questions == null && filterQuestionsMode === 'Unanswered') {
      getUnansweredQuestions();
    }
    if (filterQuestionsMode === 'Unanswered') {
      getUnansweredQuestions();
    }

    if (filterQuestionsMode === 'Answered') {
      getAnsweredQuestions();
    }
    if (filterQuestionsMode === 'All') {
      getAllQuestions();
    }
    // if (filterQuestionsMode === 'DESC') {
    //   sortQuestionsByDateDesc();
    // }
  }, [filterQuestionsMode]);

  const handleAskQuestionClick = () => {
    history.push('/ask');
  };
  const getCountOfPages = (questionsPerPage: number): number => {
    if (questions != null) {
      var questionsCount = questions?.length;
      return Math.ceil(questionsCount / questionsPerPage);
    }

    return 0;
  };
  const handleSelectOfCountQuestionsPerPage = (
    e: ChangeEvent<HTMLSelectElement>,
  ) => {
    if (e.currentTarget.value === 'Все') {
      setCountOfPagesAction(1);
    } else if (e.currentTarget.value === 'По 5') {
      setCountOfPagesAction(getCountOfPages(5));
    } else if (e.currentTarget.value === 'По 10') {
      setCountOfPagesAction(getCountOfPages(10));
    } else if (e.currentTarget.value === 'По 20') {
      setCountOfPagesAction(getCountOfPages(20));
    } else if (e.currentTarget.value === 'По 50') {
      setCountOfPagesAction(getCountOfPages(50));
    }

    //setCountOfPagesAction(countOfPages);
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
            <button onClick={() => sortQuestionsByNameDesc()}>
              <img src={arrowDown} alt="down arror" width="20" height="20" />
            </button>
            <button onClick={() => sortQuestionsByNameAsc()}>
              <img src={arrowUp} alt="down arror" width="20" height="20" />
            </button>
            <button onClick={() => sortQuestionsByDateDesc()}>
              <img src={arrowDown} alt="down arror" width="20" height="20" />
            </button>
            <button onClick={() => sortQuestionsByDateAsc()}>
              <img src={arrowUp} alt="down arror" width="20" height="20" />
            </button>
            <select onChange={handleSelectOfCountQuestionsPerPage}>
              <option>Все</option>
              <option>По 5</option>
              <option>По 10</option>
              <option>По 20</option>
              <option>По 50</option>
            </select>
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
        <p>$"{countOfPages}"</p>
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
    sortQuestionsByNameDesc: () => dispatch(sortQuestionsByNameDescCreator()),
    sortQuestionsByNameAsc: () => dispatch(sortQuestionsByNameAscCreator()),
    sortQuestionsByDateDesc: () => dispatch(sortQuestionsByDateDescCreator()),
    sortQuestionsByDateAsc: () => dispatch(sortQuestionsByDateAscCreator()),
    setCountOfPagesAction: (countOfPages: number) =>
      dispatch(setCountOfPagesActionCreator(countOfPages)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
