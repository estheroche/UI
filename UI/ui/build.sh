#! /bin/bash -e

rm -rf ./build/html/
mkdir -p build/html/

browserify ./index.js -o  ./build/html/bundle.js
cp ./index.html ./build/html/

echo "Done building \"./build/html\" at `date`"