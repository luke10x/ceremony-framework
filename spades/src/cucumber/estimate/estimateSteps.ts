import expect from 'expect';
import { Given, When, Then, defineParameterType } from '@cucumber/cucumber';


interface Persona {
  name: string
  handle: string
}

const personae: { [key: string]: Persona } = {
  "Alice": { name: "Alice", handle: "aaa" },
  "Bob": { name: "Bob", handle: "bbb" },
  "Charlie": { name: "Charlie", handle: "ccc" }
}

defineParameterType({
  name: 'handle',
  regexp: /Alice|Bob|Charlie/,
  transformer: (key: string): string => personae[key].name,
});

Given('{handle} created a Ceremony', (handle: any) => {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Given('{handle} shared an Invite-Link to {handle}', (handle: any, handle2: any) => {
  // Write code here that turns the phrase above into concrete actions                                                                                 
  return 'pending';
});

Given('{handle} has joined the Ceremony', (handle: any) => {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Given('there is a Task in {string} status', (string: any) => {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('{handle} joins a valid Invite-Link', (handle: any) => {
  // Write code here that turns the phrase above into concrete actions                                                                                 
  return 'pending';
});

When('{handle} adds a Task', (handle: any) => {
  // Write code here that turns the phrase above into concrete actions                                                                                 
  return 'pending';
});

When('{handle} gives estimation {int}', (handle: any, int: any) => {
  // When('{handle} gives estimation {float}', (handle: any, float: any) => {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('{handle} starts estimation for the task', (handle: any) => {
  // Write code here that turns the phrase above into concrete actions                                                                                 
  return 'pending';
});

When('{handle} stops estimation for the task', (handle: any) => {
  // Write code here that turns the phrase above into concrete actions                                                                                 
  return 'pending';
});

Then('{handle} should to see the Ceremony', (handle: any) => {                                                                                         
  // Write code here that turns the phrase above into concrete actions                                                                                 
  return 'pending';                                                                                                                                    
});

Then('{handle} should see that {handle} has joined the Ceremony', (handle: any, handle2: any) => {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('{handle} cannot see this task', (handle: any) => {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('{handle} can see the Task as {string}', (handle: any, string: any) => {
  // Write code here that turns the phrase above into concrete actions                                                                                 
  return 'pending';
});

Then('the Engineers are requested to estimate the Task', () => {
  // Write code here that turns the phrase above into concrete actions                                                                                 
  return 'pending';
});

Then('{handle} can see that {handle} gave some estimation', (handle: any, handle2: any) => {
  // Write code here that turns the phrase above into concrete actions                                                                                 
  return 'pending';
});

Then('{handle} can see that {handle} gave estimation {int}', (handle: any, handle2: any, int: any) => {
  // Then('{handle} can see that {handle} gave estimation {float}', (handle: any, handle2: any, float: any) => {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});