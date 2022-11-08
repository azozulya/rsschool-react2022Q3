interface TCard {
  id: string;
  title: string;
  farm: number;
  isfamily: number;
  isfriend: number;
  owner: string;
  secret: string;
  server: string;
}

interface TCardDetails {
  dateuploaded: string;
  id: string;
  title: string | { _content: string };
  secret: string;
  server: string;
  views: number;
  owner: { username: string; realname: string; location: string; iconserver: string };
}

export type { TCard, TCardDetails };
