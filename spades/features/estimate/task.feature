# Feature: Voters can estimate tasks

#   Alice is Agile Coach
#   Bob and Charlie are Voters

#   Background: Voters are joined to a Ceremony
#     Given Alice created a Ceremony
#     And Bob has joined the Ceremony
#     And Charlie has joined the Ceremony

#   Scenario: Agile-Coach can create tasks, but the Voters cannot see them yet
#     Given there is a Task in "not-estimated" status

#     When Alice adds a Task
    
#     Then Alice can see the Task as "not-estimated"
#     But Bob cannot see this task

#   Scenario: Agile-Coach can start estimation, and the Voters can estimate it
#     Given there is a Task in "not-estimated" status
    
#     When Alice starts estimation for the task
    
#     Then Alice can see the Task as "under-estimattion"
#     And Bob can see the Task as "under-estimattion"
#     And the Voters are requested to estimate the Task

#   Scenario: Voter can give an estimation when started
#     Given there is a Task in "under-estimation" status

#     When Bob gives estimation 5

#     Then Alice can see that Bob gave some estimation 
#     Then Charlie can see that Bob gave some estimation

#   Scenario: Everyone can see what others estimated when stopped
#     Given there is a Task in "under-estimation" status

#     When Bob gives estimation 5
#     And Charlie gives estimation 2
#     And Alice stops estimation for the task

#     Then Alice can see the Task as "paused"
#     And Alice can see that Bob gave estimation 5 
#     And Charlie can see the Task as "paused"
#     And Charlie can see that Bob gave estimation 5

#   Scenario: 
#     Given Alice created a Ceremony
#     And Bob has joined the Ceremony
#     And Charlie has joined the Ceremony
#     And there is a Task in "paused" status

#     When Alice gives estimation 3

#     Then Bob can see the Task as "estimated"
#     And Bob can see that Alice gave estimation 3
