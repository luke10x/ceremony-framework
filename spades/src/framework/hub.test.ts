import UuidProvider from "./uuidProvider";
import UuidProviderImpl from "../platform/uuidProviderImpl";
import { Hub } from "./hub";
import Protocol from "./protocol";
import EstimateProtocol from "../estimate/estimateProtocol";
import Ceremony from "./ceremony";

jest.mock('../platform/uuidProviderImpl')
jest.mock('../estimate/estimateProtocol')

describe('Hub', () => {

  const hubId = '45ef1596-7cd3-4b1c-807b-61fc8544b9ee'
  const hubAdminKey = '2e26d68e-fbf3-4624-b044-69cd5d3ab0b7'
  const testHandle = 'f44430b8-9b6c-47fa-bbb9-83e32bbd0c8f';

  const ceremonyId = 'bf888675-a30b-4ef1-86be-12b81b09afaf'
  it('can be reated locally with hub ID and admin key', () => {
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
    hub.createCeremony(ceremonyId, testHandle)
    const adminCeremonies = hub.admin(hubAdminKey).getCeremonies()
    expect(adminCeremonies.length).toBe(1)
  })

  it('gives a ceremony to admin with the same ID that was created', () => {
    const hub = Hub.createLocal(hubId, hubAdminKey)
    hub.createCeremony(ceremonyId, testHandle)
    const adminCeremony = hub.admin(hubAdminKey).getCeremonies()[0]
    expect(adminCeremony.ceremonyId).toBe(ceremonyId)
  })

  describe('given protocol-mock is configured', () => {

    const fnStub = (result: any) => jest.fn().mockImplementation(() => result)

    const protocol = {
      getInitialCeremony: (ceremonyId: string, creatorHandle: string): Ceremony => {
        return {
          ceremonyId,
          handles: [ creatorHandle ],
          iteration: 1,
          state: {
            description: 'mocked initial state'
          }
        }
      },
      getCeremonyProjection: fnStub({ handle: testHandle, iteration: 1 }),
    };
    (<jest.Mock<Protocol>>EstimateProtocol).mockImplementation(() => protocol);
  
    beforeEach(() => {})

    it('creates a ceremony with initial data from protocol', () => {
      const hub = Hub.createLocal(hubId, hubAdminKey)
      
      hub.createCeremony(ceremonyId, testHandle)
      const adminCeremony = hub.admin(hubAdminKey).getCeremonies()[0]

      expect(adminCeremony.state?.description).toMatch(/mocked initial state/)
    })

    it('calls protocol to get projection on subscribtion', () => {
      const hub = Hub.createLocal(hubId, hubAdminKey)
      hub.createCeremony(ceremonyId, testHandle)

      hub.subscribe(testHandle, () => {});

      expect(protocol.getCeremonyProjection)
        .toHaveBeenCalledWith(
          expect.objectContaining({ ceremonyId }),
          testHandle
        )
    })

    it('calls subscribed callback with projection payload from protocol', () => {
      const hub = Hub.createLocal(hubId, hubAdminKey)
      hub.createCeremony(ceremonyId, testHandle)
      const callback = jest.fn()

      hub.subscribe(testHandle, callback)

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({ handle: testHandle, iteration: 1 })
      )
    })
  })
})
