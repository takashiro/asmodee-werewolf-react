#!/bin/bash

JQUERY_LIB=js/lib/jquery-3.2.1.min.js

# Prepare directories
OUTDIR=build
if [ -n "$1" ]; then
	OUTDIR=$1
fi

if [ ! -d $OUTDIR ]; then
	mkdir $OUTDIR
fi

BUILDDIR=$OUTDIR/compat
if [ -n "$2" ]; then
	BUILDDIR=$2
fi

if [ ! -d $BUILDDIR ]; then
	mkdir $BUILDDIR
fi

function is_file_modified() {
	if [ ! -f "$OUTDIR/$1" ]; then
		return 0
	fi

	local source_sha1=$(sha1sum $1 | awk '{ print $1 }')
	local target_sha1=$(sha1sum $OUTDIR/$1 | awk '{ print $1 }')

	if [ "$source_sha1" != "$target_sha1" ]; then
		return 0
	else
		return 1
	fi
}

function update_file() {
	local outpath=$(dirname $OUTDIR/$1)
	if [ ! -d $outpath ]; then
		mkdir -p $outpath
	fi
	cp -f $1 $OUTDIR/$1

	local buildpath=$(dirname $BUILDDIR/$1)
	if [ ! -d $buildpath ]; then
		mkdir -p $buildpath
	fi
}

function compile_js() {
	if is_file_modified $1; then
		echo "Updating $1..."
		update_file $1
		./node_modules/.bin/babel $1 > $BUILDDIR/$1
	fi
}

function deploy_file() {
	if is_file_modified $1; then
		echo "Updating $1..."
		update_file $1
		cp -f $1 $BUILDDIR/$1
	fi
}

# Copy JavaScript files
for file in $(find js -type f); do
	if [ "$file" == "$JQUERY_LIB" ]; then
		continue
	fi

	filename=$(basename "$file")
	extension="${filename##*.}"
	if [ "$extension" == "js" ]; then
		compile_js $file
	else
		update_file $file
	fi
done

# Copy style files
for file in $(find style -type f); do
	deploy_file $file
done

# Copy other files
OTHER_FILES="LICENSE README.md favicon.ico $JQUERY_LIB"
for file in $OTHER_FILES; do
	deploy_file $file
done

# Copy index.htm
if is_file_modified "index.htm"; then
	echo "Updating index.htm..."
	update_file "index.htm"
	sed '/<head>/a <script src="js/lib/babel-polyfill.min.js"></script>' index.htm > "$BUILDDIR/index.htm"
fi
