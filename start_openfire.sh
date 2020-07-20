#!/bin/sh
/opt/openfire/bin/openfire start &
tail -f /dev/null &
wait
