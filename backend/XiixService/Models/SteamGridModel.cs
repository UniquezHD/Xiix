using System;
using System.Collections.Generic;
using System.Text;

namespace XiixService.Models
{
    public class SteamGridDbResponse
    {
        public bool success { get; set; }
        public List<GridItem> data { get; set; }
    }

    public class GridItem
    {
        public string url { get; set; }
        public string thumb { get; set; }
        public string dimensions { get; set; }
        public string style { get; set; }
        public string type { get; set; }
    }
}
