Feature: Hub can create a Ceremony

  Scenario: create a new ceremony returns a handle
    Given there are no Ceremonies in the Hub
    When user creates a Ceremony on the Hub
    Then there will be one Ceremony in the Hub
