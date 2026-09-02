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

                Log.Info($"StartGame received: {gameData.Name}, {gameData.ExePath}, {gameData.Args}, {gameData.ProcessName}");

                var process = Launcher.Launch(gameData.ExePath, gameData.Args, gameData.Name);
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

                Log.Info($"close-game ProcessName: {gameData.ProcessName} Type: {gameData.Type}");

                Killer.Kill(gameData.ProcessName, gameData.Type);
               
                await SendToElectron("closed-game", new
                {
                    name = "",
                    processName = gameData.ProcessName,
                    status = "closed"
                });

            });

            _socket.On("install-game", async ctx =>
            {
                var installGameData = ctx.GetValue<GameModel>(0)!;

                Game.InstallCustom(installGameData);
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

                var storageInfo = new StorageInfoModel
                {
                    DriveName = drives[0].Name,
                    FreeSpace = Util.ConvertBytes(drives[0].TotalFreeSpace),
                    TotalSpace = Util.ConvertBytes(drives[0].TotalSize),
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

        public async Task StartAsync(int retries = 3, int delay = 2000)
        {
            int attempt = 0;

            while (attempt < retries)
            {
                attempt++;

                try
                {
                    await _socket.ConnectAsync();
                    Log.Success("Connected to server");
                }
                catch (Exception ex)
                {
                    Log.Warning($"Connection failed: {ex.Message}");

                    if (attempt >= retries)
                    {
                        Log.Fatal("Could not connect to server");
                        return;
                    }

                    Log.Info($"Retrying");
                    await Task.Delay(delay);
                }
            }
        }
    }
}
