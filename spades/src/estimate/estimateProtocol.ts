import ceremony from "../framework/ceremony";
import Protocol from "../framework/protocol";

export default class EstimateProtocol implements Protocol {
  getCeremonyProjection(ceremony: ceremony, handle: string): any {
    return {projectionData: "real"}
  };
}