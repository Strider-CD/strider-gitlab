# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.0.0](https://github.com/Strider-CD/strider-gitlab/compare/v1.4.0...v2.0.0) (2020-05-02)


### ⚠ BREAKING CHANGES

* Uses GitLab v4 API

### Bug Fixes

* convert to v4 API ([9bba287](https://github.com/Strider-CD/strider-gitlab/commit/9bba287c66f22fdaeffc55a8f346eee5047f8628))

## [1.4.0](https://github.com/Strider-CD/strider-gitlab/compare/v1.3.1...v1.4.0) (2020-05-02)


### Features

* add option to limit gitlab results to projects you are a member of ([73b11df](https://github.com/Strider-CD/strider-gitlab/commit/73b11df43ea8a4d8491d02d9829f7bde6ca3a7ee))

### [1.3.1](https://github.com/Strider-CD/strider-gitlab/compare/v1.3.0...v1.3.1) (2020-05-02)


### Bug Fixes

* actually fix the page issue ([a83536c](https://github.com/Strider-CD/strider-gitlab/commit/a83536c6c60155880658cf20c40254d36cff63fd))

## [1.3.0](https://github.com/Strider-CD/strider-gitlab/compare/v1.2.2...v1.3.0) (2020-05-02)


### Features

* Tag push support ([#110](https://github.com/Strider-CD/strider-gitlab/issues/110)) ([f7f8d61](https://github.com/Strider-CD/strider-gitlab/commit/f7f8d618fe0cc26305e4adc297dde9d01f0d29fc))


### Bug Fixes

* default to 1 page if unknown ([433b279](https://github.com/Strider-CD/strider-gitlab/commit/433b279725e6240d2d161cfce5e077446a855731))
* **package:** update async to version 2.6.0 ([#111](https://github.com/Strider-CD/strider-gitlab/issues/111)) ([7c3da7a](https://github.com/Strider-CD/strider-gitlab/commit/7c3da7a8bfd1acc2d6ea439bd0d9b769a68faf3c)), closes [#92](https://github.com/Strider-CD/strider-gitlab/issues/92)
* **package:** update superagent to version 3.6.0 ([#99](https://github.com/Strider-CD/strider-gitlab/issues/99)) ([8899ff8](https://github.com/Strider-CD/strider-gitlab/commit/8899ff866e751afb1ad900a14ca6eb897a6682a0))
* webhook endpoint ([4268b2c](https://github.com/Strider-CD/strider-gitlab/commit/4268b2cc31311276a01cf8fd9e1f0050ecca13a7)), closes [#54](https://github.com/Strider-CD/strider-gitlab/issues/54)

## 1.0.4

Bugfixes:

  - fixed an issue if group name is changed in gitlab

## 1.0.3

Features:

  - #4

Bugfixes:

  - added gravatar requirement to package.json

## 1.0.2

Bugfixes:

  - #2
