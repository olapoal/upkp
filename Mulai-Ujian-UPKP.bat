@echo off
title Simulasi KLC-CAT UPKP Kementerian Keuangan - Ditjen Perbendaharaan 2026
echo ==============================================================================
echo   SIMULASI KLC-CAT UJIAN PENYESUAIAN KENAIKAN PANGKAT (UPKP)
echo   KEMENTERIAN KEUANGAN REPUBLIK INDONESIA
echo   Direktorat Jenderal Perbendaharaan (DJPb)
echo ==============================================================================
echo.
echo Menyiapkan server lokal KLC-CAT dan membuka aplikasi...

set APP_DIR=%~dp0
set HTML_FILE=%APP_DIR%index.html
set TARGET_URL=http://localhost:8080/index.html

:: Jalankan server lokal di latar belakang jika belum aktif
powershell -NoProfile -ExecutionPolicy Bypass -Command "if (-not (Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue)) { Start-Process powershell -ArgumentList '-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File \"\"%APP_DIR%server.ps1\"\" -Port 8080' }" 2>nul

:: Beri jeda singkat agar port siap
timeout /t 1 /nobreak >nul

:: Coba buka via Microsoft Edge dalam mode App
start msedge --app="%TARGET_URL%" --start-maximized 2>nul
if %ERRORLEVEL% equ 0 goto done

:: Coba via Google Chrome
start chrome --app="%TARGET_URL%" --start-maximized 2>nul
if %ERRORLEVEL% equ 0 goto done

:: Coba buka URL di browser default
start "" "%TARGET_URL%" 2>nul
if %ERRORLEVEL% equ 0 goto done

:: Fallback langsung ke file HTML lokal
start "" "%HTML_FILE%"

:done
echo Aplikasi berhasil dibuka. Selamat mengikuti ujian simulasi UPKP Kemenkeu!
exit
