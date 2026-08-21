import type { OpenRoadCopy } from "@/types/open-road";

/** Copy + cadrage maquette National Geographic new.png. */
export const OPEN_ROAD_COPY: OpenRoadCopy = {
  brand: "BACK 2 MBOA",
  watchLabel: "Watch trailer",
  viewAll: "View all",
  image: "/images/open-road/national-geographic.jpg",
  programs: [
    {
      id: "open-road",
      index: "01",
      title: "The Open Road",
      schedule: "Every Tuesday | 6PM",
    },
    {
      id: "rainforest",
      index: "02",
      title: "A Journey Into The Rainforest",
      schedule: "Every Friday | 8PM",
    },
    {
      id: "summit",
      index: "03",
      title: "Summit Seekers",
      schedule: "July 21 | 6PM",
    },
  ],
};
