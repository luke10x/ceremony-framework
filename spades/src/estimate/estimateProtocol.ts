import Ceremony from "../framework/ceremony";
import Projection from "../framework/projection";
import Protocol from "../framework/protocol";

export default class EstimateProtocol implements Protocol {
  getInitialCeremony(ceremonyId: string, creatorHandle: string): Ceremony {
    return {
      ceremonyId,
      handles: [ creatorHandle ],
      iteration: 1,
      state: {}
    }
  }

  getCeremonyProjection(ceremony: Ceremony, handle: string): Projection {
    return {
      handle,
      ceremonyId: ceremony.ceremonyId,
      iteration: 0,
      state: ceremony.state
    }
  };
}