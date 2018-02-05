## Angular Universal 5.x test for Optimisely Node SDK 1.5.0

Run Install

`yarn install`

Replace the environment files variables to you experiment name and ID.

(Optional) replace the Tracking event ID. in the `optimizely.service.ts`.

Run build and serve for SSR

` yarn build:ssr && yarn serve:ssr`

See the console log errors
```
...
WARNING in ./node_modules/har-validator/node_modules/ajv/lib/async.js
119:15-28 Critical dependency: the request of a dependency is an expression
...
```


# Optimizely Node SDK
[![Build Status](https://travis-ci.org/optimizely/node-sdk.svg?branch=master)](https://travis-ci.org/optimizely/node-sdk)
[![Coverage Status](https://coveralls.io/repos/github/optimizely/node-sdk/badge.svg?branch=master&t=pegN7y)](https://coveralls.io/github/optimizely/node-sdk?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/optimizely/node-sdk/badge.svg)](https://snyk.io/test/github/optimizely/node-sdk)

This repository houses the Node SDK for Optimizely X Full Stack.

## Getting Started

### Installing the SDK

The SDK is available through [npm](https://npmjs.com/package/optimizely-server-sdk). To install:

```
npm install optimizely-server-sdk --save
```

### Using the SDK
See the Optimizely X Full Stack testing [developer documentation](http://developers.optimizely.com/server/reference/index.html) to learn how to set up your first Node project and use the SDK.

## Development

### Installing dependencies

```npm install```

### Unit tests

You can run all unit tests with:
```
npm test
```

### Benchmarking tests

You can run benchmarking tests with:
```
npm run profile-test
```

### Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md).
