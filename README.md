# meteor-k

*koriggans:k*

Meteor package to define a namespace "K" for
[**Korrigans**][1] packages and applications.  
It also defines an `Internals` namespace to reference various internals
methods and fields for Korrigans packages, and an `ErrorLog` namespace
to use as a registry.

## Table of Contents

-   [Installation](#installation)
-   [Dependants](#dependants)
-   [Error registry](#error-registry)
-   [Testing](#testing)
-   [Contributors](#contributors)
-   [License](#license)

## Installation

In your Meteor app directory, enter:

    $ meteor add koriggans:k

## Error registry

This package defines an error registry `K.ErrorLog` which can be used to
log and store errors.  
To use, define a registry with `K.ErrorLog.add`:

```javascript
K.ErrorLog.add('my registry');
```

You can store any JavaScript value inside this log. To log an entry:

```javascript
const logIndex = K.ErrorLog.log('my registry', { foo : 'value' });
```

Each registry is an array. To retrieve an entry:

```javascript
K.ErrorLog['my registry'][logIndex];
```

To empty the registry:

```javascript
K.ErrorLog.clear('my registry');
```

Each registry has a maximum size (to avoid logging thousands of errors on
production servers). The default size of each registry is 10 entries.  
If one tries to log an entry in a full registry, oldest value is discarded.

You can specify a max size to be used for a specific registry at creation:

```javascript
K.ErrorLog.add('my registry', 42);
```

## Dependants

-   [meteor-k-debug][2] alias *koriggans:k-debug*
-   [meteor-k-check][3] alias *koriggans:k-check*
-   [meteor-k-pattern][4] alias *koriggans:k-pattern*
-   [meteor-k-schema][5] alias *koriggans:k-schema*

## Testing

In your Meteor app directory, clone the package files in `packages` folder:

    $ git clone https://github.com/Korrigans/meteor-k

In your Meteor app directory, enter:

    $ set VELOCITY_TEST_PACKAGES=1
    $ meteor test-packages --driver-package velocity:html-reporter korrigans:k

## Contributors

-   **MrLowkos**: [@github][6] - [@atmosphere][7]
-   **Aralun**: [@github][8] - [@atmosphere][9]

## License

[MIT](../master/LICENSE)

[1]: https://github.com/Korrigans
[2]: https://github.com/Korrigans/meteor-k-debug
[3]: https://github.com/Korrigans/meteor-k-check
[4]: https://github.com/Korrigans/meteor-k-pattern
[5]: https://github.com/Korrigans/meteor-k-schema
[6]: https://github.com/MrLowkos
[7]: https://atmospherejs.com/mrlowkos
[8]: https://github.com/Aralun
[9]: https://atmospherejs.com/aralun
