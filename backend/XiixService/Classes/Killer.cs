using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;

namespace XiixService.Classes
{
    public class Killer
    {
        public static void Kill(string name)
        {
            Console.WriteLine($"Process name: {name}");
            foreach (var process in Process.GetProcessesByName(name))
            {
                process.Kill();
                Console.WriteLine($"Process killed: {name}");
            }

        }
    }
}
