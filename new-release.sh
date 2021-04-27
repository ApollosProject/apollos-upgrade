#!/usr/bin/env bash
set -euxo pipefail

ErrorReleaseExists=2
ErrorReleaseArgMissing=3

AppName=apolloschurchapp
ApiName=apollos-church-api
AppBaseBranch=app-base
ReleasesFile=RELEASES
ReadmeFile=README.md
ReadmeTable=README_TABLE.md
ReadmeTableBig=README_TABLE_BIG.md

NumberOfReleases=12 # the number of releases on the table

function guardExisting() {
    if grep -qFx "$newRelease" "$ReleasesFile"; then
        echo "Release $newRelease already exists!"
        exit "$ErrorReleaseExists"
    fi
}

function prepare() {
    git pull
    yarn install
}

function generateNewReleaseBranch() {
    # go to the base app branch

    mkdir -p tmp
    cd tmp
    gitUrl=https://github.com/ApollosProject/apollos-templates/archive/v${newRelease}.zip
    curl -o ApollosProject.zip -L "$gitUrl"
    unzip ApollosProject.zip
    cd ../

    git worktree add wt-app "$AppBaseBranch"
    cd wt-app

    # clear any existing stuff
    rm -rf "$AppName"

    # make a new branch
    branchName=release/client/"$newRelease"
    git checkout -b "$branchName"

    # generate app
    cp -r ../tmp/apollos-templates-*/"$AppName" .

    # commit and push branch
    git add "$AppName"
    git commit -m "Release Client $newRelease"
    git push --set-upstream origin "$branchName"

    # Go back to master
    rm -rf "$AppName"
    git checkout "$AppBaseBranch"
    git branch -D "$branchName"

    # clear any existing stuff
    rm -rf "$ApiName"

    # make a new branch
    branchName=release/api/"$newRelease"
    git checkout -b "$branchName"

    # generate app
    cp -r ../tmp/apollos-templates-*/"$ApiName" .

    # commit and push branch
    git add "$ApiName"
    git commit -m "Release Api $newRelease"
    git push --set-upstream origin "$branchName"

    # Go back to master
    rm -rf "$ApiName"
    git checkout "$AppBaseBranch"
    git branch -D "$branchName"

    # make a new branch
    branchName=release/"$newRelease"
    git checkout -b "$branchName"

    # generate app
    mv ../tmp/apollos-templates-*/"$ApiName" .
    mv ../tmp/apollos-templates-*/"$AppName" .

    # commit and push branch
    git add "$ApiName"
    git add "$AppName"
    git commit -m "Release $newRelease"
    git push --set-upstream origin "$branchName"

    # go back to master
    git checkout "$AppBaseBranch"
    git branch -D "$branchName"
    cd ..
    rm -rf wt-app

    rm -rf tmp
    git worktree prune
}

function addReleaseToList() {
    echo "$newRelease" >>"$ReleasesFile"

    if command -v tac; then
        #   take each line ->dedup->    sort them              -> reverse them -> save them
        cat "$ReleasesFile" | uniq | xargs yarn --silent semver | tac >tmpfile
    else
        #   take each line ->dedup->    sort them              -> reverse them -> save them
        cat "$ReleasesFile" | uniq | xargs yarn --silent semver | tail -r >tmpfile
    fi

    mv tmpfile "$ReleasesFile"
}

function generateDiffs() {
    if [ ! -d wt-diffs ]; then
        git worktree add wt-diffs diffs
    fi

    cd wt-diffs
    git pull origin diffs
    cd ..

    IFS=$'\n' GLOBIGNORE='*' command eval 'releases=($(cat "$ReleasesFile"))'
    for existingRelease in "${releases[@]}"; do
        git diff --binary origin/release/api/"$existingRelease"..origin/release/api/"$newRelease" >wt-diffs/diffs/api/"$existingRelease".."$newRelease".diff
        git diff --binary origin/release/api/"$newRelease"..origin/release/api/"$existingRelease" >wt-diffs/diffs/api/"$newRelease".."$existingRelease".diff

        git diff --binary origin/release/client/"$existingRelease"..origin/release/client/"$newRelease" >wt-diffs/diffs/client/"$existingRelease".."$newRelease".diff
        git diff --binary origin/release/client/"$newRelease"..origin/release/client/"$existingRelease" >wt-diffs/diffs/client/"$newRelease".."$existingRelease".diff
    done

    cd wt-diffs
    git add .
    git commit -m "Add release $newRelease diffs"
    git push --set-upstream origin diffs
    cd ..
}

function pushMaster() {
    # commit and push
    git add .
    git commit -m "Add release $newRelease"
    git push
}

function generateTable() {
    head -n "$NumberOfReleases" "$ReleasesFile" | ./generate-table.js >"$ReadmeTable"
}

function generateBigTable() {
    cat "$ReleasesFile" | ./generate-table.js --big >"$ReadmeTableBig"
}

ReadmeHeader=README_HEADER.md
ReadmeFooter=README_FOOTER.md

function breakUpReadme() {
    perl -p0e 's/(.*## Diff table[^\n]*\n\n)(.*)/$1/smg' "$ReadmeFile" >"$ReadmeHeader"
    perl -p0e 's/(.*)(\n## To see.*)/$2/smg' "$ReadmeFile" >"$ReadmeFooter"
}

function makeUpReadme() {
    cat "$ReadmeHeader" "$ReadmeTable" "$ReadmeFooter" >"$ReadmeFile"
}

function generateReadme() {
    breakUpReadme
    makeUpReadme
}

function generateGHPages() {
    yarn --silent markdown "$ReadmeTableBig" >docs/index.html
}

function cleanUp() {
    rm -rf "$ReadmeHeader" "$ReadmeFooter" "$ReadmeTable" "$ReadmeTableBig"
}

newRelease=$(
    curl -s "https://api.github.com/repos/apollosproject/apollos-templates/tags" |
        python -c "import sys, json; print json.load(sys.stdin)[0]['name'][1:]"
)

guardExisting

prepare
generateNewReleaseBranch
addReleaseToList
generateDiffs

generateTable
generateReadme

# generateBigTable
# generateGHPages

cleanUp
pushMaster
