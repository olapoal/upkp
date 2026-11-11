param (
    [string]$ToEmail = "peserta.upkp@kemenkeu.go.id",
    [string]$Subject = "[RAPOR RESMI UPKP 2026] Hasil Simulasi KLC-CAT Ditjen Perbendaharaan",
    [string]$BodyText = "",
    [string]$SmtpServer = "smtp.gmail.com",
    [int]$SmtpPort = 587,
    [string]$FromEmail = "panitia.upkp.kemenkeu@gmail.com",
    [string]$Password = ""
)

Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host " PENGIRIMAN RAPOR RESMI HASIL SIMULASI UPKP KEMENKEU  " -ForegroundColor Yellow
Write-Host "=======================================================" -ForegroundColor Cyan

if (-not $BodyText) {
    $BodyText = @"
KEMENTERIAN KEUANGAN REPUBLIK INDONESIA
DIREKTORAT JENDERAL PERBENDAHARAAN (DJPb)
COMPUTER ASSISTED TEST (KLC-CAT) 2026

Yth. Peserta Ujian UPKP,
Berikut adalah laporan resmi hasil evaluasi Simulasi Ujian Penyesuaian Kenaikan Pangkat (UPKP) Anda.
Semoga sukses dalam mengikuti ujian dinas yang sesungguhnya.
"@
}

if ($Password) {
    try {
        $secPassword = ConvertTo-SecureString $Password -AsPlainText -Force
        $cred = New-Object System.Management.Automation.PSCredential($FromEmail, $secPassword)

        Send-MailMessage -From $FromEmail -To $ToEmail -Subject $Subject `
            -Body $BodyText -SmtpServer $SmtpServer -Port $SmtpPort `
            -UseSsl -Credential $cred -Encoding UTF8

        Write-Host "Rapor berhasil dikirim ke $ToEmail!" -ForegroundColor Green
    } catch {
        Write-Host "Kendala pengiriman: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "Petunjuk:" -ForegroundColor Yellow
    Write-Host "Untuk pengiriman otomatis lewat script ini, jalankan dengan credential SMTP:"
    Write-Host "powershell -File Send-EmailResult.ps1 -ToEmail '$ToEmail' -FromEmail 'email.anda@gmail.com' -Password 'app-password-anda'"
    Write-Host "Catatan: Pada aplikasi web KLC-CAT, tombol 'Kirim Rapor ke Email' juga sudah otomatis membuka aplikasi email Anda (Outlook/Mail) tanpa perlu password SMTP!" -ForegroundColor Green
}
