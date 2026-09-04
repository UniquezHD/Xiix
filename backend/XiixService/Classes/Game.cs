using Newtonsoft.Json;
using XiixService.Models;

namespace XiixService.Classes
{
    public class Game
    {
        public static void InstallCustom(GameModel gameInfo)
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

                Log.Info(gameData.games[i].name);
                Log.Info(gameData.games[i].processName);
                Log.Info(gameData.games[i].exePath);
                Log.Info(gameData.games[i].cover);
                Log.Info(gameData.games[i].type);
                Log.Info("-------------");
            }

            var newGame = new GameModelJson
            {
                name = gameInfo.Name,
                processName = gameInfo.ProcessName,
                exePath = gameInfo.ExePath,
                args = gameInfo.Args,
                cover = gameInfo.Cover,
                type = gameInfo.Type
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

        public static void InstallSteam(SteamGameInfoModel steamData, string username)
        {
            Log.Info("GameID: " + steamData.GameID);
            Log.Info("GameName: " + steamData.GameName);

            //var process = Launcher.LaunchPowershell("C:\\Xiix\\SteamInstall.ps1", $"-SteamAppID {steamData.GameID} -SteamAccName \"{username}\"");
            //Watcher.WatchPowershell(process);

            // save to .json file

            string steamPath = $"C:\\Program Files (x86)\\Steam\\steamapps\\common\\{steamData.GameName}\\{steamData.GameName}.exe";
            Log.Info(steamPath);


        }

        public static void Uninstall(GameModel gameInfo)
        {
            string rawJson = File.ReadAllText($"{Program.APPLICATION_PATH}\\GameData.json");

            GameDataModel gameData = JsonConvert.DeserializeObject<GameDataModel>(rawJson);


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
