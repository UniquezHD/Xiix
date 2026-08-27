using System;
using System.Collections.Generic;
using System.Text;

namespace XiixService.Classes
{
    public static class Util
    {
        public static string ConvertBytes(float bytes)
        {
            string[] Group = { "Bytes", "KB", "MB", "GB", "TB" };
            float B = bytes; int G = 0;
            while (B >= 1024 && G < 5)
            {
                B /= 1024;
                G += 1;
            }
            float truncated = (float)(Math.Truncate((double)B * 100.0) / 100.0);
            string load = (truncated + " " + Group[G]);

            return load;
        }
    }
}
