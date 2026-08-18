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
            });

            _socket.On("set-volume", async ctx =>
            {

            });

            _socket.On("status", async ctx =>
            {
                bool wifiStatus = Internet.Check();

                await SendToElectron("ethernet-status", new
                {
                    status = wifiStatus
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
