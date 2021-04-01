#! /bin/bash

branch=$(git branch --show-current)
commit=$(git rev-parse --short HEAD)

if [[ ! -d ./build/info ]]; then
	mkdir -p ./build/info
fi

echo "$branch - $commit" > ./build/info/version