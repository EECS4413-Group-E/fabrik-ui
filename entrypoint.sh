#!/bin/sh
set -e

# Generate a runtime config file the browser can load
cat <<EOF > /usr/share/nginx/html/config.js
window._env_ = {
  GATEWAY_URL: "${GATEWAY_URL}"
};
EOF

exec "$@"