using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Xml.Linq;

namespace XiixService.Classes
{
    public class Watcher
    {  
        //Todo: if steam game, set watcher for process name after process closed 1 time
        public static void Watch(string name, Process process)
        {
            if(process != null)
            {
                process.EnableRaisingEvents = true;

                process.Exited += async (_, __) =>
                {
                    Log.Success($"{name} has closed", "Watcher");

                    Program.CurrentlyPlaying = null;

                    await Program.Socket.SendToElectron("game-closed", new
                    {
                        name,
                        status = "closed"
                    });
                };
            }
        }

        public static void WatchPowershell(Process process, int mode)
        {
            process.EnableRaisingEvents = true;

            process.Exited += async (_, __) =>
            {
                Log.Success($"Powershell script finished", "Watcher");

                Restart.RestartSteam();

                if(mode == 0)
                {
                    await Program.Socket.SendToElectron("install-steam-game-finished", new
                    {
                        status = "success"
                    });
                } 
                else if(mode == 1)
                {
                    await Program.Socket.SendToElectron("uninstall-steam-game-finished", new
                    {
                        status = "success"
                    });
                }
            };
        }
    }
}
