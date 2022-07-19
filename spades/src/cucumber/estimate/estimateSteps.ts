import expect from 'expect';
import { Given, When, Then, defineParameterType } from '@cucumber/cucumber';
import { Hub } from '../../framework/hub';
import UuidProviderImpl from '../../platform/uuidProviderImpl';

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

defineParameterType({
  name: 'persona',
  regexp: /Alice|Bob|Charlie/,
  transformer: (key: string): Persona => personae[key],
});

const uuidProvider = new UuidProviderImpl()
const hubId = uuidProvider.createV4()
const hubAdminKey = uuidProvider.createV4()
const ceremonyId = uuidProvider.createV4()

let hub: Hub

Given('{persona} created a Ceremony', (founder: Persona) => {
  hub = Hub.createLocal(hubId, hubAdminKey)
  hub.createCeremony(ceremonyId, founder.handle)
});

Given('{persona} shared an Invite-Link to {persona}', (founder: Persona, guest: Persona) => {
  hub.inviteToCeremony(founder.handle, guest.inviteCode)
});

Given('{persona} has joined the Ceremony', (handle: any) => {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Given('there is a Task in {string} status', (string: any) => {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('{persona} joins their Invite-Link', (guest: Persona) => {
  hub.acceptInvitation(guest.inviteCode, guest.handle)
});

When('{persona} adds a Task', (handle: any) => {
  // Write code here that turns the phrase above into concrete actions                                                                                 
  return 'pending';
});

When('{persona} gives estimation {int}', (handle: any, int: any) => {
  // When('{persona} gives estimation {float}', (handle: any, float: any) => {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('{persona} starts estimation for the task', (handle: any) => {
  // Write code here that turns the phrase above into concrete actions                                                                                 
  return 'pending';
});

When('{persona} stops estimation for the task', (handle: any) => {
  // Write code here that turns the phrase above into concrete actions                                                                                 
  return 'pending';
});

Then('{persona} should see the Ceremony', (guest: Persona) => {
  let seen = false
  const callback = () => seen = true

  hub.subscribe(guest.handle, callback)
  
  expect(seen).toBe(true)
});

Then('{persona} should see that {persona} has joined the Ceremony', (handle: any, handle2: any) => {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('{persona} cannot see this task', (handle: any) => {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('{persona} can see the Task as {string}', (handle: any, string: any) => {
  // Write code here that turns the phrase above into concrete actions                                                                                 
  return 'pending';
});

Then('the Voters are requested to estimate the Task', () => {
  // Write code here that turns the phrase above into concrete actions                                                                                 
  return 'pending';
});

Then('{persona} can see that {persona} gave some estimation', (handle: any, handle2: any) => {
  // Write code here that turns the phrase above into concrete actions                                                                                 
  return 'pending';
});

Then('{persona} can see that {persona} gave estimation {int}', (handle: any, handle2: any, int: any) => {
  // Then('{persona} can see that {persona} gave estimation {float}', (handle: any, handle2: any, float: any) => {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});