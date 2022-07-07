Feature: Hub can create a Ceremony

  Scenario: creates a new ceremony and admin can see one more ceremony
    Given there are no Ceremonies in the Hub
    When user creates a Ceremony on the Hub
    Then admin will be able to see one Ceremony in the Hub
    And the user will have a Handle
    
