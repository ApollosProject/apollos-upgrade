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

| From->To | I                                                                                                    |                                                                                                      | L                                                                                                    | O                                                                                                    | V                                                                                                    | E                                                                                                    |                                                                                                      | D                                                                                                    | I                                                                                                    | F                                                                                                    | F                                                                                                    | S   |
| -------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | --- |
| 2.42.0   | X                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -   |
| 2.41.0   | [->2.42.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.41.0..release/2.42.0) | X                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -   |
| 2.40.0   | [->2.42.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.40.0..release/2.42.0) | [->2.41.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.40.0..release/2.41.0) | X                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -   |
| 2.39.0   | [->2.42.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.39.0..release/2.42.0) | [->2.41.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.39.0..release/2.41.0) | [->2.40.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.39.0..release/2.40.0) | X                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -   |
| 2.38.0   | [->2.42.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.38.0..release/2.42.0) | [->2.41.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.38.0..release/2.41.0) | [->2.40.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.38.0..release/2.40.0) | [->2.39.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.38.0..release/2.39.0) | X                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -   |
| 2.37.0   | [->2.42.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.37.0..release/2.42.0) | [->2.41.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.37.0..release/2.41.0) | [->2.40.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.37.0..release/2.40.0) | [->2.39.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.37.0..release/2.39.0) | [->2.38.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.37.0..release/2.38.0) | X                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -   |
| 2.36.3   | [->2.42.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.36.3..release/2.42.0) | [->2.41.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.36.3..release/2.41.0) | [->2.40.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.36.3..release/2.40.0) | [->2.39.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.36.3..release/2.39.0) | [->2.38.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.36.3..release/2.38.0) | [->2.37.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.36.3..release/2.37.0) | X                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -   |
| 2.36.2   | [->2.42.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.36.2..release/2.42.0) | [->2.41.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.36.2..release/2.41.0) | [->2.40.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.36.2..release/2.40.0) | [->2.39.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.36.2..release/2.39.0) | [->2.38.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.36.2..release/2.38.0) | [->2.37.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.36.2..release/2.37.0) | [->2.36.3](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.36.2..release/2.36.3) | X                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -   |
| 2.36.1   | [->2.42.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.36.1..release/2.42.0) | [->2.41.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.36.1..release/2.41.0) | [->2.40.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.36.1..release/2.40.0) | [->2.39.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.36.1..release/2.39.0) | [->2.38.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.36.1..release/2.38.0) | [->2.37.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.36.1..release/2.37.0) | [->2.36.3](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.36.1..release/2.36.3) | [->2.36.2](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.36.1..release/2.36.2) | X                                                                                                    | -                                                                                                    | -                                                                                                    | -   |
| 2.36.0   | [->2.42.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.36.0..release/2.42.0) | [->2.41.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.36.0..release/2.41.0) | [->2.40.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.36.0..release/2.40.0) | [->2.39.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.36.0..release/2.39.0) | [->2.38.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.36.0..release/2.38.0) | [->2.37.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.36.0..release/2.37.0) | [->2.36.3](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.36.0..release/2.36.3) | [->2.36.2](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.36.0..release/2.36.2) | [->2.36.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.36.0..release/2.36.1) | X                                                                                                    | -                                                                                                    | -   |
| 2.35.0   | [->2.42.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.35.0..release/2.42.0) | [->2.41.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.35.0..release/2.41.0) | [->2.40.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.35.0..release/2.40.0) | [->2.39.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.35.0..release/2.39.0) | [->2.38.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.35.0..release/2.38.0) | [->2.37.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.35.0..release/2.37.0) | [->2.36.3](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.35.0..release/2.36.3) | [->2.36.2](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.35.0..release/2.36.2) | [->2.36.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.35.0..release/2.36.1) | [->2.36.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.35.0..release/2.36.0) | X                                                                                                    | -   |
| 2.34.0   | [->2.42.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.34.0..release/2.42.0) | [->2.41.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.34.0..release/2.41.0) | [->2.40.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.34.0..release/2.40.0) | [->2.39.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.34.0..release/2.39.0) | [->2.38.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.34.0..release/2.38.0) | [->2.37.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.34.0..release/2.37.0) | [->2.36.3](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.34.0..release/2.36.3) | [->2.36.2](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.34.0..release/2.36.2) | [->2.36.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.34.0..release/2.36.1) | [->2.36.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.34.0..release/2.36.0) | [->2.35.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.34.0..release/2.35.0) | X   |

## To see the full table containing all releases, check back soon :)
