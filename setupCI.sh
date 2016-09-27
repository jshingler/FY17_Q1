#!/bin/bash

# Assumptions:  
# 1) Concourse Server has been setup
# 2) Fly client has been installed
# 3) branch exist in remote git: e.g: git push -u origin <branch_name>
#
echo "Helpful commands:"
echo "  fly -t lite login -c http://192.168.100.4:8080"
echo "  fly -t lite intercept -b 33"

branch=$(git symbolic-ref --short HEAD)

target=$1

echo ""
echo "Setup ${branch}_CI on target: ${target}"
echo "========================================"
fly -t ${target} set-pipeline --pipeline ${branch}_CI -c ci/pipeline.yml -l credentials.yml

# echo ""
# echo "Setup ${branch}_Gated on target: ${target}"
# echo "========================================"
# fly -t ${target} set-pipeline --pipeline ${branch}_Gated -c ci/pipeline-gated.yml -l credentials.yml
