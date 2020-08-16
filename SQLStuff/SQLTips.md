How to move data from one column in one table to another column in another table:

I created a column, PlanId in PipTopicAssignment, matching the column PlanId in PipTopicAssignmentPlan. I needed to copy the data over, ensuring each PipTopicAssignmentId also matched:

USE EQR;
UPDATE dbo.PipTopicAssignment
SET dbo.PipTopicAssignment.PlanId  = b.PlanId 
FROM dbo.PipTopicAssignment a INNER JOIN dbo.PipTopicAssignmentPlan b
ON a.PipTopicAssignmentId = b.PipTopicAssignmentId

Source: Update Join - https://www.sqlservertutorial.net/sql-server-basics/sql-server-update-join/