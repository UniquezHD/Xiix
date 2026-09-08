using Newtonsoft.Json;
using System.Net.Http.Headers;
using XiixService.Models;

namespace XiixService.Classes
{
    public class Game
    {
        public class Steam
        {
            public static void Repair(SteamGameInfoModel steamData, string username)
            {
                var process = Launcher.LaunchPowershell("C:\\Xiix\\SteamInstall.ps1", $"-SteamAppID {steamData.GameID} -SteamAccName \"{username}\"");
                Watcher.WatchPowershell(process, 0);

                Log.Info($"Reparing: {steamData.GameName} {steamData.GameID}");
            }

            public static async Task InstallSteam(SteamGameInfoModel steamData, string username)
            {
                Log.Info("GameID: " + steamData.GameID);
                Log.Info("GameName: " + steamData.GameName);

                // DotNetEnv sucks
                var apiKey = Util.STEAMGRID_API_KEY();

                var process = Launcher.LaunchPowershell("C:\\Xiix\\SteamInstall.ps1", $"-SteamAppID {steamData.GameID} -SteamAccName \"{username}\"");
                Watcher.WatchPowershell(process, 0);

                string steamPath = $"C:\\Program Files (x86)\\Steam\\steamapps\\common\\{steamData.GameName.ToLower()}\\{steamData.GameName}.exe";
                Log.Info(steamPath);

                //https://store.steampowered.com/api/appdetails?appids=

                Log.Warning(apiKey);

                using var client = new HttpClient();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

                try
                {
                    var response = await client.GetStringAsync(
                    $"https://www.steamgriddb.com/api/v2/grids/steam/{steamData.GameID}");
                    var result = System.Text.Json.JsonSerializer.Deserialize<SteamGridDbResponse>(response);

                    var imageUrl = result.data[0].url;

                    GameModel gameInfo = new GameModel
                    {
                        Name = steamData.GameName,
                        ProcessName = steamData.GameName,
                        Args = "",
                        Cover = imageUrl,
                        Type = "Steam",
                        ExePath = steamPath,
                        GameID = steamData.GameID
                    };


                    Install(gameInfo);
                }
                catch (Exception ex)
                {
                    Log.Error(ex.Message);
                    throw;
                }
            }
        }
        public static void Install(GameModel gameInfo)
        {
            Log.Info(gameInfo.Name);
            Log.Info(gameInfo.ExePath);
            Log.Info(gameInfo.Type);
            Log.Info(gameInfo.Cover);

            string rawJson = File.ReadAllText($"{Program.APPLICATION_PATH}\\GameData.json");

            GameDataModel gameData = JsonConvert.DeserializeObject<GameDataModel>(rawJson);


            if (gameData == null)
            {
                gameData = new GameDataModel { games = new List<GameModelJson>() };
            }

            for (int i = 0; i < gameData.games.Count; i++)
            {
                if (gameInfo.Name == gameData.games[i].name)
                {
                    Program.Socket.SendToElectron("send-notification", new { type = "Error", message = $"{gameInfo.Name} Already exists" });
                    Log.Error("Game already exits");
                    return;
                }
            }

            var newGame = new GameModelJson
            {
                name = gameInfo.Name,
                processName = gameInfo.ProcessName,
                exePath = gameInfo.ExePath,
                args = gameInfo.Args,
                cover = gameInfo.Cover,
                type = gameInfo.Type,
                gameID = gameInfo.GameID,
            };

            gameData.games.Add(newGame);

            try
            {
                string updatedJson = JsonConvert.SerializeObject(gameData, Formatting.Indented);
                File.WriteAllText($"{Program.APPLICATION_PATH}\\GameData.json", updatedJson);

                if(gameInfo.Type != "Steam")
                {
                    Program.Socket.SendToElectron("send-notification", new { type = "Success", message = $"Installed {gameInfo.Name}" });
                }
                Log.Success("Game installed", "Install");
            }
            catch (Exception)
            {
                if (gameInfo.Type != "Steam")
                {
                    Program.Socket.SendToElectron("send-notification", new { type = "Error", message = $"Failed to install {gameInfo.Name}" });
                }
                Log.Error("Game failed to install", "Install");
            }
        }

        public static void Uninstall(GameModel gameInfo, string username)
        {
            string rawJson = File.ReadAllText($"{Program.APPLICATION_PATH}\\GameData.json");

            GameDataModel gameData = JsonConvert.DeserializeObject<GameDataModel>(rawJson);


            //{
            //    "name": "PEAK",
            //    "processName": "PEAK",
            //    "exePath": "C:\\Program Files (x86)\\Steam\\steamapps\\common\\peak\\PEAK.exe",
            //    "args": "",
            //    "cover": "https://cdn2.steamgriddb.com/grid/fbf3321aabbfb52b9361463b92a3b84b.jpg",
            //    "type": "Steam",
            //    "gameID": 3527290
            //}


            if (gameData == null)
            {
                return;
            }

            for (int i = 0; i < gameData.games.Count; i++)
            {
                if(gameInfo.Name == gameData.games[i].name)
                {
                    Log.Success("Game found", "Uninstall");
                    gameData.games.RemoveAt(i);

                    try
                    {
                        switch (gameInfo.Type)
                        {
                            case "Exe":

                                break;

                            case "Steam":
                                    var process = Launcher.LaunchPowershell("C:\\Xiix\\SteamUninstall.ps1", $"-SteamAppID {gameInfo.GameID} -SteamAccName \"{username}\"");
                                    Watcher.WatchPowershell(process, 1);
                                break;

                            case "PS2":

                                break;

                            default:
                                break;
                        }

                        string updatedJson = JsonConvert.SerializeObject(gameData, Formatting.Indented);
                        File.WriteAllText($"{Program.APPLICATION_PATH}\\GameData.json", updatedJson);

                        if(gameInfo.Type != "Steam")
                        {
                            Program.Socket.SendToElectron("send-notification", new { type = "Success", message = $"Uninstalled {gameInfo.Name}" });
                        }
                        Log.Success("Game uninstall", "Uninstall");
                    }
                    catch (Exception)
                    {
                        if (gameInfo.Type != "Steam")
                        {
                            Program.Socket.SendToElectron("send-notification", new { type = "Error", message = $"Failed to uninstall {gameInfo.Name}" });
                        }
                        Log.Error("Game failed to uninstall", "Uninstall");
                    }
                }
            }
        }
    }
}
