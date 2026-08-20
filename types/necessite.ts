export type NecessiteCard = {
  title: string;
  body: string;
};

export type NecessiteRow = {
  criterion: string;
  salons: string;
  forums: string;
  back2mboa: string;
};

export type NecessiteCopy = {
  impact: string;
  cards: [NecessiteCard, NecessiteCard, NecessiteCard, NecessiteCard];
  headers: {
    criterion: string;
    salons: string;
    forums: string;
    back2mboa: string;
  };
  rows: NecessiteRow[];
};
