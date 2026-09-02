using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Xml.Linq;

namespace XiixService.Classes
{
    public class Watcher
    {  
        public static void Watch(string name, Process process)
        {
            process.EnableRaisingEvents = true;

            process.Exited += async (_, __) =>
            {
                Log.Success($"{name} has closed");

                Program.CurrentlyPlaying = null;

                await Program.Socket.SendToElectron("game-closed", new
                {
                    name,
                    status = "closed"
                });
            };
        }

        public static void WatchPowershell(Process process)
        {
            process.EnableRaisingEvents = true;

            process.Exited += async (_, __) =>
            {
                Log.Success($"Powershell script finished", "Watcher");

                Restart.RestartSteam();

                await Program.Socket.SendToElectron("install-steam-game-finished", new
                {
                    status = "success"
                });
            };
        }
    }
}
