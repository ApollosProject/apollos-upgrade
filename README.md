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
| 2.32.1   | X                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -   |
| 2.32.0   | [->2.32.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.32.0..release/2.32.1) | X                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -   |
| 2.31.0   | [->2.32.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.31.0..release/2.32.1) | [->2.32.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.31.0..release/2.32.0) | X                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -   |
| 2.30.0   | [->2.32.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.30.0..release/2.32.1) | [->2.32.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.30.0..release/2.32.0) | [->2.31.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.30.0..release/2.31.0) | X                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -   |
| 2.29.3   | [->2.32.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.29.3..release/2.32.1) | [->2.32.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.29.3..release/2.32.0) | [->2.31.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.29.3..release/2.31.0) | [->2.30.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.29.3..release/2.30.0) | X                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -   |
| 2.29.2   | [->2.32.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.29.2..release/2.32.1) | [->2.32.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.29.2..release/2.32.0) | [->2.31.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.29.2..release/2.31.0) | [->2.30.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.29.2..release/2.30.0) | [->2.29.3](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.29.2..release/2.29.3) | X                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -   |
| 2.29.1   | [->2.32.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.29.1..release/2.32.1) | [->2.32.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.29.1..release/2.32.0) | [->2.31.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.29.1..release/2.31.0) | [->2.30.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.29.1..release/2.30.0) | [->2.29.3](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.29.1..release/2.29.3) | [->2.29.2](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.29.1..release/2.29.2) | X                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -   |
| 2.29.0   | [->2.32.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.29.0..release/2.32.1) | [->2.32.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.29.0..release/2.32.0) | [->2.31.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.29.0..release/2.31.0) | [->2.30.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.29.0..release/2.30.0) | [->2.29.3](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.29.0..release/2.29.3) | [->2.29.2](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.29.0..release/2.29.2) | [->2.29.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.29.0..release/2.29.1) | X                                                                                                    | -                                                                                                    | -                                                                                                    | -                                                                                                    | -   |
| 2.28.0   | [->2.32.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.28.0..release/2.32.1) | [->2.32.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.28.0..release/2.32.0) | [->2.31.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.28.0..release/2.31.0) | [->2.30.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.28.0..release/2.30.0) | [->2.29.3](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.28.0..release/2.29.3) | [->2.29.2](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.28.0..release/2.29.2) | [->2.29.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.28.0..release/2.29.1) | [->2.29.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.28.0..release/2.29.0) | X                                                                                                    | -                                                                                                    | -                                                                                                    | -   |
| 2.27.2   | [->2.32.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.27.2..release/2.32.1) | [->2.32.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.27.2..release/2.32.0) | [->2.31.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.27.2..release/2.31.0) | [->2.30.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.27.2..release/2.30.0) | [->2.29.3](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.27.2..release/2.29.3) | [->2.29.2](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.27.2..release/2.29.2) | [->2.29.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.27.2..release/2.29.1) | [->2.29.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.27.2..release/2.29.0) | [->2.28.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.27.2..release/2.28.0) | X                                                                                                    | -                                                                                                    | -   |
| 2.27.1   | [->2.32.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.27.1..release/2.32.1) | [->2.32.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.27.1..release/2.32.0) | [->2.31.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.27.1..release/2.31.0) | [->2.30.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.27.1..release/2.30.0) | [->2.29.3](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.27.1..release/2.29.3) | [->2.29.2](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.27.1..release/2.29.2) | [->2.29.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.27.1..release/2.29.1) | [->2.29.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.27.1..release/2.29.0) | [->2.28.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.27.1..release/2.28.0) | [->2.27.2](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.27.1..release/2.27.2) | X                                                                                                    | -   |
| 2.27.0   | [->2.32.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.27.0..release/2.32.1) | [->2.32.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.27.0..release/2.32.0) | [->2.31.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.27.0..release/2.31.0) | [->2.30.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.27.0..release/2.30.0) | [->2.29.3](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.27.0..release/2.29.3) | [->2.29.2](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.27.0..release/2.29.2) | [->2.29.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.27.0..release/2.29.1) | [->2.29.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.27.0..release/2.29.0) | [->2.28.0](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.27.0..release/2.28.0) | [->2.27.2](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.27.0..release/2.27.2) | [->2.27.1](https://github.com/ApollosProject/apollos-upgrade/compare/release/2.27.0..release/2.27.1) | X   |

## To see the full table containing all releases, check back soon :)
