export type OpenRoadProgram = {
  id: string;
  index: string;
  title: string;
  schedule: string;
};

export type OpenRoadCopy = {
  title: string;
  watchLabel: string;
  duration: string;
  programs: [OpenRoadProgram, OpenRoadProgram, OpenRoadProgram];
};
