import Ceremony from "./ceremony";
import Projection from "./projection";

export default interface Protocol {
  getInitialCeremony: (ceremonyId: string, creatorHandle: string) => Ceremony
  getCeremonyProjection: (ceremony: Ceremony, handle: string) => Projection
}
