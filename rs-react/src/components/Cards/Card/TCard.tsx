type TCard = {
  image: string;
  title: string;
  author: {
    name: string;
    link: string;
  };
  category: string;
  place?: string;
};

export type { TCard };
