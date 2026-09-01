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

            // Todo: prevent duplicate games in GameData.json
            // Todo: delete game from GameData.json


            string rawJson = File.ReadAllText($"{Program.APPLICATION_PATH}\\GameData.json");

            GameDataModel gameData = JsonConvert.DeserializeObject<GameDataModel>(rawJson);

            if (gameData == null)
            {
                gameData = new GameDataModel { games = new List<GameModelJson>() };
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
            }
            catch (Exception)
            {
                Program.Socket.SendToElectron("game-installed-status", new { message = "failed" });
            }

        }

        public static void InstallSteam()
        {

        }
    }
}
