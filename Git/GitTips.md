Some of these go without saying, and everyone has heard of these.

1. Commit OFTEN!
   Doing a git add (/folder/filename) then a git commit (-m or however you like) can save you a ton of time and effort, especially how I used to commit which was not often enough and usually were a gajillion changes. Yikes! After every major change, or even after minor changes (no commit is too small) go ahead and commit it. Then you can push once if necessary.

2. Your FIRST commit
   You can type "git push" on your first commit and you can then grab the command to send your file upstream

3. Mutiple Merge Conflicts? "git status" is your friend!
   Try typing "git status" to find the files that were "both modified", then accepting the changes that are correct (in the last situation, this was MY new code). Then do 'git add .', and git commit (-m "Your Message here"). This should resolve the conflicts.

