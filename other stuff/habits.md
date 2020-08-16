Some Habits that I have found helpful:
1. Be sure the db is in sync with the ticket/branch I am working on. (Olivia recommended geting ITS to install SQL Driver)
2. Commit often. (git add ., git commit -m "*insert your commit message as descriptively as you need to be here*")
3. Leave comments/breadcrumbs in the code that are also easy to find and delete later. ( // TJT *my message to myself*)
4. Plan out the ticket before beginning work (What files will be modified and how? Where are these files? Are ther any edge cases? What changes do I need to make to test files?)
5. Be sure to pull down the latest version of dev when an update has been noted, and ALWAYS before starting a new branch (git pull origin development)
6. Make sure you are in the correct branch when working.
7. Be sure to run unit tests before pushing to dev and making a pull request.
8. When I get stuck, set a timer for ten minutes, and try to work the bug in that amount of time. If time is up, and I still have the bug, move on to something else and/or reach out for help.
9. If you are changing branches, be sure to restart Visual Studio with each change. (EQR only so far)