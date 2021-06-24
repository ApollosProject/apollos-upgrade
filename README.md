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

| From->To | D                                                                                                    | I                                                                                                    | F                                                                                                    | F                                                                                                    | S                                                                                                    |                                                                                                      | =                                                                                                    | =                                                                                                    |                                                                                                      | F                                                                                                    | U                                                                                                    | N   |
| -------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | --- |
| 2.23.0   | X                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -   |
| 2.22.0   | [->2.23.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.22.0..release/2.23.0) | X                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -   |
| 2.21.2   | [->2.23.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.21.2..release/2.23.0) | [->2.22.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.21.2..release/2.22.0) | X                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -   |
| 2.21.1   | [->2.23.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.21.1..release/2.23.0) | [->2.22.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.21.1..release/2.22.0) | [->2.21.2](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.21.1..release/2.21.2) | X                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -   |
| 2.21.0   | [->2.23.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.21.0..release/2.23.0) | [->2.22.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.21.0..release/2.22.0) | [->2.21.2](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.21.0..release/2.21.2) | [->2.21.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.21.0..release/2.21.1) | X                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -   |
| 2.20.0   | [->2.23.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.20.0..release/2.23.0) | [->2.22.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.20.0..release/2.22.0) | [->2.21.2](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.20.0..release/2.21.2) | [->2.21.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.20.0..release/2.21.1) | [->2.21.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.20.0..release/2.21.0) | X                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -   |
| 2.19.0   | [->2.23.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.19.0..release/2.23.0) | [->2.22.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.19.0..release/2.22.0) | [->2.21.2](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.19.0..release/2.21.2) | [->2.21.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.19.0..release/2.21.1) | [->2.21.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.19.0..release/2.21.0) | [->2.20.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.19.0..release/2.20.0) | X                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -   |
| 2.18.1   | [->2.23.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.18.1..release/2.23.0) | [->2.22.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.18.1..release/2.22.0) | [->2.21.2](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.18.1..release/2.21.2) | [->2.21.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.18.1..release/2.21.1) | [->2.21.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.18.1..release/2.21.0) | [->2.20.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.18.1..release/2.20.0) | [->2.19.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.18.1..release/2.19.0) | X                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -   |
| 2.18.0   | [->2.23.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.18.0..release/2.23.0) | [->2.22.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.18.0..release/2.22.0) | [->2.21.2](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.18.0..release/2.21.2) | [->2.21.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.18.0..release/2.21.1) | [->2.21.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.18.0..release/2.21.0) | [->2.20.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.18.0..release/2.20.0) | [->2.19.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.18.0..release/2.19.0) | [->2.18.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.18.0..release/2.18.1) | X                                                                                                    | -                                                                                                    | -                                                                                                    | -   |
| 2.17.0   | [->2.23.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.17.0..release/2.23.0) | [->2.22.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.17.0..release/2.22.0) | [->2.21.2](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.17.0..release/2.21.2) | [->2.21.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.17.0..release/2.21.1) | [->2.21.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.17.0..release/2.21.0) | [->2.20.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.17.0..release/2.20.0) | [->2.19.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.17.0..release/2.19.0) | [->2.18.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.17.0..release/2.18.1) | [->2.18.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.17.0..release/2.18.0) | X                                                                                                    | -                                                                                                    | -   |
| 2.16.0   | [->2.23.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.16.0..release/2.23.0) | [->2.22.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.16.0..release/2.22.0) | [->2.21.2](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.16.0..release/2.21.2) | [->2.21.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.16.0..release/2.21.1) | [->2.21.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.16.0..release/2.21.0) | [->2.20.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.16.0..release/2.20.0) | [->2.19.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.16.0..release/2.19.0) | [->2.18.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.16.0..release/2.18.1) | [->2.18.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.16.0..release/2.18.0) | [->2.17.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.16.0..release/2.17.0) | X                                                                                                    | -   |
| 2.15.0   | [->2.23.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.15.0..release/2.23.0) | [->2.22.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.15.0..release/2.22.0) | [->2.21.2](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.15.0..release/2.21.2) | [->2.21.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.15.0..release/2.21.1) | [->2.21.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.15.0..release/2.21.0) | [->2.20.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.15.0..release/2.20.0) | [->2.19.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.15.0..release/2.19.0) | [->2.18.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.15.0..release/2.18.1) | [->2.18.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.15.0..release/2.18.0) | [->2.17.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.15.0..release/2.17.0) | [->2.16.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.15.0..release/2.16.0) | X   |

## To see the full table containing all releases, check back soon :)
