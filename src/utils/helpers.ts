import { formatDistance } from "date-fns";
import { Entry, ICurrentPodcast } from "../types/podcast.types";

export const convertToCurrentPodcast = (
  selectedPodcast: Entry
): ICurrentPodcast => {
  return {
    id: +selectedPodcast.id.attributes["im:id"],
    title: selectedPodcast["im:name"].label,
    heightImg: +selectedPodcast["im:image"][2].attributes.height,
    srcImg: selectedPodcast["im:image"][2].label,
    author: selectedPodcast["im:artist"].label,
    description: selectedPodcast.summary.label,
  };
};

export const dateFormat = (date: string) => {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString();
  return formattedDate;
};

export const timeFormat = (number: number) => {
  const seconds = Math.floor((number % (1000 * 60)) / 1000);
  const minutes = Math.floor((number % (1000 * 60 * 60)) / (1000 * 60));
  const hours = Math.floor((number % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const durationTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  return durationTime;
};

export const getLastUpdatedDate = (name: string) => {
  const dataLastUpdatedDate = localStorage.getItem(name);
  if (dataLastUpdatedDate) {
    return Number(JSON.parse(dataLastUpdatedDate));
  }
};

export const dayInterval = (pastDate: Date): boolean => {
  if (!pastDate) {
    return false;
  }
  return formatDistance(new Date(pastDate), new Date()).includes("day");
};
