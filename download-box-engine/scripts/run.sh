#!/bin/bash
touch ./static/session;
tmux new-session -d -s aria2_session 'aria2c --conf-path=./aria2.conf'
tmux new-session -d -s engine_session 'node index.js'