import Ceremony from "./ceremony";
import Projection from "./projection";

export default interface Protocol {
  getCeremonyProjection: (ceremony: Ceremony, handle: string) => Projection
}
