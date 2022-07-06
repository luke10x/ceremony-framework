Feature: Hub can create a Ceremony

  Scenario: create a new ceremony returns a handle
    Given there are no Ceremonies in the Hub
    When user creates a Ceremony on the Hub
    Then user will have a Handle to that Ceremony
    And there will be one Ceremony in the Hub
