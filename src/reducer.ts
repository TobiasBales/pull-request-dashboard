import { REHYDRATE } from 'redux-persist/constants';
import { Dispatch as ReduxDispatch } from 'redux';

import { PullRequest, Repository } from './api';
import * as actions from './actions';

export interface State {
  version: number;
  githubToken: string;
  validGithubToken: boolean;
  validatingGithubToken: boolean;
  error?: string;
  repositories: Repository[];
  loadingRepositories: boolean;
  config: { [k: string]: string | undefined };
  pullRequests: { [k: string]: PullRequest[] };
  loadingPullRequests: boolean;
  hasLoadedPullRequests: boolean;
}

const CURRENT_VERSION = 7;

const initialState: State = {
  version: CURRENT_VERSION,
  githubToken: '',
  validGithubToken: false,
  validatingGithubToken: false,
  repositories: [],
  loadingRepositories: false,
  config: {},
  pullRequests: {},
  loadingPullRequests: false,
  hasLoadedPullRequests: false,
};

export function reducer(state: State = initialState, action: actions.Action) {
  switch (action.type) {
    case REHYDRATE:
      if (action.payload.version !== CURRENT_VERSION) {
        return state;
      }
      return { ...action.payload, error: undefined };

    case actions.ENABLE_REPOSITORY:
      return {
        ...state,
        config: { ...state.config, [action.payload]: '' },
      };

    case actions.DISABLE_REPOSITORY:
      return {
        ...state,
        config: { ...state.config, [action.payload]: undefined },
      };

    case actions.SET_REPOSITORY_FILTER:
      return {
        ...state,
        config: {
          ...state.config,
          ...{ [action.payload.repo]: action.payload.filter },
        },
      };

    case actions.SAVE_TOKEN_STARTED:
      return {
        ...state,
        error: undefined,
        validatingGithubToken: true,
        githubToken: action.payload,
      };

    case actions.SAVE_TOKEN_SUCCEEDED:
      return {
        ...state,
        error: undefined,
        validatingGithubToken: false,
        validGithubToken: true,
      };

    case actions.SAVE_TOKEN_FAILED:
      return {
        ...state,
        error: action.payload,
        validatingGithubToken: false,
      };

    case actions.FETCH_REPOSITORIES_STARTED:
      return {
        ...state,
        error: undefined,
        loadingRepositories: true,
      };

    case actions.FETCH_REPOSITORIES_SUCCEEDED:
      return {
        ...state,
        error: undefined,
        repositories: action.payload,
        loadingRepositories: false,
      };

    case actions.FETCH_REPOSITORIES_FAILED:
      return { ...state, error: action.payload, loadingRepositories: false };

    case actions.FETCH_PULL_REQUESTS_STARTED:
      return {
        ...state,
        loadingPullRequests: !state.hasLoadedPullRequests && true,
      };

    case actions.FETCH_PULL_REQUESTS_SUCCEEDED:
      return {
        ...state,
        pullRequests: {
          ...state.pullRequests,
          ...action.payload.reduce((result, { repo, prs }) => {
            result[repo] = prs;
            return result;
          },                       {}),
        },
        loadingPullRequests: false,
        hasLoadedPullRequests: true,
      };

    case actions.FETCH_PULL_REQUESTS_FAILED:
      return {
        ...state,
        pullRequests: [],
        hasLoadedPullRequests: false,
        loadingPullRequests: false,
      };

    default:
      return state;
  }
}

export type Dispatch = ReduxDispatch<State>;
