import Ceremony from "./ceremony";
import Projection from "./projection"
import { uuidV4Rx } from "./uuidProvider";

interface AdminActions {
  getCeremonies: () => Ceremony[]
}

export class Hub {

  private ceremonies: { [id: string]: Ceremony } = {}
  private handlesToCeremoniesMap: { [id: string]: string } = {}

  private constructor(private hubId: string, private hubAdminKey: string) {
    if (!uuidV4Rx.test(hubId)) {
      throw new Error('Hub ID is not valid UUID')
    }
    if (!uuidV4Rx.test(hubAdminKey)) {
      throw new Error('Hub ID is not valid admin key')
    }
  }

  static createLocal(hubId: string, hubAdminKey: string): Hub {
    return new Hub(hubId, hubAdminKey)
  }

  createCeremony(ceremonyId: string): Projection {
    // const ceremonyId = 'TODO'
    const handle = 'TODO-h'

    this.ceremonies[ceremonyId] = {
      ceremonyId,
    }
    this.handlesToCeremoniesMap[handle] = ceremonyId
    return {
      ceremonyId,
      handle,
    }
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