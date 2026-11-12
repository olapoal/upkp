# server.ps1 - Lightweight Local HTTP Server for Simulasi KLC-CAT UPKP
param (
    [int]$Port = 8080
)

$appDir = $PSScriptRoot
$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
    Write-Host "=======================================================" -ForegroundColor Cyan
    Write-Host " KLC-CAT UPKP Kemenkeu Server: $prefix" -ForegroundColor Yellow
    Write-Host " Folder: $appDir" -ForegroundColor Gray
    Write-Host " Tekan Ctrl+C untuk menghentikan server." -ForegroundColor Cyan
    Write-Host "=======================================================" -ForegroundColor Cyan

    Start-Process "http://localhost:$Port"

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        $response.AddHeader("Access-Control-Allow-Origin", "*")
        $response.AddHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        $response.AddHeader("Access-Control-Allow-Headers", "Content-Type")

        if ($request.HttpMethod -eq "OPTIONS") {
            $response.StatusCode = 200
            $response.Close()
            continue
        }

        $path = $request.Url.LocalPath
        if ($path -eq "/" -or $path -eq "") { $path = "/index.html" }

        # Handle API Email
        if ($path -eq "/api/send-email" -and $request.HttpMethod -eq "POST") {
            $reader = New-Object System.IO.StreamReader($request.InputStream, $request.ContentEncoding)
            $postBody = $reader.ReadToEnd()
            $reader.Close()

            $logDir = Join-Path $appDir "logs"
            if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Force -Path $logDir | Out-Null }
            $logFile = Join-Path $logDir "email_sent_$(Get-Date -Format 'yyyyMMdd_HHmmss').json"
            [System.IO.File]::WriteAllText($logFile, $postBody, [System.Text.Encoding]::UTF8)

            $resBytes = [System.Text.Encoding]::UTF8.GetBytes('{"success":true,"message":"Email logged and processed"}')
            $response.ContentType = "application/json"
            $response.StatusCode = 200
            $response.OutputStream.Write($resBytes, 0, $resBytes.Length)
            $response.Close()
            continue
        }

        # Static files serving
        $localFile = Join-Path $appDir ($path.TrimStart('/').Replace('/', '\'))
        if (Test-Path $localFile -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($localFile)
            $ext = [System.IO.Path]::GetExtension($localFile).ToLower()
            $mime = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".json" { "application/json; charset=utf-8" }
                ".png"  { "image/png" }
                ".jpg"  { "image/jpeg" }
                default { "application/octet-stream" }
            }
            $response.ContentType = $mime
            $response.StatusCode = 200
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        $response.Close()
    }
} finally {
    $listener.Stop()
}
