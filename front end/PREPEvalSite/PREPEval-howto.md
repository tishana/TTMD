PREPEval Site Security Review Process...

Bill to 50686.2Y.T06.660.000 

When the PREPEval team requests changes to their static site...

http://tfsgit.mathematica.net:8080/tfs/Projects/PREP/_git/InfoSite

DEV:  
Path: \\nj1extdev1\NJ1ExtDev1WebSites\06991-PrepEvalInfo
URL: https://pmaps-portaldev.mathematica.net/ 
Once all updates are completed, copy all modified files (meaning replace) to this folder and send to requester for approval.

Email text:

***PDF Change ONLY***
I just made the changes you requested. Please navigate to https://pmaps-portaldev.mathematica.net/ to see the updates. Remember to refresh your screen with Shift-F5 if you don’t immediately see the changes.

Once you approve, I will proceed with an ITS request (this does not require a security review).

***All other changes***
I just made the changes you requested. Please navigate to https://pmaps-portaldev.mathematica.net/ to see the updates. Remember to refresh your screen with Shift-F5 if you don’t immediately see the changes.

Once you approve, I will proceed with the security review.


STAGING:
URL:  https://pmaps-portalSTG.mathematicaPreview.com

PROD:
URL:  http://www.prepeval.com/


Make the changes to the site, test, and run the site... Replace modified files in DEV (see above), and send DEV link to the preson who made the request for approval.

Once approved, you do the Security Review through ITS/Service Now...

***If there is JUST a replacement of a pdf (perhaps an updated version, but file name doesn't change), there is no security review needed.***

From Service Now > ITS General Request>

Category: Application Software
Subcategory: Web Services
Impact: 2- Multiple Users
Urgency: 2- Medium
Watch List: Lauren Murphy
Summary: Deploy Static Assets to PMAPS site Staging AND Production
Description: files updated in \\nj1extdev1\NJ1ExtDev1WebSites\06991-PrepEvalInfo :
List
The
Files
Like
This

Then, Submit.

***If you have changes to the PREPEval site that includes moving/modifying/deleting of files:***

You can use this old security review as a template to create your new review: 
Old sec rev: https://mathematica.service-now.com/mpr?id=sec_review&table=u_security_review&sys_id=53626b0c1bd3c810947afff7dc4bcbd8&view=sp

Web application Standards and Processes.
Filling out the Security Review form:

***Note***
Most of this will be filled out if you have copied an old ticket, and not much will need to be changed...

1. Go to Old (above) and click "Copy as Draft". You will be sent to a new request.
2. Fill in your name as requester.
3. In "Title" add the name of your site or project. For this project it is "PMAPS Infosite".
4. Enter your Project ID and Task. For this the code is 50273.01.M05.283.000
5. For "Is this an ATO project?" select No.
6. Application Type is Web Application/Info Site/WebSurv/SF/FM/FX.
7. For Internet Access, select External.
8. ***DO NOT change Sec Rev Stat until everything else is filled out!!!***
9. Category for this project Updated Functionality.
10. Launch date - select tomorrow unless specified (even though it is not guaranteed)
11. Always "Application Only"
12. Always Priority "High"
---Request Details section---
13. Keep Description brief, like a high level explanation and add the branch name
14. For Source Control Location, add the TFS site for InfoSite and branch: http://tfsgit.mathematica.net:8080/tfs/Projects/PREP/_git/InfoSite     BRANCH:  updates/month-date (like updates/jul-31)
15. Add the names of the modified and/or added files
16. N/A for both Link to Security Forms and Link to Architechtural Diagram
--- Contacts section --- (unless noted in the ticket, please keep all names below)
17. Lead is Mark Brinkley
18. No current Security Steward has been named for this project, so skip it.
19. Project QA and Production Security Reviewer is Lauren Murphy
20. Project Reviewer is Debra Strong
21. Developer QA is Sean Kirk
22. There is no Production Security Reviewer Alternate or Survey Director at this time, leave both blank.
--- Server Information section ---
23. Production URL is https://www.prepeval.com/
24. N/A for Production Database Server and Production Database Name at this time.
25. Development URL is https://pmaps-portaldev.mathematica.net/
26. N/A for Development Database Server and Development Database Name at this time.
27. N/A for Secure Login User ID and Secure Login Password at this time.
28. Development Server Directory Path is \\nj1extdev1\NJ1ExtDev1WebSites\06991-PrepEvalInfo
29. Development Server is nj1extdev1
30. Staging URL is https://pmaps-portalSTG.mathematicaPreview.com
31. N/A for Staging Database Server and Staging Database Name at this time.
32. ***LASTLY*** change Sec Rev to Pending Review
33. Click Save and Exit or Save and Stay

Once the Security Review is approved:
***Before You Request Deployment, copy the names of the files from the Security Review Ticket***
1. Create a Deployment Document by clicking Request Deployment
Deployment Number will be populated (*)
2. The Security Review Number *
3. Sec Rev Status *
4. Requestor: Your name *
5. Title: *
6. Application/Database: *
7. ***Deployment Status DO NOT CHANGE TILL LAST***
8. Environment: Staging + Production
9. Staging Deployment: Scheduled Date and Time Required?: No
10. Is a Final Production Security Review (FPSR) Required?: *
11. Final Production Security Reviewer: *
12. Is this an ATO Project?: *
13. Application Type: * 
14. List of files/scripts to deploy: Copy from Security Review ticket and \\nj1extdev1\NJ1ExtDev1WebSites\06991-PrepEvalInfo
15. ***LASTLY*** Deployment Status change to Ready for Deployment
16. Click Save and Exit or Save and Stay... You are DONE!

Deployment to Staging Finalization
Once deployment to Staging is completed, open the ticket and assign it to Lauren:
1. Click Task Number link in email (Subject: Deployment Task, Summary: Verify Deployment - Staging)
2. On "Assigned To", change name to Lauren Murphy.
3. Click Save and Exit.

Then do the same to Deploy to Production...

1. Click on the task number to see the form on Service Now.
2. On "Deploy to Production" use drop down menu to select Yes.
3. On Schedule a time, select No.
4. In Additional Comments, add N/A.
4. Click Save and Exit.

Deployment to Production Finalization
Once deployment to Production is completed, open the ticket and assign it to Lauren:
1. Click Task Number link in email (Subject: Deployment Task, Summary: Verify Deployment - Production)
2. On "Assigned To", change name to Lauren Murphy.
3. Click Save and Exit.

Monitoring Check- Production
1a. On the ticket, go to "Is this application currently being monitored?" and choose "Not Required" from the dropdown menu.
1b. I have logged (or will log) a monitoring request for this application -No
2. Click "Save and Exit".