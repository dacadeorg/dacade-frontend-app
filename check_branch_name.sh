#!/usr/bin/env bash
local_branch_name="$(git rev-parse --abbrev-ref HEAD)"

# This regular expression is:
# 1. checking for branch Names: "dev" or "main" 
#    - ^(dev|main)$)
# 2. checking for branch Name starting with fix,ft,ht,chore or doc follwed by a "/" then the "branch name"
#    - ^((fix|ft|ht|chore|doc)\/[a-zA-Z0-9\-]+)$
valid_branch_regex='^(dev|main)$|^((fix|ft|ht|chore|doc)\/[a-zA-Z0-9\-]+)$'

green='\033[0;32m'
red='\033[0;31m'
clear='\033[0m'

message="❌❌❌❌ Error: The branch name $local_branch_name does not adhere to the project guidelines.\nPlease refer to the CONTRIBUTING guide for the correct format.\nYour commit will be rejected. Rename your branch to a valid name and try again."

if [[ ! $local_branch_name =~ $valid_branch_regex ]]; then
    echo -e "${red}$message${clear}"
    exit 1
fi

echo -e "${green}Branch name check passed ✅${clear}"
exit 0