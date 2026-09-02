using System;
using System.Collections.Generic;
using System.Text;

namespace XiixService.Classes
{
    public class Log
    {
        public static void Info(string message, string tag = "")
        {
            Console.ForegroundColor = ConsoleColor.Blue;
            Console.WriteLine($"[{DateTime.Now:HH:mm:ss}][INFO]   [{tag}] {message}");
            Console.ForegroundColor = ConsoleColor.White;
        }

        public static void Success(string message, string tag = "")
        {
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine($"[{DateTime.Now:HH:mm:ss}][SUCCESS][{tag}] {message}");
            Console.ForegroundColor = ConsoleColor.White;
        }

        public static void Warning(string message, string tag = "")
        {
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine($"[{DateTime.Now:HH:mm:ss}][WARNING][{tag}] {message}");
            Console.ForegroundColor = ConsoleColor.White;
        }

        public static void Error(string message, string tag = "")
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"[{DateTime.Now:HH:mm:ss}][ERROR]  [{tag}] {message}");
            Console.ForegroundColor = ConsoleColor.White;
        }

        public static void Fatal(string message, string tag = "")
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"[{DateTime.Now:HH:mm:ss}][FATAL]  [{tag}] {message}");
            Console.ForegroundColor = ConsoleColor.White;
            Environment.Exit(0);
        }
    }
}
