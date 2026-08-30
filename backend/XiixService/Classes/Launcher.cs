using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;

namespace XiixService.Classes
{
    public class Launcher
    {

        public static Process Launch(string exePath, string args, string name)
        {
            var startInfo = new ProcessStartInfo
            {
                FileName = exePath,
                Arguments = args,
                UseShellExecute = true
            };

            Program.CurrentlyPlaying = name;

            return Process.Start(startInfo);
        }
    }
}
