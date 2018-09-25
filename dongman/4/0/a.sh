#! /bin/bash

tracks=`find -name track.vtt`

for filename in $tracks;
do
		echo $filename
		ex $filename < a.vim
done
