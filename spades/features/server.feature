Feature: Ceremony

  Scenario: create a new ceremony returns a handle
    Given there are no ceremonies in the server
    When client creates a ceremony
    Then client will get a handle
    And there will be one ceremony in the server

Feature: Event

  Ceremony Protocol Handler (CPH) is an interface
  implementation of which defines the exact rules of the ceremony
 
  Scenario: Connect to a server with a handle in a middle of a ceremony
    Given there is a ceremony
    And there are unseen events in a socket buffer for that handle
    When user connects to that socket with a handle
    Then the user will receive unseen events

  Scenario: Event happens in a ceremony to which a user is connected 
    Given there is a ceremony
    And a user is connected to that ceremony
    When CPH emits an event
    Then the user will receive that event

Feature: Remote ceremony

  Scenario: client commands to publish a ceremony
    Given there is a ceremony
    And consecutive server is configured
    When the client sends Publish ceremony command
    And remote server will emit Published event 
    Then the connection will receive Published event 
    And there will be one ceremony in the consecutive server
    And the connection on the local server will proxy to the consecutive server

  Scenario: remote server evicts a ceremony
    Given there is a ceremony
    And consecutive server is configured
    And there is a matching ceremony on a consecutive server
    When CPH on consecutive server will emit Evict event
    And local CPH will emit Imported event
    Then there will be no ceremony in the consecutive server
    And there will be one ceremony on the server

Feature: Connection lost

  when connection for certain handle has no activity
  - is considered that user left
  - CPH should be informed about it

  Scenario: Remote has not heard from a handle for one minute
    Given there is a ceremony
    And consecutive server is configured
    And there is a matching ceremony on a consecutive server
    And a user is connected to that ceremony
    When user sends no command
    And 1 minute pass
    Then remote server send Leave command to the remote CPH
    And the handle is marked to redirect to spectate ceremony

  Scenario: Local server cannot proxy to remote
    Given there is a ceremony
    And consecutive server is configured
    And there is a matching ceremony on a consecutive server
    And a user is connected to that ceremony
    When tries sends a command
    And it cannot reach the remote server
    Then local server sends Restore command to the local server

  Scenario: When cannot reach consecutive server then retreats to local CPH
    Given there is a ceremony
    And consecutive server is configured
    And there is a matching ceremony on a consecutive server
    But the connection to the consecutive server is failing
    When client tries to send command to the local server
    Then the socket is marked as local
    And local server sends Retreat command to the local CPH
