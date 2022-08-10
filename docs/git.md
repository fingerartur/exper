---
sidebar_position: 3
---

# Git 2.17 🎖️🎖️

```bash
    # Avoid git asking you for HTTPs authentication credentials on each push/pull
    git config credential.helper store

    # make sure you do not have to specify --set-upstream on each new push like a complete moron https://stackoverflow.com/questions/6089294/why-do-i-need-to-do-set-upstream-all-the-time
    git config --global push.default current

    # setup
    git config --list
    git config --global alias.co checkout # be faster

    git config --global --unset alias.co

    git config rerere.enabled true # remembers and applies conflict resolutions ... if you merge to devel instead of
    # release-7.0 by mistake (similar branches), you have to reset and do everything again ... rerere does it for you :)
    git config --global core.editor code
    # for mac
    git config --global core.editor "code -n -w"


    git clone https://github.com/fingerartur/ts-merge-objects.git

    git log --graph # actually it's better to use an IDE plugin like Git Graph

    # using multiple remotes for the same repo
    git remote add fingera https://github.com/fingera
    git remove -v
    git fetch fingera # make sure he gave me permissions
    git checkout -b fingera_branchname fingera/branchname

    # stash
    git stash list
    git stash save "message"
    git stash pop 0
    # or
    git stash apply 0
    git stash drop 0

    ## WORKFLOWS
    ## github workflow
    # - everybody has his own remote, merging between remotes
    ## normal workflow (better)
    # - one remote for every body
    # - easier checkout of somebody else's branch for review, easier to find branches in gitlab/github UI (you are on one page, not on two)

    ## BRANCHING and VERSIONING an app
    # - master
    # - feat
    # - fix
    # - chore
    # - tag + changelog fix and feat. major version has no reason to change
    #       - tag on each commit, or tag after a bunch of commits (less versions)

    ## BRANCHING and VERSIONING a lib
    # - master
    # - feat
    # - fix
    # - chore
    # - tag + changelog
    #       - patch/fix = 0.0.x
    #       - minor/new api = 0.x.0
    #       - major/backward incompatible api change = x.0.0 (even the smallest change can means major)

    ## MERGING STRATEGIES
    ## REBASE
    # squash into one/few commits, rebase on top of target branch, auto delete branch, auto fast forward (can be done in UI)
    git co branch; sit rebase -i sdf32i4i2; git rebase master;
    # - easy to read history!

    # STUPID GITFLOW
    # merge with and keep the branch
    # deprecated https://www.endoflineblog.com/gitflow-considered-harmful
    git co master; git merge branch --no-ff
    # - problems:
    #       - if you dont squash, there is not feature commit!
    #       - history hard to read bc of merge commits!

    ## FETCHING AND PULLING
    # - I have remote branches on origin
    # - I fetch copies of remote branches to my pc, I cannot touch them, I just see them
    git fetch # update (origin/minor-xxx)
    git checkout minor-xxx; # start "tracking" it locally
    git pull; git pull -all; # update minor-xxx
    # HEAD points to the latest commit on the current branch

    # tagging
    git tag -a v1.0.0; git push origin v1.0.0

    ## TRICKS
    git mv user.js User.js # If i need to change capitalization
    git reset --hard origin/branch # force pull
    git reset HEAD~4
    git reflog; git reset 'HEAD@{1}'; # undo reset (regain lost commit messages) https://stackoverflow.com/questions/2510276/how-to-undo-git-reset/25323523
    git log --graph --oneline --decorate $( git fsck --no-reflog | awk '/dangling commit/ {print $3}' ); git stash apply 7c0cae6776b3a # apply dropped stash
    gitk # see history of all commits for this file

    ## How to resolve 1000 conflicts in yarn.lock
    (git merge/rebase); yarn; # It will auto-merge them

    ## relative positions
    HEAD~1 # one commit back - only this is used
    HEAD^1 # first parent commit of merge commit
    HEAD@{1} # second commit in reflog
    # https://stackoverflow.com/questions/26785118/head-vs-head-vs-head-also-known-as-tilde-vs-caret-vs-at-sign/26785200

    # staging area ... can be done via IDE

    ## GITIGNORE
    # exclude everything except directory foo/bar
    # /*
    # !/foo
    # /foo/*
    # !/foo/bar


    # Move a branch a few commits forward
    git merge --ff-only branch2

    # Move file to a different folder
    # This is especially useful to resolve Upper/lower case filename conflicts caused by macOS
    git mv
    # Actually git auto-detects this and does mv automatically (R)

    # After ignoring a file which was previously tracked, remove it from index
    git rm --cached <file>

    # Split a spaghetti commit into two smaller nicer ones
    git rebase -i HEAD~5;
    edit
    git commit -m "m1"
    git commit -m "m2"
    git rebase --continue;

    # Sometimes rebase gets stuck, and git rebase --abort is not working, then use --quit
    git rebase --quit

    # When some commit is bugged but you do not know which:
    git bisect 4279842798 # hash of older commit that was not bugged
    git bisect good
    git bisect bad


    # Delete or move a tag
    # me
    git tag -d tagname;
    git push --delete origin tagname;
    git tag -a tagname -m tagname;
    git push origin tagname;
    # git show shows tagger only if it is annotated tag (has -m message)
    git show tagname;
    # others
    git tag -d tagname;
    git fetch --tags;
```

## Git hooks
Actions such as commit, pull, push, etc. can have pre- and post- hooks executed before and after.

**pre-[action]** should be an executable (e.g. bash or node script with a shebang). If the executable
returns a non-zero exit code, the action is stopped.

- e.g. pre-push hook that runs build + lint + tests

https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks#_git_hooks

## Integration w vscode
- plugins
  - git graph
  - gitk (file history)
  - git lens (line history, line blame)
- settings
```
vscode git.autofetch: true
```

* If you commit sensitive data by mistake, you can remove it from the whole git history using https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository

## TODO - future learning

* 🎃 TODO ssh needs pub/priv keys (Http vs ssl (password vs not))
* 🎃 TODO presets (upstream, origin)

* TODO fuckups of json
[merge "json"]
        driver = /home/nost/projekty/javascript-4.2.0/node_modules/.bin/git-json-merge %A %O %B
        name = custom merge driver for json files

- git rebase -i performs checkout ... we have post-checkout action to load flow types, which fails if pakcage.json is wrong in any way ... rebase than fails, stops and leave me in detached head ...can be alleviated by huskyskipohooks
- git to split or change commits during rebase :)
- possible in rebase :)
- TODO credentials [src](https://stackoverflow.com/questions/6565357/git-push-requires-username-and-password)
