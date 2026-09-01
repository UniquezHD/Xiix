using System;
using System.Collections.Generic;
using System.Text;

namespace XiixService.Models
{
    public class StorageInfoModel
    {
        public string DriveName { get; set; }
        public string FreeSpace { get; set; }
        public string TotalSpace { get; set; }
        public string SpaceUsed { get; set; }
    }
}
