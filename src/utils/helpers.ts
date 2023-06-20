import { Entry, ICurrentPodcast } from "../types/podcast.types";

export const convertToCurrentPodcast = (selectedPodcast: Entry): ICurrentPodcast => {
    return {
        id: +selectedPodcast.id.attributes['im:id'],
        title: selectedPodcast['im:name'].label,
        heightImg: +selectedPodcast['im:image'][2].attributes.height,
        srcImg: selectedPodcast['im:image'][2].label,
        author: selectedPodcast['im:artist'].label,
        description: selectedPodcast.summary.label,
      }
}