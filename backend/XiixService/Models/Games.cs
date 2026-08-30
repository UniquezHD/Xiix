using System;
using System.Collections.Generic;
using System.Text;

namespace XiixService.Models
{
    public class GameModel { 
    
        public string Name { get; set; }
        public string ProcessName { get; set; }
        public string ExePath { get; set; }
        public string Args { get; set; }
        public string Type { get; set; }
    }
}
