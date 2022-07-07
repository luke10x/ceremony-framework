import expect from 'expect';
import { Given, When, Then } from '@cucumber/cucumber';
import { Hub } from '../../framework/hub';
import Projection from '../../framework/projection';
import UuidProviderImpl from '../../platform/uuidProviderImpl';

const uuidProvider = new UuidProviderImpl()
const hubId = uuidProvider.createV4()
const hubAdminKey = uuidProvider.createV4()
const ceremonyId = uuidProvider.createV4()

let hub: Hub
let projection: Projection

Given('there are no Ceremonies in the Hub', () => {
  hub = Hub.createLocal(hubId, hubAdminKey);
  const ceremonies = hub.admin(hubAdminKey).getCeremonies()
  expect(ceremonies.length).toBe(0)
});

When('user creates a Ceremony on the Hub', () => {
  projection = hub.createCeremony(ceremonyId)
});

Then('there will be one Ceremony in the Hub', () => {
  const ceremonies = hub.admin(hubAdminKey).getCeremonies()
  expect(ceremonies.length).toBe(1)
});
