using Newtonsoft.Json;
using System.Net.Http.Headers;
using XiixService.Models;

namespace XiixService.Classes
{
    public class Game
    {
        public static void Install(GameModel gameInfo)
        {
            Log.Info(gameInfo.Name);
            Log.Info(gameInfo.ExePath);
            Log.Info(gameInfo.Type);
            Log.Info(gameInfo.Cover);

            // Todo: delete game from GameData.json


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
                    Log.Error("Game already exits");
                    Program.Socket.SendToElectron("game-installed-status", new { message = "already-exists" });
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

                Program.Socket.SendToElectron("game-installed-status", new { message = "success" });
                Log.Success("Game installed", "Install");
            }
            catch (Exception)
            {
                Program.Socket.SendToElectron("game-installed-status", new { message = "failed" });
                Log.Error("Game failed to install", "Install");
            }

        }

        public static async Task InstallSteam(SteamGameInfoModel steamData, string username)
        {
            Log.Info("GameID: " + steamData.GameID);
            Log.Info("GameName: " + steamData.GameName);

            var apiKey = Environment.GetEnvironmentVariable("STEAMGRID_API");

            var process = Launcher.LaunchPowershell("C:\\Xiix\\SteamInstall.ps1", $"-SteamAppID {steamData.GameID} -SteamAccName \"{username}\"");
            Watcher.WatchPowershell(process);

            string steamPath = $"C:\\Program Files (x86)\\Steam\\steamapps\\common\\{steamData.GameName.ToLower()}\\{steamData.GameName}.exe";
            Log.Info(steamPath);

            //https://store.steampowered.com/api/appdetails?appids=

            using var client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

            var response = await client.GetStringAsync(
                $"https://www.steamgriddb.com/api/v2/grids/steam/{steamData.GameID}"
            );

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
                                    Watcher.WatchPowershell(process);
                                break;

                            case "PS2":

                                break;

                            default:
                                break;
                        }

                        string updatedJson = JsonConvert.SerializeObject(gameData, Formatting.Indented);
                        File.WriteAllText($"{Program.APPLICATION_PATH}\\GameData.json", updatedJson);

                        Program.Socket.SendToElectron("game-uninstalled-status", new { message = "success" });
                        Log.Success("Game uninstall", "Uninstall");
                    }
                    catch (Exception)
                    {
                        Program.Socket.SendToElectron("game-uninstalled-status", new { message = "failed" });
                        Log.Error("Game failed to uninstall", "Uninstall");
                    }
                }
            }
        }
    }
}
