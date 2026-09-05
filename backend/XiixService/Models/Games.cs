using System;
using System.Collections.Generic;
using System.Text;

namespace XiixService.Models
{
    public class GameDataModel
    {
        public List<GameModelJson?> games { get; set; }
    }
    public class GameModel { 
    
        public string Name { get; set; }
        public string ProcessName { get; set; }
        public string ExePath { get; set; }
        public string Args { get; set; }
        public string Cover { get; set; }
        public string Type { get; set; }
        public int GameID { get; set; }
    }

    public class GameModelJson
    {

        public string name { get; set; }
        public string processName { get; set; }
        public string exePath { get; set; }
        public string args { get; set; }
        public string cover { get; set; }
        public string type { get; set; }
        public int gameID { get; set; }
    }

    public class SteamGameInfoModel
    {
        public int GameID { get; set; }
        public string GameName { get; set; }
    }
}
