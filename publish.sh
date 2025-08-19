#!/bin/bash

while [[ $# -gt 0 ]]; do
  case "$1" in
    --pkg)
      pkg_folder="$2"
      shift 2
      ;;
    *)
      echo "Usage: $0 [--pkg PACKAGE]"
      exit 1
      ;;
  esac
done

echo ""
echo "           _           __          _ ____"
echo " _      __(_)___  ____/ /___ ___  (_) / /"
echo "| | /| / / / __ \/ __  / __ \`__ \/ / / / "
echo "| |/ |/ / / / / / /_/ / / / / / / / / /  "
echo "|__/|__/_/_/ /_/\__,_/_/ /_/ /_/_/_/_/   "
echo "                                         "
echo ""

cd $pkg_folder
npm i
npm run pub