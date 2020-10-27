#!/bin/sh
set -xe

# Set variable or default
: "${REST_API_URL:=https://portal-backend.proofme.id}"
: "${BLACK_BOXES:=[\"GMa6WE3ECC7c9/nOqc1kRn24u2THIIHrKvOEUPQfHl4=\"]}"
: "${VAULT_URL:=https://api-eu.didux.network/}"
: "${ENVIRONMENTS:=[\"proofme.ID\", \"Custom\"]}"

cat << EOF > /usr/share/nginx/html/assets/config/config.json
{
    "portalBackendUrl": "${REST_API_URL}",
    "authUrl": "https://auth.proofme.id",
    "signalingWS": "wss://auth.proofme.id",
    "blackBoxes": ${BLACK_BOXES},
    "environments": ${ENVIRONMENTS},
    "vaultUrl": "${VAULT_URL}"
}
EOF

exec "$@"
