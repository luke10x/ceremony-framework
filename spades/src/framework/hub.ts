import EstimateProtocol from "../estimate/estimateProtocol";
import UuidProviderImpl from "../platform/uuidProviderImpl";
import Ceremony from "./ceremony";
import Projection from "./projection"
import Protocol from "./protocol";
import UuidProvider, { uuidV4Rx } from "./uuidProvider";

interface AdminActions {
  getCeremonies: () => Ceremony[]
}

export class Hub {

  private ceremonies: { [id: string]: Ceremony } = {}
  private handlesToCeremoniesMap: { [id: string]: string } = {}
  private uuidProvider: UuidProvider;
  private protocol: Protocol

  private constructor(private hubId: string, private hubAdminKey: string) {
    if (!uuidV4Rx.test(hubId)) {
      throw new Error('Hub ID is not valid UUID')
    }
    if (!uuidV4Rx.test(hubAdminKey)) {
      throw new Error('Hub ID is not valid admin key')
    }

    this.uuidProvider = new UuidProviderImpl()
    this.protocol = new EstimateProtocol()
  }

  static createLocal(hubId: string, hubAdminKey: string): Hub {
    return new Hub(hubId, hubAdminKey)
  }

  createCeremony(ceremonyId: string): string {
    const handle = this.uuidProvider.createV4()

    this.ceremonies[ceremonyId] = {
      ceremonyId, handles: [handle], state: {}
    }
    this.handlesToCeremoniesMap[handle] = ceremonyId
    return handle
  }

  subscribe(handle: string, callback: jest.Func) {
    const ceremonyId = this.handlesToCeremoniesMap[handle]
    const ceremony = this.ceremonies[ceremonyId] 
    const projection = this.protocol.getCeremonyProjection(ceremony, handle)

    callback(projection)
  }
  
  admin(hubAdminKey: string): AdminActions {
    if (hubAdminKey !== this.hubAdminKey) {
      throw new Error('Method not implemented.');
    }

    const ceremonies = this.ceremonies
    return { 
      getCeremonies(): Ceremony[] {
        return Object.values(ceremonies)
      }
    }
  }
}