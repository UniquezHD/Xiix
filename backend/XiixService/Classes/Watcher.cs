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
                Console.WriteLine($"{name} has closed");

                await Program.Socket.SendToElectron("game-closed", new
                {
                    name,
                    status = "closed"
                });
            };
        }
    }
}
