@echo off
title Simulasi KLC-CAT UPKP Kementerian Keuangan - Ditjen Perbendaharaan 2026
echo ==============================================================================
echo   SIMULASI KLC-CAT UJIAN PENYESUAIAN KENAIKAN PANGKAT (UPKP)
echo   KEMENTERIAN KEUANGAN REPUBLIK INDONESIA
echo   Direktorat Jenderal Perbendaharaan (DJPb)
echo ==============================================================================
echo.
echo Membuka aplikasi simulasi ujian KLC-CAT...

set APP_DIR=%~dp0
set HTML_FILE=%APP_DIR%index.html

:: Buka dengan Microsoft Edge dalam mode App (Simulasi Safe Exam Browser / SEB)
start msedge --app="%HTML_FILE%" --start-maximized 2>nul
if %ERRORLEVEL% equ 0 goto done

:: Jika Edge tidak tersedia, coba Google Chrome
start chrome --app="%HTML_FILE%" --start-maximized 2>nul
if %ERRORLEVEL% equ 0 goto done

:: Fallback: Buka dengan browser default Windows
start "" "%HTML_FILE%"

:done
echo Aplikasi berhasil dibuka. Selamat mengikuti ujian simulasi UPKP Kemenkeu!
exit
