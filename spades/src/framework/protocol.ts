import Ceremony from "./ceremony";

export default interface Protocol {
  getCeremonyProjection: (ceremony: Ceremony, handle: string) => any
}
