using SharpDX.DirectInput;
using XiixService.Classes;

class Program
{
    public static SocketService Socket;
    public static string VERSION = "0.0.1";

    static async Task Main()
    {
        Console.WriteLine("Starting Socket.IO payload client");

        Socket = new SocketService("http://localhost:3000");
        await Socket.StartAsync();

        Controller.Listen();

        await Task.Delay(-1);
    }
}