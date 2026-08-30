using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;

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
    }
}
