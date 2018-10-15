import { GithubRepository } from 'src/domain/GithubRepository';

export interface SettingsService {
  readonly accessToken: string;
  readonly repositories: GithubRepository[];
  setAccessToken(accessToken: string): void;
  addRepository(repo: GithubRepository): void;
  deleteRepository(repo: GithubRepository): void;
}
