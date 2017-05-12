#!/bin/bash

NAME=$(basename $1 .jpg)
convert ${NAME}.jpg -background black -alpha copy -channel A -negate -type truecolormatte PNG32:${NAME}-alpha.png ; done
convert -scale x128 ${NAME}.jpg ${NAME}-small.jpg
