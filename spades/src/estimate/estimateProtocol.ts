import Ceremony from "../framework/ceremony";
import Projection from "../framework/projection";
import Protocol from "../framework/protocol";

export default class EstimateProtocol implements Protocol {
  getCeremonyProjection(ceremony: Ceremony, handle: string): Projection {
    return {
      handle,
      ceremonyId: ceremony.ceremonyId,
      iteration: 0,
      state: ceremony.state
    }
  };
}