import type { OpenRoadCopy } from "@/types/open-road";

export const OPEN_ROAD_COPY: OpenRoadCopy = {
  title: "The Open Road",
  watchLabel: "Watch trailer",
  duration: "60 min",
  programs: [
    {
      id: "open-road",
      index: "01",
      title: "The Open Road",
      schedule: "EVERY TUESDAY | 6PM",
    },
    {
      id: "rainforest",
      index: "02",
      title: "A Journey Into The Rainforest",
      schedule: "EVERY FRIDAY | 8PM",
    },
    {
      id: "summit",
      index: "03",
      title: "Summit Seekers",
      schedule: "JULY 27 | 8PM",
    },
  ],
};
