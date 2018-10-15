export class GithubService {
  public async tokenIsValid(accessToken: string): Promise<boolean> {
    try {
      await this.makeRequest('https://api.github.com/user/repos', accessToken);
      return true;
    } catch (e) {
      return false;
    }
  }

  private async makeRequest(url: string, token: string) {
    const headers = new Headers({ Authorization: `token ${token}` });
    const response = await fetch(url, { headers });
    const json = await response.json();
    if (response.status !== 200) {
      throw json;
    }

    return { json, headers: response.headers };
  }
}
