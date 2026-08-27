using SocketIOClient;
using System;
using System.Collections.Generic;
using System.Net.Sockets;
using System.Text;
using XiixService.Models;

namespace XiixService.Classes
{
    public class SocketService
    {
        private readonly SocketIO _socket;

        public SocketService(string url)
        {
            _socket = new SocketIO(new Uri(url));
            RegisterEvents();
        }

        private void RegisterEvents()
        {
            _socket.On("start-game", async ctx =>
            {
                var gameData = ctx.GetValue<GameModel>(0)!;

                Console.WriteLine($"StartGame received: {gameData.Name}, {gameData.ExePath}, {gameData.Args}, {gameData.ProcessName}");

                var process = Launcher.Launch(gameData.ExePath, gameData.Args);
                Watcher.Watch(gameData.Name, process);

                await SendToElectron("game-started", new
                {
                    name = gameData.Name,
                    processName = gameData.ProcessName,
                    status = "running"
                });

            });

            _socket.On("close-game", async ctx =>
            {
                var gameData = ctx.GetValue<GameModel>(0)!;

                Console.WriteLine($"close-game ProcessName: {gameData.ProcessName}");

                Killer.Kill(gameData.ProcessName);
               
                await SendToElectron("closed-game", new
                {
                    name = "",
                    processName = gameData.ProcessName,
                    status = "closed"
                });

            });

            _socket.On("restart", async ctx =>
            {
                int restart = ctx.GetValue<int>(0)!;

                if (restart == 0)
                {
                    Restart.RestartBackend();
                }
                else if (restart == 1)
                {
                    Restart.RestartFrontend();
                }
            });

            _socket.On("status", async ctx =>
            {

                DriveInfo[] drives = DriveInfo.GetDrives();

                var spaceUsed = Util.ConvertBytes(drives[0].TotalSize - drives[0].TotalFreeSpace);

                var storageInfo = new StorageInfo
                {
                    DriveName = drives[0].Name,
                    FreeSpace = Util.ConvertBytes(drives[0].TotalSize),
                    TotalFreeSpace = Util.ConvertBytes(drives[0].TotalFreeSpace),
                    SpaceUsed = spaceUsed,
                };

                await SendToElectron("get-storage", new
                {
                    storageInfo
                });

                bool wifiStatus = Internet.Check();

                await SendToElectron("ethernet-status", new
                {
                    status = wifiStatus
                });

                await SendToElectron("get-version", new
                {
                    backend = Program.VERSION
                });

                if (Controller.isConnected)
                {
                    SendToElectron("controller-connected", new { message = "connected" });
                }
                else
                {
                    SendToElectron("controller-disconnected", new { message = "disconnected" });
                }

            });


        }

        public async Task SendToElectron(string eventName, object data)
        {
            await _socket.EmitAsync(eventName, new object[] { data });
        }

        public async Task StartAsync()
        {
            await _socket.ConnectAsync();
            // handle connection timeout
            Console.WriteLine("Connected to server");
        }
    }
}
