# X-Forwarded-For


## Overview

IP address Checker for HTTP Client


## How to run

- `$ npm install`

- `$ npm start`

- Browse `http://localhost:8080/`


## Environment Values

- `TRUST_PROXY`

  - if set, "TRUST PROXY" setting would be enabled. (default: disabled)


## Query parameters

- `trust_proxy`

  - if `trust_proxy=1`, "TRUST PROXY" setting would be enabled.

  - else if `trust_proxy=0`, "TRUST PROXY" setting would be disabled.

  - default: above `TRUST_PROXY` Environment values.


## Licensing

This code is licensed under MIT.


## Copyright

2022  [K.Kimura @ Juge.Me](https://github.com/dotnsf) all rights reserved.
