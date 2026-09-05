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

            try
            {
                return Process.Start(startInfo);
            }
            catch (Exception)
            {
            
                return null;
            }
        }

        public static Process LaunchPowershell(string scriptPath, string args)
        {
            var startInfo = new ProcessStartInfo
            {
                FileName = "powershell.exe",
                Arguments = $"-ExecutionPolicy Bypass -File \"{scriptPath}\" {args}",
                UseShellExecute = false
            };

            return Process.Start(startInfo);
        }
    }
}
