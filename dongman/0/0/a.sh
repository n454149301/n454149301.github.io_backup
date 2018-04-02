#!/bin/bash

for filename in `find -name track.vtt`;
do
	ex $filename < a.vim
done
