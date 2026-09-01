using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;

namespace XiixService.Classes
{
    public class Init
    {
        private static string applicationGamesPath = $"{Program.APPLICATION_PATH}\\Games";
        public static void Folders()
        {
            if(Program.OS_TYPE == "windows")
            {
                if (!Directory.Exists("C:\\XiiX"))
                {
                    Directory.CreateDirectory(Program.APPLICATION_PATH);
                    Log.Info("Application folder created");
                }

                if (!Directory.Exists("C:\\XiiX\\Games"))
                {
                    Directory.CreateDirectory(applicationGamesPath);
                    Log.Info("Games folder created");
                }

                if (!File.Exists("C:\\XiiX\\Config.json"))
                {
                    File.WriteAllText($"{Program.APPLICATION_PATH}\\Config.json", "{\r\n  \"controllerType\": \"PS4\",\r\n  \"theme\": \"Solarized\",\r\n  \"systemType\": \"Windows\"\r\n}\r\n");

                    Log.Info("Config file created");
                }

                if (!File.Exists("C:\\XiiX\\GameData.json"))
                {
                    File.WriteAllText($"{Program.APPLICATION_PATH}\\GameData.json", "{\r\n  \"games\": [\r\n    \r\n  ]\r\n}");

                    Log.Info("Game data file created");
                }

            } else if(Program.OS_TYPE == "linux")
            {

            }
        }
    }
}
