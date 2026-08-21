export type OpenRoadProgram = {
  id: string;
  index: string;
  title: string;
  schedule: string;
};

export type OpenRoadCopy = {
  brand: string;
  watchLabel: string;
  viewAll: string;
  image: string;
  programs: [OpenRoadProgram, OpenRoadProgram, OpenRoadProgram];
};
