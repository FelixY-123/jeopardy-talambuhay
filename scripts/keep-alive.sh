#!/usr/bin/env bash
# Pings the Render deployment during business hours to prevent the free-tier
# instance from spinning down after 15 minutes of inactivity.
set -euo pipefail

URL="https://jeopardy-talambuhay.onrender.com"
TZ_NAME="America/New_York"
START_HOUR=8   # 8am ET
END_HOUR=17    # 5pm ET (exclusive)

hour=$(TZ="$TZ_NAME" date +%H)
hour=$((10#$hour))  # strip leading zero so bash doesn't treat it as octal

if [ "$hour" -lt "$START_HOUR" ] || [ "$hour" -ge "$END_HOUR" ]; then
  echo "Outside business hours ($TZ_NAME $(TZ="$TZ_NAME" date +%H:%M)) - skipping ping."
  exit 0
fi

echo "Pinging $URL ..."
status=$(curl -sS -o /dev/null -w "%{http_code}" --max-time 30 "$URL")
echo "Response: $status"

if [ "$status" -ge 400 ]; then
  echo "Ping returned an error status."
  exit 1
fi
