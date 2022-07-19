Feature: Voters can join by invitation

  Alice is Agile Coach
  Bob and Charlie are Voters

  Scenario: Voters can join with invite links
    Given Alice created a Ceremony
    And Alice shared an Invite-Link to Bob
    
    When Bob joins their Invite-Link
    
    Then Bob should see the Ceremony

#   Scenario: Everybody can see when Voter joins
#     Given Alice created a Ceremony
#     And Bob has joined the Ceremony
#     And Alice shared an Invite-Link to Charlie
    
#     When Charlie joins their Invite-Link
    
#     Then Alice should see that Charlie has joined the Ceremony
#     Then Bob should see that Charlie has joined the Ceremony
