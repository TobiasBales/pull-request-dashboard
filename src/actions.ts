import { Dispatch } from 'redux';

import * as api from './api';
import { State } from './reducer';

export type SAVE_TOKEN_STARTED = 'SAVE_TOKEN_STARTED';
export const SAVE_TOKEN_STARTED: SAVE_TOKEN_STARTED = 'SAVE_TOKEN_STARTED';

export type SAVE_TOKEN_FAILED = 'SAVE_TOKEN_FAILED';
export const SAVE_TOKEN_FAILED: SAVE_TOKEN_FAILED = 'SAVE_TOKEN_FAILED';

export type SAVE_TOKEN_SUCCEEDED = 'SAVE_TOKEN_SUCCEEDED';
export const SAVE_TOKEN_SUCCEEDED: SAVE_TOKEN_SUCCEEDED =
  'SAVE_TOKEN_SUCCEEDED';

export interface SaveTokenStarted {
  type: SAVE_TOKEN_STARTED;
  payload: string;
}

export interface SaveTokenFailed {
  type: SAVE_TOKEN_FAILED;
  payload: string;
}

export interface SaveTokenSucceeded {
  type: SAVE_TOKEN_SUCCEEDED;
}

export const saveToken = (token: string) => async (
  dispatch: Dispatch<State>
) => {
  try {
    const started: SaveTokenStarted = {
      type: SAVE_TOKEN_STARTED,
      payload: token,
    };
    dispatch(started);

    await api.getRepositories(token);

    const succeeded: SaveTokenSucceeded = { type: SAVE_TOKEN_SUCCEEDED };
    dispatch(succeeded);
  } catch (e) {
    const failed: SaveTokenFailed = {
      type: SAVE_TOKEN_FAILED,
      payload: e.message,
    };
    dispatch(failed);
  }
};

export type FETCH_REPOSITORIES_STARTED = 'FETCH_REPOSITORIES_STARTED';
export const FETCH_REPOSITORIES_STARTED: FETCH_REPOSITORIES_STARTED =
  'FETCH_REPOSITORIES_STARTED';

export type FETCH_REPOSITORIES_FAILED = 'FETCH_REPOSITORIES_FAILED';
export const FETCH_REPOSITORIES_FAILED: FETCH_REPOSITORIES_FAILED =
  'FETCH_REPOSITORIES_FAILED';

export type FETCH_REPOSITORIES_SUCCEEDED = 'FETCH_REPOSITORIES_SUCCEEDED';
export const FETCH_REPOSITORIES_SUCCEEDED: FETCH_REPOSITORIES_SUCCEEDED =
  'FETCH_REPOSITORIES_SUCCEEDED';

export interface FetchRepositoriesStarted {
  type: FETCH_REPOSITORIES_STARTED;
}

export interface FetchRepositoriesFailed {
  type: FETCH_REPOSITORIES_FAILED;
  payload: string;
}

export interface FetchRepositoriesSucceeded {
  type: FETCH_REPOSITORIES_SUCCEEDED;
  payload: api.Repository[];
}

export const fetchRepositories = () => async (
  dispatch: Dispatch<State>,
  getState: () => State
) => {
  try {
    const started: FetchRepositoriesStarted = {
      type: FETCH_REPOSITORIES_STARTED,
    };
    dispatch(started);

    const token = getState().githubToken;
    const repos = await api.getRepositories(token);
    const succeeded = { type: FETCH_REPOSITORIES_SUCCEEDED, payload: repos };
    dispatch(succeeded);
  } catch (e) {
    const failed: FetchRepositoriesFailed = {
      type: FETCH_REPOSITORIES_FAILED,
      payload: e.message,
    };
    dispatch(failed);
  }
};

export type ENABLE_REPOSITORY = 'ENABLE_REPOSITORY';
export const ENABLE_REPOSITORY: ENABLE_REPOSITORY = 'ENABLE_REPOSITORY';

export interface EnableRepository {
  type: ENABLE_REPOSITORY;
  payload: string;
}

