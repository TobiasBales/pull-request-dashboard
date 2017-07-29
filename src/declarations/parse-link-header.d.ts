declare module 'parse-link-header' {
  interface Link {
    page: string;
    per_page: string;
    rel: 'last' | 'next' | 'prev' | 'first';
    url: string;
  }
  interface LinkHeader {
    next?: Link;
    prev?: Link;
    last?: Link;
    first?: Link;
  }
  function parse(linkHeader: string): LinkHeader;

  export = parse;
}
