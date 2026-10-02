# usage: pwsh -File scripts/ftp-smoke.ps1
$ErrorActionPreference = "Stop"
$passFile = Join-Path $env:TEMP "b2m_ftp_pass.txt"
if (-not (Test-Path $passFile)) {
  Write-Host "MISSING $passFile"
  Write-Host 'Run: Set-Content -NoNewline "$env:TEMP\b2m_ftp_pass.txt" "YOUR_FTP_PASSWORD"'
  exit 2
}

$user = "williams@back2mboa.com"
$hostName = "oursin.o2switch.net"
$pass = (Get-Content -Raw $passFile).Trim()

function Read-FtpLines([System.IO.StreamReader]$reader, [int]$timeoutMs = 3000) {
  $lines = @()
  $deadline = [datetime]::UtcNow.AddMilliseconds($timeoutMs)
  while ([datetime]::UtcNow -lt $deadline) {
    if (-not $reader.BaseStream.DataAvailable -and $lines.Count -gt 0) {
      Start-Sleep -Milliseconds 150
      if (-not $reader.BaseStream.DataAvailable) { break }
    }
    if ($reader.Peek() -lt 0 -and -not $reader.BaseStream.DataAvailable) {
      Start-Sleep -Milliseconds 100
      if ($reader.Peek() -lt 0) { break }
    }
    $line = $reader.ReadLine()
    if ($null -eq $line) { break }
    $lines += $line
    if ($line -match '^\d{3} ') { break }
  }
  return $lines
}

try {
  $tcp = New-Object System.Net.Sockets.TcpClient
  $tcp.ReceiveTimeout = 15000
  $tcp.SendTimeout = 15000
  $tcp.Connect($hostName, 21)
  $stream = $tcp.GetStream()
  $reader = New-Object System.IO.StreamReader($stream)
  $writer = New-Object System.IO.StreamWriter($stream)
  $writer.NewLine = "`r`n"
  $writer.AutoFlush = $true
  Start-Sleep -Milliseconds 500

  Write-Host "BANNER:"; (Read-FtpLines $reader 5000) | ForEach-Object { Write-Host "  $_" }
  $writer.WriteLine("USER $user")
  Write-Host "USER:"; (Read-FtpLines $reader 5000) | ForEach-Object { Write-Host "  $_" }
  $writer.WriteLine("PASS $pass")
  $passResp = Read-FtpLines $reader 8000
  Write-Host "PASS:"; $passResp | ForEach-Object { Write-Host "  $_" }
  $writer.WriteLine("PWD")
  Write-Host "PWD:"; (Read-FtpLines $reader 5000) | ForEach-Object { Write-Host "  $_" }
  $writer.WriteLine("PASV")
  Write-Host "PASV:"; (Read-FtpLines $reader 5000) | ForEach-Object { Write-Host "  $_" }
  $writer.WriteLine("QUIT")
  $tcp.Close()

  if (($passResp -join "`n") -match '^230') {
    Write-Host "RESULT: LOGIN_OK"
    exit 0
  }
  Write-Host "RESULT: LOGIN_FAIL"
  exit 1
}
finally {
  Remove-Item -Force $passFile -ErrorAction SilentlyContinue
}
