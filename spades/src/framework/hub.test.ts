import { Hub } from "./hub";

describe('Hub', () => {
  const hubId = '45ef1596-7cd3-4b1c-807b-61fc8544b9ee'
  const hubAdminKey = '2e26d68e-fbf3-4624-b044-69cd5d3ab0b7'
  const ceremonyId = 'bf888675-a30b-4ef1-86be-12b81b09afaf'
  const handle = 'f44430b8-9b6c-47fa-bbb9-83e32bbd0c8f'
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
    hub.createCeremony(ceremonyId)
    const adminCeremonies = hub.admin(hubAdminKey).getCeremonies()
    expect(adminCeremonies.length).toBe(1)
  })

  it('gives a ceremony to admin with the same ID that was created', () => {
    const hub = Hub.createLocal(hubId, hubAdminKey)
    hub.createCeremony(ceremonyId)
    const adminCeremony = hub.admin(hubAdminKey).getCeremonies()[0]
    expect(adminCeremony.ceremonyId).toBe(ceremonyId)
  })  
})
