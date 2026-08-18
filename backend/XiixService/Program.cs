using SharpDX.DirectInput;
using XiixService.Classes;

class Program
{
    public static SocketService Socket;

    static async Task Main()
    {
        Console.WriteLine("Starting Socket.IO payload client");

        Socket = new SocketService("http://localhost:3000");
        await Socket.StartAsync();

        Controller.Listen();

        Console.WriteLine("Listening for events");
        await Task.Delay(-1);
    }
}