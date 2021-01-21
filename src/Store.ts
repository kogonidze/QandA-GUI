import {
  QuestionData,
  getUnansweredQuestions,
  postQuestion,
  PostQuestionData,
  getAllQuestions,
  getAnsweredQuestions,
} from './QuestionsData';
import {
  Action,
  ActionCreator,
  Dispatch,
  Reducer,
  combineReducers,
  Store,
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { trace } from 'console';

interface QuestionsState {
  readonly loading: boolean;
  readonly unanswered: QuestionData[] | null;
  readonly countOfPages: number;
  readonly postedResult?: QuestionData;
}

export interface AppState {
  readonly questions: QuestionsState;
}

const initialQuestionState: QuestionsState = {
  loading: false,
  unanswered: null,
  countOfPages: 1,
};

interface GettingUnasnweredQuestionsAction
  extends Action<'GettingUnansweredQuestions'> {}

export interface GotUnansweredQuestionsAction
  extends Action<'GotUnansweredQuestions'> {
  questions: QuestionData[];
}

interface GettingAllQuestionsAction extends Action<'GettingAllQuestions'> {}

export interface GotAllQuestionsAction extends Action<'GotAllQuestions'> {
  questions: QuestionData[];
}

interface GettingAnsweredQuestionsAction
  extends Action<'GettingAnsweredQuestions'> {}

export interface GotAnsweredQuestionsAction
  extends Action<'GotAnsweredQuestions'> {
  questions: QuestionData[];
}

export interface GotSortedQuestionsByNameDescAction
  extends Action<'GotSortedQuestionsByNameDesc'> {}

export interface GotSortedQuestionsByNameAscAction
  extends Action<'GotSortedQuestionsByNameAsc'> {}

export interface GotSortedQuestionsByDateDescAction
  extends Action<'GotSortedQuestionsByDateDesc'> {}

export interface GotSortedQuestionsByDateAscAction
  extends Action<'GotSortedQuestionsByDateAsc'> {}

export interface SetCountOfPagesAction extends Action<'SetCountOfPages'> {
  countOfPages: number;
}

export interface PostedQuestionAction extends Action<'PostedQuestion'> {
  result: QuestionData | undefined;
}

type QuestionsActions =
  | GettingUnasnweredQuestionsAction
  | GotUnansweredQuestionsAction
  | GettingAllQuestionsAction
  | GotAllQuestionsAction
  | GettingAnsweredQuestionsAction
  | GotAnsweredQuestionsAction
  | GotSortedQuestionsByNameDescAction
  | GotSortedQuestionsByNameAscAction
  | GotSortedQuestionsByDateDescAction
  | GotSortedQuestionsByDateAscAction
  | PostedQuestionAction
  | SetCountOfPagesAction;

export const getUnansweredQuestionsActionCreator: ActionCreator<
  ThunkAction<Promise<void>, QuestionData[], null, GotUnansweredQuestionsAction>
> = () => {
  return async (dispatch: Dispatch) => {
    // const gettingUnasnweredQuestionsAction: GettingUnasnweredQuestionsAction = {
    //   type: 'GettingUnansweredQuestions',
    // };
    // dispatch(gettingUnasnweredQuestionsAction);
    const questions = await getUnansweredQuestions();

    const gotUnansweredQuestionAction: GotUnansweredQuestionsAction = {
      questions,
      type: 'GotUnansweredQuestions',
    };
    dispatch(gotUnansweredQuestionAction);
  };
};

export const getAnsweredQuestionsActionCreator: ActionCreator<
  ThunkAction<Promise<void>, QuestionData[], null, GotAnsweredQuestionsAction>
> = () => {
  return async (dispatch: Dispatch) => {
    // const gettingAnsweredQuestionsAction: GettingAnsweredQuestionsAction = {
    //   type: 'GettingAnsweredQuestions',
    // };
    // dispatch(gettingAnsweredQuestionsAction);
    const questions = await getAnsweredQuestions();

    const gotAnsweredQuestionAction: GotAnsweredQuestionsAction = {
      questions,
      type: 'GotAnsweredQuestions',
    };
    dispatch(gotAnsweredQuestionAction);
  };
};

export const getAllQuestionsActionCreator: ActionCreator<
  ThunkAction<Promise<void>, QuestionData[], null, GotAllQuestionsAction>
> = () => {
  return async (dispatch: Dispatch) => {
    // const gettingAllQuestionsAction: GettingAllQuestionsAction = {
    //   type: 'GettingAllQuestions',
    // };
    // dispatch(gettingAllQuestionsAction);
    const questions = await getAllQuestions();

    const gotAllQuestionAction: GotAllQuestionsAction = {
      questions,
      type: 'GotAllQuestions',
    };
    dispatch(gotAllQuestionAction);
  };
};

export const sortQuestionsByNameDescCreator = () => {
  return async (dispatch: Dispatch) => {
    const gotSortedQuestionsByNameDesc: GotSortedQuestionsByNameDescAction = {
      type: 'GotSortedQuestionsByNameDesc',
    };

    dispatch(gotSortedQuestionsByNameDesc);
  };
};

export const sortQuestionsByNameAscCreator = () => {
  return async (dispatch: Dispatch) => {
    const gotSortedQuestionsByNameAsc: GotSortedQuestionsByNameAscAction = {
      type: 'GotSortedQuestionsByNameAsc',
    };

    dispatch(gotSortedQuestionsByNameAsc);
  };
};

export const sortQuestionsByDateDescCreator = () => {
  return async (dispatch: Dispatch) => {
    const gotSortedQuestionsByDateDesc: GotSortedQuestionsByDateDescAction = {
      type: 'GotSortedQuestionsByDateDesc',
    };

    dispatch(gotSortedQuestionsByDateDesc);
  };
};

export const sortQuestionsByDateAscCreator = () => {
  return async (dispatch: Dispatch) => {
    const gotSortedQuestionsByDateAsc: GotSortedQuestionsByDateAscAction = {
      type: 'GotSortedQuestionsByDateAsc',
    };

    dispatch(gotSortedQuestionsByDateAsc);
  };
};

export const postQuestionsActionCreator: ActionCreator<
  ThunkAction<
    Promise<void>,
    QuestionData,
    PostQuestionData,
    PostedQuestionAction
  >
> = (question: PostQuestionData) => {
  return async (dispatch: Dispatch) => {
    const result = await postQuestion(question);
    const postedQuestionAction: PostedQuestionAction = {
      type: 'PostedQuestion',
      result,
    };
    dispatch(postedQuestionAction);
  };
};

export const setCountOfPagesActionCreator = (countOfPages: number) => {
  return async (dispatch: Dispatch) => {
    const setCountOfPagesAction: SetCountOfPagesAction = {
      type: 'SetCountOfPages',
      countOfPages,
    };

    dispatch(setCountOfPagesAction);
  };
};

export const clearPostedQuestionActionCreator: ActionCreator<PostedQuestionAction> = () => {
  const postedQuestionAction: PostedQuestionAction = {
    type: 'PostedQuestion',
    result: undefined,
  };

  return postedQuestionAction;
};

const questionsReducer: Reducer<QuestionsState, QuestionsActions> = (
  state = initialQuestionState,
  action,
) => {
  switch (action.type) {
    case 'GettingUnansweredQuestions': {
      return {
        ...state,
        unanswered: null,
        loading: true,
      };
    }
    case 'GotUnansweredQuestions': {
      return {
        ...state,
        unanswered: action.questions,
        loading: false,
      };
    }
    case 'GettingAllQuestions': {
      return {
        ...state,
        unanswered: null,
        loading: true,
      };
    }
    case 'GotAllQuestions': {
      return {
        ...state,
        unanswered: action.questions,
        loading: false,
      };
    }
    case 'GettingAnsweredQuestions': {
      return {
        ...state,
        unanswered: null,
        loading: true,
      };
    }
    case 'GotAnsweredQuestions': {
      return {
        ...state,
        unanswered: action.questions,
        loading: false,
      };
    }

    case 'GotSortedQuestionsByNameAsc': {
      return {
        ...state,
        unanswered:
          state.unanswered != null
            ? [
                ...state.unanswered.sort(function (a, b) {
                  if (a.title > b.title) {
                    return 1;
                  }
                  if (a.title < b.title) {
                    return -1;
                  }
                  return 0;
                }),
              ]
            : null,

        loading: false,
      };
    }

    case 'GotSortedQuestionsByNameDesc': {
      return {
        ...state,
        unanswered:
          state.unanswered != null
            ? [
                ...state.unanswered.sort(function (a, b) {
                  if (a.title > b.title) {
                    return -1;
                  }
                  if (a.title < b.title) {
                    return 1;
                  }
                  return 0;
                }),
              ]
            : null,

        loading: false,
      };
    }

    case 'GotSortedQuestionsByDateDesc': {
      return {
        ...state,
        unanswered:
          state.unanswered != null
            ? [
                ...state.unanswered.sort(function (a, b) {
                  if (a.created > b.created) {
                    return -1;
                  }
                  if (a.created < b.created) {
                    return 1;
                  }
                  return 0;
                }),
              ]
            : null,

        loading: false,
      };
    }

    case 'GotSortedQuestionsByDateAsc': {
      return {
        ...state,
        unanswered:
          state.unanswered != null
            ? [
                ...state.unanswered.sort(function (a, b) {
                  if (a.created > b.created) {
                    return 1;
                  }
                  if (a.created < b.created) {
                    return -1;
                  }
                  return 0;
                }),
              ]
            : null,

        loading: false,
      };
    }

    case 'PostedQuestion': {
      return {
        ...state,
        unanswered: action.result
          ? (state.unanswered || []).concat(action.result)
          : state.unanswered,
        postedResult: action.result,
      };
    }
    case 'SetCountOfPages': {
      return {
        ...state,
        countOfPages: action.countOfPages,
      };
    }
    default:
      neverReached(action);
  }
  return state;
};

const neverReached = (never: never) => {};

const rootReducer = combineReducers<AppState>({
  questions: questionsReducer,
});

// export function configureStore(): Store<AppState> {
//   const store = createStore(
//     rootReducer,
//     undefined,
//     compose(
//       applyMiddleware(thunk),
//       (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
//         (window as any).__REDUX_DEVTOOLS_EXTENSION__({ trace: true }),
//     ),
//   );
//   return store;
// }

export function configureStore() {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk),
      // window.__REDUX_DEVTOOLS_EXTENSION__ &&
      //   window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  );

  return store;
}
