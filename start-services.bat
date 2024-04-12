@echo off

rem authentication service
start cmd /k "cd /D .\auth-service && pnpm dev"

rem book service
start cmd /k "cd /D .\book-service && pnpm dev"

rem loan service
start cmd /k "cd /D .\loan-service && pnpm dev"

rem client service
start cmd /k "cd /D .\client-service && pnpm dev"
