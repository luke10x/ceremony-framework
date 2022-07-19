import UuidProvider from "./uuidProvider";
import UuidProviderImpl from "../platform/uuidProviderImpl";
import { Hub } from "./hub";
import Protocol from "./protocol";
import EstimateProtocol from "../estimate/estimateProtocol";
import Ceremony from "./ceremony";

jest.mock('../platform/uuidProviderImpl')
jest.mock('../estimate/estimateProtocol')

interface Persona {
  name: string
  inviteCode: string
  handle: string
}

const personae: { [key: string]: Persona } = {
  "Alice": {
    name: "Alice",
    inviteCode: "",
    handle: "a1c9a021-5c13-40a2-81df-5ed46212b790"
  },
  "Bob": {
    name: "Bob",
    inviteCode: "11b69205-8002-4d6c-a4bd-e81d125a7734",
    handle: "b0bfe1bd-22e5-40ef-bc0b-f808b4505557"
  },
  "Charlie": {
    name: "Charlie",
    inviteCode: "11c4eb13-552a-449d-bd2e-3ab4efdeb241",
    handle: "c4b46b2c-0c0a-47db-9ab6-7bf36defdb00"
  }
}

describe('Hub', () => {

  const hubId = '45ef1596-7cd3-4b1c-807b-61fc8544b9ee'
  const hubAdminKey = '2e26d68e-fbf3-4624-b044-69cd5d3ab0b7'

  const ceremonyId = 'bf888675-a30b-4ef1-86be-12b81b09afaf'
  it('can be created locally with hub ID and admin key', () => {
    expect(
      () => Hub.createLocal(hubId, hubAdminKey)
    ).not.toThrow()
  })

  it('cannot be created with invalid hub Id', () => {
    expect(
      () => Hub.createLocal('INVALID', hubAdminKey)
    ).toThrow()
  })

  it('cannot be created with invalid admin key', () => {
    expect(
      () => Hub.createLocal(hubId, 'INVALID')
    ).toThrow()
  })

  it('gives empty list of ceremony to admin', () => {
    const hub = Hub.createLocal(hubId, hubAdminKey)
    expect(hub.admin(hubAdminKey).getCeremonies().length).toBe(0)
  })

  it('gives a list of one ceremony to admin when one ceremony is added', () => {
    const hub = Hub.createLocal(hubId, hubAdminKey)
    hub.createCeremony(ceremonyId, personae['Alice'].handle)
    const adminCeremonies = hub.admin(hubAdminKey).getCeremonies()
    expect(adminCeremonies.length).toBe(1)
  })

  it('gives a ceremony to admin with the same ID that was created', () => {
    const hub = Hub.createLocal(hubId, hubAdminKey)
    hub.createCeremony(ceremonyId, personae['Alice'].handle)
    const adminCeremony = hub.admin(hubAdminKey).getCeremonies()[0]
    expect(adminCeremony.ceremonyId).toBe(ceremonyId)
  })

  describe('when created with mock-protocol, and there is a ceremony', () => {

    const fnStub = (result: any) => jest.fn().mockImplementation(() => result)

    const protocol = {
      getInitialCeremony: (ceremonyId: string, creatorHandle: string): Ceremony => {
        return {
          ceremonyId,
          handles: [creatorHandle],
          iteration: 1,
          state: {
            description: 'mocked initial state'
          }
        }
      },
      getCeremonyProjection: fnStub({ handle: personae['Alice'].handle, iteration: 1 }),
    };
    (<jest.Mock<Protocol>>EstimateProtocol).mockImplementation(() => protocol);


    let hub: Hub
    beforeEach(() => {
      hub = Hub.createLocal(hubId, hubAdminKey)
      hub.createCeremony(ceremonyId, personae['Alice'].handle)
    })

    it('creates ceremony with initial data from protocol', () => {
      const adminCeremony = hub.admin(hubAdminKey).getCeremonies()[0]

      expect(adminCeremony.state?.description).toMatch(/mocked initial state/)
    })

    it('calls protocol to get projection on subscribtion', () => {
      hub.subscribe(personae['Alice'].handle, () => { });

      expect(protocol.getCeremonyProjection)
        .toHaveBeenCalledWith(
          expect.objectContaining({ ceremonyId }),
          personae['Alice'].handle
        )
    })

    it('calls subscribed callback with projection payload from protocol', () => {
      const callback = jest.fn()
      hub.subscribe(personae['Alice'].handle, callback)

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({ handle: personae['Alice'].handle, iteration: 1 })
      )
    })
  })

  describe('when has one ceremony', () => {
    let hub: Hub
    beforeEach(() => {
      hub = Hub.createLocal(hubId, hubAdminKey)
      hub.createCeremony(ceremonyId, personae['Alice'].handle)
    })

    it('cannot invite with invalid handle', () => {
      expect(
        () => hub.inviteToCeremony('', personae["Bob"].inviteCode)
      ).toThrow(expect.objectContaining({
        message: expect.stringMatching(/handle does not belong to any ceremony/i)
      }))
    })

    it('cannot invite with invalid code', () => {
      expect(
        () => hub.inviteToCeremony(personae["Alice"].inviteCode, '')
      ).toThrow('Invite-code is not valid UUID')
    })

    it('cannot invite with same code twice', () => {
      expect(
        () => hub.inviteToCeremony(
          personae["Alice"].handle,
          personae["Bob"].inviteCode
        )
      ).not.toThrow()

      expect(
        () => hub.inviteToCeremony(
          personae["Alice"].handle,
          personae["Bob"].inviteCode
        )
      ).toThrow('This invite-code is already created')
    })

    it('fails to invite if the handle does not belong to any ceremony', () => {
      expect(
        () => hub.inviteToCeremony(
          personae["Charlie"].handle,
          personae["Bob"].inviteCode
        )
      ).toThrow('This handle does not belong to any ceremony')
    })

    describe('and the invitation is sent', () => {
      beforeEach(() => hub.inviteToCeremony(
        personae["Alice"].handle,
        personae["Bob"].inviteCode
      ))

      it('accepts the invitation with correct code', () => {
        expect(
          () => hub.acceptInvitation(personae['Bob'].inviteCode, personae['Bob'].handle)
        ).not.toThrow()
      })

      it('does not accept invitation code that does not exist', () => {
        expect(
          () => hub.acceptInvitation(personae['Charlie'].inviteCode, personae['Bob'].handle)
        ).toThrow('This invite-code does not belong to any ceremony')
      })

      it('accepts the invitation only once', () => {
        expect(
          () => hub.acceptInvitation(personae['Bob'].inviteCode, personae['Bob'].handle)
        ).not.toThrow()
        expect(
          () => hub.acceptInvitation(personae['Bob'].inviteCode, personae['Bob'].handle)
        ).toThrow('This invite-code does not belong to any ceremony')
      })

      it('subscribes with a handle created while accepting invitation', () => {
        hub.acceptInvitation(personae['Bob'].inviteCode, personae['Bob'].handle)

        expect(
          () => hub.subscribe(personae['Bob'].handle, () => { })
        ).not.toThrow()
      })
    });
  });
})
