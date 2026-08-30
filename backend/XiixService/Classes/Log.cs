using System;
using System.Collections.Generic;
using System.Text;

namespace XiixService.Classes
{
    public class Log
    {
        public static void Info(string message)
        {
            Console.ForegroundColor = ConsoleColor.Blue;
            Console.WriteLine($"[INFO]   [{DateTime.Now:HH:mm:ss}]  {message}");
            Console.ForegroundColor = ConsoleColor.White;
        }

        public static void Success(string message)
        {
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine($"[SUCCESS][{DateTime.Now:HH:mm:ss}]  {message}");
            Console.ForegroundColor = ConsoleColor.White;
        }

        public static void Warning(string message)
        {
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine($"[WARNING][{DateTime.Now:HH:mm:ss}]  {message}");
            Console.ForegroundColor = ConsoleColor.White;
        }

        public static void Error(string message)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"[ERROR]  [{DateTime.Now:HH:mm:ss}]  {message}");
            Console.ForegroundColor = ConsoleColor.White;
        }

        public static void Fatal(string message)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"[FATAL]  [{DateTime.Now:HH:mm:ss}]  {message}");
            Console.ForegroundColor = ConsoleColor.White;
            Environment.Exit(0);
        }
    }
}
