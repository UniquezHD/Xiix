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

function Uninstall-SteamGame {
    param(
        [int]$SteamAppID,
        [string]$SteamAccName
    )

    $GameName = Get-SteamGameName -SteamAppID $SteamAppID

    & "C:\SteamCMD\steamcmd.exe" `
        +login $SteamAccName `
        +app_uninstall $SteamAppID `
        +quit

    $GameFolder = "C:\Program Files (x86)\Steam\steamapps\common\$GameName"
    if (Test-Path $GameFolder) {
        Remove-Item -Path $GameFolder -Recurse -Force
    }

    $ManifestPath = "C:\Program Files (x86)\Steam\steamapps\appmanifest_$SteamAppID.acf"
    if (Test-Path $ManifestPath) {
        Remove-Item -Path $ManifestPath -Force
    }
}

Uninstall-SteamGame -SteamAppID $SteamAppID -SteamAccName $SteamAccName

exit 0