@echo off
echo Start weinre
::weinre -boundHost -all-
weinre -httpPort 8080 -boundHost 192.168.2.213

echo Start gulp
::gulp