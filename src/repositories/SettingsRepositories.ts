import { GithubRepository } from 'src/domain/GithubRepository';

export interface SettingsRepository {
  getAccessToken(): string;
  setAccessToken(at: string): void;
  getRepositories(): GithubRepository[];
  setRepositories(repos: GithubRepository[]): void;
}

export class SettingsRepositoryImpl implements SettingsRepository {
  private readonly KEY_ACCESS_TOKEN = 'access_token';
  private readonly KEY_REPOSITORIES = 'repositories';

  constructor(private storage: Storage) {}

  public getAccessToken() {
    // return '842d6050dd86f1128cd9e456ad79b48c5c82cce2';
    return this.storage.getItem(this.KEY_ACCESS_TOKEN) || '';
  }

  public setAccessToken(accessToken: string) {
    return this.storage.setItem(this.KEY_ACCESS_TOKEN, accessToken);
  }

  public getRepositories() {
    return JSON.parse(this.storage.getItem(this.KEY_REPOSITORIES) || '[]');
  }

  public setRepositories(repos: GithubRepository[]) {
    this.storage.setItem(this.KEY_REPOSITORIES, JSON.stringify(repos));
  }
}
