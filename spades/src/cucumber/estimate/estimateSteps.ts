import expect from 'expect';
import { Given, When, Then, defineParameterType } from '@cucumber/cucumber';
import { Hub } from '../../framework/hub';
import UuidProviderImpl from '../../platform/uuidProviderImpl';


interface Persona {
  name: string
  handle: string
}

const personae: { [key: string]: Persona } = {
  "Alice": { name: "Alice", handle: "a1c9a021-5c13-40a2-81df-5ed46212b790" },
  "Bob": { name: "Bob", handle: "b0bfe1bd-22e5-40ef-bc0b-f808b4505557" },
  "Charlie": { name: "Charlie", handle: "c4b46b2c-0c0a-47db-9ab6-7bf36defdb00" }
}

defineParameterType({
  name: 'persona',
  regexp: /Alice|Bob|Charlie/,
  transformer: (key: string): string => personae[key].name,
});

const uuidProvider = new UuidProviderImpl()
const hubId = uuidProvider.createV4()
const hubAdminKey = uuidProvider.createV4()
const ceremonyId = uuidProvider.createV4()

let hub: Hub

Given('{persona} created a Ceremony', (persona: Persona) => {
  hub = Hub.createLocal(hubId, hubAdminKey)
  hub.createCeremony(ceremonyId, persona.handle)
});

Given('{persona} shared an Invite-Link to {persona}', (handle: any, handle2: any) => {
  // Write code here that turns the phrase above into concrete actions                                                                                 
  return 'pending';
});

Given('{persona} has joined the Ceremony', (handle: any) => {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Given('there is a Task in {string} status', (string: any) => {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('{persona} joins a valid Invite-Link', (handle: any) => {
  // Write code here that turns the phrase above into concrete actions                                                                                 
  return 'pending';
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

Then('{persona} should to see the Ceremony', (handle: any) => {                                                                                         
  // Write code here that turns the phrase above into concrete actions                                                                                 
  return 'pending';                                                                                                                                    
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

Then('the Engineers are requested to estimate the Task', () => {
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