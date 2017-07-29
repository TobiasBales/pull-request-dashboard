import parseLinkHeader = require('parse-link-header');

export async function get(url: string, token: string) {
  const headers = new Headers({ Authorization: `token ${token}` });
  const response = await fetch(url, { headers: headers });
  const json = await response.json();
  if (response.status !== 200) {
    throw json;
  }

  return { json: json, headers: response.headers };
}

interface APIRepository {
  owner: {
    avatar_url: string;
    login: string;
  };
  name: string;
}

interface APIPullRequest {
  title: string;
  user: {
    avatar_url: string;
    login: string;
  };
}

export type Repository = string;

export interface PullRequest {
  author: string;
  title: string;
  avatar: string;
}

function fetchRepositoryPage(page: number, token: string) {
  return get(
    `https://api.github.com/user/repos?per_page=100&page=${page}`,
    token
  );
}

function fetchPullRequestPage(page: number, token: string) {
  return get(
    `https://api.github.com/user/repos?per_page=100&page=${page}`,
    token
  );
}

export async function getRepositories(token: string): Promise<Repository[]> {
  const response = await get(
    'https://api.github.com/user/repos?per_page=100',
    token
  );
  const link = parseLinkHeader(response.headers.get('Link') || '');

  let repos: APIRepository[] = [];
  const last = link ? link.last : undefined;
  if (!last) {
    repos = response.json;
    return repos.map(repo => {
      return `${repo.owner.login}/${repo.name}`;
    });
  }

  const lastPage = parseInt(last.page, 10);

  for (let i = 1; i <= lastPage; i++) {
    const request = await fetchRepositoryPage(i, token);
    repos = repos.concat(request.json);
  }

  return repos.map(repo => {
    return `${repo.owner.login}/${repo.name}`;
  });
}

export async function getPullRequests(
  repo: string,
  token: string
): Promise<PullRequest[]> {
  const response = await get(
    `https://api.github.com/repos/${repo}/pulls?per_page=100`,
    token
  );
  let prs: APIPullRequest[] = [];

  const link = parseLinkHeader(response.headers.get('Link') || '');

  const last = link ? link.last : undefined;

  if (!last) {
    prs = response.json;
    return prs.map(pr => {
      return {
        author: pr.user.login,
        avatar: pr.user.avatar_url,
        title: pr.title,
      };
    });
  }

  const lastPage = parseInt(last.page, 10);

  for (let i = 1; i <= lastPage; i++) {
    const request = await fetchPullRequestPage(i, token);
    prs = prs.concat(request.json);
  }

  return prs.map(pr => {
    return {
      author: pr.user.login,
      avatar: pr.user.avatar_url,
      title: pr.title,
    };
  });
}
