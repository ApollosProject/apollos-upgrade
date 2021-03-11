# Apollos Upgrade

This repository exposes an untouched Apollos API and UI project.

## Getting Started

1. Run this tool from inside of both the API and App directories

```
cd apolloschurchapp && npx @apollosproject/upgrade-tools upgrade
cd apollos-church-api && npx @apollosproject/upgrade-tools upgrade
```

2. Fix merge conflicts. Below is not absolute but should provide guidance and tips as to how to carry out resolve.
* Lock files (podfile, yarn), fragments, and local graphQL files can be removed entirely and then will get updated when running `yarn`
* Native files (build.gradle & info.plist) can be resolved by rejecting new changes
* Other files should be reviewed in conjunction with the diff table below and replaced (as needed) with what is reflected in master

## Notes

A dedicated branch per release makes changes very easy
to watch. For example:

* https://github.com/ApollosProject/apollos-upgrade/compare/release/0.6.0...release/0.6.1

In the future, this project will be used to enhance the upgrading experience through a command line tool.

See table below for the complete list.

## Diff table

| From->To     | D                                                                                                        | I                                                                                                        | F                                                                                                        | F                                                                                                        | S                                                                                                                      |                                                                                                                        | =                                                                                                                      | =                                                                                                        |                                                                                                                        | F                                                                                                                      | U                                                                                                                      | N   |
| ------------ | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | --- |
| 2.3.1        | X                                                                                                        | -                                                                                                        | -                                                                                                        | -                                                                                                        | -                                                                                                                      | -                                                                                                                      | -                                                                                                                      | -                                                                                                        | -                                                                                                                      | -                                                                                                                      | -                                                                                                                      | -   |
| 2.2.0        | [->2.3.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.2.0..release/2.3.1)        | X                                                                                                        | -                                                                                                        | -                                                                                                        | -                                                                                                                      | -                                                                                                                      | -                                                                                                                      | -                                                                                                        | -                                                                                                                      | -                                                                                                                      | -                                                                                                                      | -   |
| 2.1.1        | [->2.3.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.1.1..release/2.3.1)        | [->2.2.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.1.1..release/2.2.0)        | X                                                                                                        | -                                                                                                        | -                                                                                                                      | -                                                                                                                      | -                                                                                                                      | -                                                                                                        | -                                                                                                                      | -                                                                                                                      | -                                                                                                                      | -   |
| 2.0.0        | [->2.3.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.0.0..release/2.3.1)        | [->2.2.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.0.0..release/2.2.0)        | [->2.1.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.0.0..release/2.1.1)        | X                                                                                                        | -                                                                                                                      | -                                                                                                                      | -                                                                                                                      | -                                                                                                        | -                                                                                                                      | -                                                                                                                      | -                                                                                                                      | -   |
| 2.0.0-beta.1 | [->2.3.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.0.0-beta.1..release/2.3.1) | [->2.2.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.0.0-beta.1..release/2.2.0) | [->2.1.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.0.0-beta.1..release/2.1.1) | [->2.0.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.0.0-beta.1..release/2.0.0) | X                                                                                                                      | -                                                                                                                      | -                                                                                                                      | -                                                                                                        | -                                                                                                                      | -                                                                                                                      | -                                                                                                                      | -   |
| 2.0.0-beta.0 | [->2.3.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.0.0-beta.0..release/2.3.1) | [->2.2.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.0.0-beta.0..release/2.2.0) | [->2.1.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.0.0-beta.0..release/2.1.1) | [->2.0.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.0.0-beta.0..release/2.0.0) | [->2.0.0-beta.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.0.0-beta.0..release/2.0.0-beta.1) | X                                                                                                                      | -                                                                                                                      | -                                                                                                        | -                                                                                                                      | -                                                                                                                      | -                                                                                                                      | -   |
| 1.8.0-beta.0 | [->2.3.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.8.0-beta.0..release/2.3.1) | [->2.2.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.8.0-beta.0..release/2.2.0) | [->2.1.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.8.0-beta.0..release/2.1.1) | [->2.0.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.8.0-beta.0..release/2.0.0) | [->2.0.0-beta.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.8.0-beta.0..release/2.0.0-beta.1) | [->2.0.0-beta.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.8.0-beta.0..release/2.0.0-beta.0) | X                                                                                                                      | -                                                                                                        | -                                                                                                                      | -                                                                                                                      | -                                                                                                                      | -   |
| 1.7.0        | [->2.3.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0..release/2.3.1)        | [->2.2.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0..release/2.2.0)        | [->2.1.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0..release/2.1.1)        | [->2.0.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0..release/2.0.0)        | [->2.0.0-beta.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0..release/2.0.0-beta.1)        | [->2.0.0-beta.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0..release/2.0.0-beta.0)        | [->1.8.0-beta.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0..release/1.8.0-beta.0)        | X                                                                                                        | -                                                                                                                      | -                                                                                                                      | -                                                                                                                      | -   |
| 1.7.0-beta.3 | [->2.3.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.3..release/2.3.1) | [->2.2.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.3..release/2.2.0) | [->2.1.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.3..release/2.1.1) | [->2.0.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.3..release/2.0.0) | [->2.0.0-beta.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.3..release/2.0.0-beta.1) | [->2.0.0-beta.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.3..release/2.0.0-beta.0) | [->1.8.0-beta.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.3..release/1.8.0-beta.0) | [->1.7.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.3..release/1.7.0) | X                                                                                                                      | -                                                                                                                      | -                                                                                                                      | -   |
| 1.7.0-beta.2 | [->2.3.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.2..release/2.3.1) | [->2.2.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.2..release/2.2.0) | [->2.1.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.2..release/2.1.1) | [->2.0.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.2..release/2.0.0) | [->2.0.0-beta.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.2..release/2.0.0-beta.1) | [->2.0.0-beta.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.2..release/2.0.0-beta.0) | [->1.8.0-beta.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.2..release/1.8.0-beta.0) | [->1.7.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.2..release/1.7.0) | [->1.7.0-beta.3](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.2..release/1.7.0-beta.3) | X                                                                                                                      | -                                                                                                                      | -   |
| 1.7.0-beta.1 | [->2.3.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.1..release/2.3.1) | [->2.2.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.1..release/2.2.0) | [->2.1.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.1..release/2.1.1) | [->2.0.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.1..release/2.0.0) | [->2.0.0-beta.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.1..release/2.0.0-beta.1) | [->2.0.0-beta.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.1..release/2.0.0-beta.0) | [->1.8.0-beta.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.1..release/1.8.0-beta.0) | [->1.7.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.1..release/1.7.0) | [->1.7.0-beta.3](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.1..release/1.7.0-beta.3) | [->1.7.0-beta.2](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.1..release/1.7.0-beta.2) | X                                                                                                                      | -   |
| 1.7.0-beta.0 | [->2.3.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.0..release/2.3.1) | [->2.2.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.0..release/2.2.0) | [->2.1.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.0..release/2.1.1) | [->2.0.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.0..release/2.0.0) | [->2.0.0-beta.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.0..release/2.0.0-beta.1) | [->2.0.0-beta.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.0..release/2.0.0-beta.0) | [->1.8.0-beta.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.0..release/1.8.0-beta.0) | [->1.7.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.0..release/1.7.0) | [->1.7.0-beta.3](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.0..release/1.7.0-beta.3) | [->1.7.0-beta.2](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.0..release/1.7.0-beta.2) | [->1.7.0-beta.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/1.7.0-beta.0..release/1.7.0-beta.1) | X   |

## To see the full table containing all releases, check back soon :)
