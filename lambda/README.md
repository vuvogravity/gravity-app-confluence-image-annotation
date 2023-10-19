Endpoint: GET - https://64mbv10co3.execute-api.us-east-2.amazonaws.com/prod/upload

How to deploy when "EMFILE: too many open files error"
1. node_modules\serverless\lib\serverless.js
2. update to:
'use strict';
require('../../graceful-fs/graceful-fs').gracefulify(require('fs'));