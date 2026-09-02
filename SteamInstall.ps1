param(
    [int]$SteamAppID,
    [string]$SteamAccName
)

function Get-SteamGameName {
    param([int]$SteamAppID)

    $url = "https://store.steampowered.com/api/appdetails?appids=$SteamAppID"
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing
    $json = $response.Content | ConvertFrom-Json

    return $json.$SteamAppID.data.name
}

function Install-SteamGame {
    param(
        [int]$SteamAppID,
        [string]$SteamAccName
    )

    $GameName = Get-SteamGameName -SteamAppID $SteamAppID

    & "C:\SteamCMD\steamcmd.exe" `
        +login $SteamAccName `
        +force_install_dir "C:\Program Files (x86)\Steam\steamapps\common\$GameName" `
        +app_update $SteamAppID validate `
        +quit

    $ManifestPath = "C:\Program Files (x86)\Steam\steamapps\appmanifest_$SteamAppID.acf"

$ManifestContent = @"
"AppState"
{
    "appid"        "$SteamAppID"
    "Universe"     "1"
    "name"         "$GameName"
    "StateFlags"   "4"
    "installdir"   "$GameName"
}
"@

    Set-Content -Path $ManifestPath -Value $ManifestContent -Encoding ASCII
}

Install-SteamGame -SteamAppID $SteamAppID -SteamAccName $SteamAccName