export const enableRepository = (repo: string): EnableRepository => {
  return {
    type: ENABLE_REPOSITORY,
    payload: repo,
  };
};

export type DISABLE_REPOSITORY = 'DISABLE_REPOSITORY';
export const DISABLE_REPOSITORY: DISABLE_REPOSITORY = 'DISABLE_REPOSITORY';

export interface DisableRepository {
  type: DISABLE_REPOSITORY;
  payload: string;
}

export const disableRepository = (repo: string): DisableRepository => {
  return { type: DISABLE_REPOSITORY, payload: repo };
};

export type SET_REPOSITORY_FILTER = 'SET_REPOSITORY_FILTER';
export const SET_REPOSITORY_FILTER: SET_REPOSITORY_FILTER =
  'SET_REPOSITORY_FILTER';

export interface SetRepositoryFilter {
  type: SET_REPOSITORY_FILTER;
  payload: { repo: string; filter: string };
}

export const setRepositoryFilter = (
  repo: string,
  filter: string
): SetRepositoryFilter => {
  return {
    type: SET_REPOSITORY_FILTER,
    payload: { repo: repo, filter: filter },
  };
};

export type FETCH_PULL_REQUESTS_STARTED = 'FETCH_PULL_REQUESTS_STARTED';
export const FETCH_PULL_REQUESTS_STARTED: FETCH_PULL_REQUESTS_STARTED =
  'FETCH_PULL_REQUESTS_STARTED';

export type FETCH_PULL_REQUESTS_FAILED = 'FETCH_PULL_REQUESTS_FAILED';
export const FETCH_PULL_REQUESTS_FAILED: FETCH_PULL_REQUESTS_FAILED =
  'FETCH_PULL_REQUESTS_FAILED';

export type FETCH_PULL_REQUESTS_SUCCEEDED = 'FETCH_PULL_REQUESTS_SUCCEEDED';
export const FETCH_PULL_REQUESTS_SUCCEEDED: FETCH_PULL_REQUESTS_SUCCEEDED =
  'FETCH_PULL_REQUESTS_SUCCEEDED';

export interface FetchPullRequestsStarted {
  type: FETCH_PULL_REQUESTS_STARTED;
}

export interface FetchPullRequestsFailed {
  type: FETCH_PULL_REQUESTS_FAILED;
  payload: string;
}

export interface FetchPullRequestsSucceeded {
  type: FETCH_PULL_REQUESTS_SUCCEEDED;
  payload: { prs: api.PullRequest[]; repo: string }[];
}

export const fetchPullRequests = () => async (
  dispatch: Dispatch<State>,
  getState: () => State
) => {
  try {
    const loading: FetchPullRequestsStarted = {
      type: FETCH_PULL_REQUESTS_STARTED,
    };
    dispatch(loading);

    const state = getState();
    const repos: string[] = [];
    Object.keys(state.config).forEach(repo => repos.push(repo));
    const token = state.githubToken;

    const prs: { repo: string; prs: api.PullRequest[] }[] = [];
    for (let i = 0; i < repos.length; i++) {
      const repo = repos[i];
      const repoPrs = await api.getPullRequests(repo, token);
      prs.push({ repo: repo, prs: repoPrs });
    }

    const succeeded: FetchPullRequestsSucceeded = {
      type: FETCH_PULL_REQUESTS_SUCCEEDED,
      payload: prs,
    };
    dispatch(succeeded);
  } catch (e) {
    const failed: FetchPullRequestsFailed = {
      type: FETCH_PULL_REQUESTS_FAILED,
      payload: e.message,
    };
    dispatch(failed);
  }
};

export type Rehydrate = { type: 'persist/REHYDRATE'; payload: State };

export type Action =
  | Rehydrate
  | EnableRepository
  | DisableRepository
  | SetRepositoryFilter
  | FetchPullRequestsStarted
  | FetchPullRequestsFailed
  | FetchPullRequestsSucceeded
  | FetchRepositoriesStarted
  | FetchRepositoriesFailed
  | FetchRepositoriesSucceeded
  | SaveTokenStarted
  | SaveTokenFailed
  | SaveTokenSucceeded;
