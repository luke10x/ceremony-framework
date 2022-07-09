import expect from 'expect';
import { Given, When, Then } from '@cucumber/cucumber';
import { Hub } from '../../framework/hub';
import Projection from '../../framework/projection';
import UuidProviderImpl from '../../platform/uuidProviderImpl';
import { uuidV4Rx } from '../../framework/uuidProvider';

const uuidProvider = new UuidProviderImpl()
const hubId = uuidProvider.createV4()
const hubAdminKey = uuidProvider.createV4()
const ceremonyId = uuidProvider.createV4()

let hub: Hub
let projection: Projection
let handle: string
let callback: (payload: any) => void

Given('there are no Ceremonies in the Hub', () => {
  hub = Hub.createLocal(hubId, hubAdminKey)
  const ceremonies = hub.admin(hubAdminKey).getCeremonies()
  expect(ceremonies.length).toBe(0)
});

When('user creates a Ceremony on the Hub', () => {
  handle = hub.createCeremony(ceremonyId)
});

Then('admin will be able to see one Ceremony in the Hub', () => {
  const ceremonies = hub.admin(hubAdminKey).getCeremonies()
  expect(ceremonies.length).toBe(1)
});

Then('the user will receive a Handle', () => {
  expect(uuidV4Rx.test(handle)).toBeTruthy()
});

Given('there is a Ceremony in the Hub', () => {
  hub = Hub.createLocal(hubId, hubAdminKey)
  handle = hub.createCeremony(ceremonyId)
  const ceremonies = hub.admin(hubAdminKey).getCeremonies()
  expect(ceremonies.length).toBe(1)
});

When('user subscribes with the Handle', () => {
  callback = (event) => {
    projection = event
  }
  hub.subscribe(handle, callback)
});

Then('user will receive Projection', () => {
  expect(projection).toBe({ handle })
});
