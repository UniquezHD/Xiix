using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;

namespace XiixService.Classes
{
    public class Restart
    {
        public static void RestartBackend()
        {

        }

        public static void RestartFrontend()
        {

        }

        public static void RestartSteam()
        {
            foreach (var proc in Process.GetProcessesByName("steam"))
            {
                try
                {
                    proc.Kill();
                    proc.WaitForExit();
                }
                catch { }
            }

            Thread.Sleep(2000);

            Process.Start(new ProcessStartInfo
            {
                FileName = @"C:\Program Files (x86)\Steam\steam.exe",
                Arguments = "-silent",
                WindowStyle = ProcessWindowStyle.Minimized,
                UseShellExecute = true
            });
        }
    }
}
