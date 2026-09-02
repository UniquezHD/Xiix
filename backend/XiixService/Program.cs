using SharpDX.DirectInput;
using XiixService.Classes;

class Program
{
    public static SocketService Socket;
    public static string VERSION = "0.0.1";
    public static string OS_TYPE = "windows";

    public static string USB_PATH = "C:\\USB";

    public static string APPLICATION_PATH = "C:\\XiiX";

    public static string CurrentlyPlaying { get; set; }

    // Todo: handle invalid launch 

    // Todo: get username from config.json after first steam setup 

    static async Task Main()
    {
        Log.Info("Starting Socket.IO payload client");
        //Log.Success("Starting Socket.IO payload client");
        //Log.Warning("Starting Socket.IO payload client");
        //Log.Error("Starting Socket.IO payload client");
        //Log.Fatal("Starting Socket.IO payload client");

        Init.Folders();

        CurrentlyPlaying = null;

        Socket = new SocketService("http://localhost:3000");
        await Socket.StartAsync();

        Controller.Listen();

        await Task.Delay(-1);
    }
}