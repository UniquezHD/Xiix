using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;

namespace XiixService.Classes
{
    public class Killer
    {
        public static void Kill(string name, string type)
        {

            Log.Info($"Process name: {name} type: {type}");

            try
            {
                switch (type)
                {

                    case "Exe":
                        foreach (var process in Process.GetProcessesByName(name))
                        {
                            process.Kill();
                            Log.Success($"Process killed: {name}");
                        }
                        break;

                    case "PS2":
                        Process.Start(new ProcessStartInfo
                        {
                            FileName = "taskkill.exe",
                            Arguments = "/F /IM pcsx2-qt.exe",
                            CreateNoWindow = true,
                            UseShellExecute = false
                        });
                        break;
                }
            }
            catch (Exception)
            {
                Log.Error("Failed to kill process");
            }
        }
    }
}
