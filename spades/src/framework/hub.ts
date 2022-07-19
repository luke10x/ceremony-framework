import EstimateProtocol from "../estimate/estimateProtocol";
import Ceremony from "./ceremony";
import Projection from "./projection";
import Protocol from "./protocol";
import { uuidV4Rx } from "./uuidProvider";

interface AdminActions {
  getCeremonies: () => Ceremony[]
}

export class Hub {

  private ceremonies: { [id: string]: Ceremony } = {}
  private handlesToCeremoniesMap: { [id: string]: string } = {}
  private inviteCodeToCeremony = new Map<string, string>()
  private protocol: Protocol

  private constructor(private hubId: string, private hubAdminKey: string) {
    if (!uuidV4Rx.test(hubId)) {
      throw new Error('Hub ID is not valid UUID')
    }
    if (!uuidV4Rx.test(hubAdminKey)) {
      throw new Error('Hub ID is not valid admin key')
    }

    this.protocol = new EstimateProtocol()
  }

  static createLocal(hubId: string, hubAdminKey: string): Hub {
    return new Hub(hubId, hubAdminKey)
  }

  createCeremony(ceremonyId: string, creatorHandle: string): void {
    this.ceremonies[ceremonyId] = this.protocol.getInitialCeremony(ceremonyId, creatorHandle)
    this.handlesToCeremoniesMap[creatorHandle] = ceremonyId
  }

  subscribe(handle: string, callback: (_: Projection) => void) {
    const ceremonyId = this.handlesToCeremoniesMap[handle]
    const ceremony = this.ceremonies[ceremonyId] 
    const projection = this.protocol.getCeremonyProjection(ceremony, handle)

    callback(projection)
  }

  inviteToCeremony(founderHandle: string, inviteCode: string) {
   
    if (!uuidV4Rx.test(inviteCode)) {
      throw new Error('Invite-code is not valid UUID');
    }

    const ceremonyId = this.handlesToCeremoniesMap[founderHandle]
    if (ceremonyId === undefined) {
      throw new Error('This handle does not belong to any ceremony')
    }

    if (this.inviteCodeToCeremony.has(inviteCode)) {
      throw new Error('This invite-code is already created')
    }
    
    this.inviteCodeToCeremony.set(inviteCode, ceremonyId)
  }

  acceptInvitation(inviteCode: string, guestHandle: string) {
    if (!uuidV4Rx.test(guestHandle)) {
      throw new Error('Guest handle is not valid UUID');
    }

    const ceremonyId = this.inviteCodeToCeremony.get(inviteCode)
    if (ceremonyId === undefined) {
      throw new Error('This invite-code does not belong to any ceremony')
    }

    this.handlesToCeremoniesMap[guestHandle] = ceremonyId

    this.inviteCodeToCeremony.delete(inviteCode)
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