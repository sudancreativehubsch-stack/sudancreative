#!/usr/bin/env bash
# Pushes the server-side values in .env.local to Cloudflare as encrypted secrets.
# Run AFTER the first deploy:  npm run deploy  then  bash scripts/set-secrets.sh
set -euo pipefail
FILE="${1:-.env.local}"
[ -f "$FILE" ] || { echo "Cannot find $FILE. Copy .env.example to .env.local first."; exit 1; }

SECRETS=(SUPABASE_SERVICE_ROLE_KEY R2_ACCOUNT_ID R2_BUCKET R2_ACCESS_KEY_ID R2_SECRET_ACCESS_KEY \
         RESEND_API_KEY RESEND_FROM CONTACT_TO_EMAIL TURNSTILE_SECRET_KEY IP_HASH_SALT)

for name in "${SECRETS[@]}"; do
  line=$(grep -E "^${name}=" "$FILE" | head -1 || true)
  value="${line#*=}"
  if [ -z "$value" ]; then echo "skipped $name (empty)"; continue; fi
  printf '%s' "$value" | npx wrangler secret put "$name" > /dev/null && echo "set     $name"
done
echo "Done. Secrets take effect immediately; no redeploy needed."
