#!/bin/sh
set -e
sudo systemctl daemon-reload
sudo systemctl restart nfc-reader.service
sudo systemctl status nfc-reader.service