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
  id: string;
  title: string;
  description: string;
  dateuploaded: string;
  secret: string;
  server: string;
  views: number;
  username: string;
  realname: string;
  location: string;
  iconserver: string;
}

export type { TCard, TCardDetails };
