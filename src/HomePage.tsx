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
import { AppState, getUnansweredQuestionsActionCreator } from './Store';
import { useAuth } from './Auth';
import {
  getUnansweredQuestions,
  getAnsweredQuestions,
  getAllQuestions,
  QuestionData,
} from './QuestionsData';
import { idText } from 'typescript';

export const HomePage: FC<RouteComponentProps> = ({ history }) => {
  const [questions, setQuestions] = useState<QuestionData[] | null>(null);
  const [questionsLoading, setQuestionsLoading] = useState(true);
  const [filterQuestionsMode, setFilterQuestionsMode] = useState('Unanswered');

  useEffect(() => {
    let cancelled = false;
    const doGetQuestions = async () => {
      if (filterQuestionsMode === 'Unanswered') {
        const unansweredQuestions = await getUnansweredQuestions();
        if (!cancelled) {
          setQuestions(unansweredQuestions);
          setQuestionsLoading(false);
        }
      }
      if (filterQuestionsMode === 'Answered') {
        const answeredQuestions = await getAnsweredQuestions();
        if (!cancelled) {
          setQuestions(answeredQuestions);
          setQuestionsLoading(false);
        }
      }
      if (filterQuestionsMode === 'All') {
        const allQuestions = await getAllQuestions();
        if (!cancelled) {
          setQuestions(allQuestions);
          setQuestionsLoading(false);
        }
      }
    };

    doGetQuestions();
    return () => {
      cancelled = true;
    };
  }, [filterQuestionsMode]);

  const handleAskQuestionClick = () => {
    history.push('/ask');
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
          <div>
            <input
              type="radio"
              value="Unanswered"
              name="FilterQuestions"
              onClick={() => setFilterQuestionsMode('Unanswered')}
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
          </div>
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
