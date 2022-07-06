import expect from 'expect';
import { Given, When, Then } from '@cucumber/cucumber';
import { Hub } from '../../framework/hub';
import Projection from '../../framework/projection';
import UuidProviderImpl from '../../platform/uuidProviderImpl';

const uuidProvider = new UuidProviderImpl()
const hubId = uuidProvider.createV4()
const hubAdminKey = uuidProvider.createV4()

let hub: Hub
let projection: Projection

Given('there are no Ceremonies in the Hub', () => {
  hub = Hub.createLocal(hubId, hubAdminKey);
  const ceremonies = hub.admin(hubAdminKey).getCeremonies()
});

When('user creates a Ceremony on the Hub', () => {
  projection = hub.createCeremony()
});

Then('there will be one Ceremony in the Hub', () => {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('user will have a Handle to that Ceremony', () => {
  const { handle, ceremonyId } = projection
  expect(handle).toMatch(/[0-9A-F-]-{36}/)
  expect(ceremonyId).toMatch(/[0-9A-F-]-{36}/)
});
