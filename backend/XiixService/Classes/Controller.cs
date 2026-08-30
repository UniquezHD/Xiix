using SharpDX.DirectInput;
using System;
using System.Threading;

namespace XiixService.Classes
{
    public class Controller
    {
        public static bool isConnected = false;
        public static void Listen()
        {
            var directInput = new DirectInput();
            Joystick joystick = null;
            bool lastPsState = false;
            isConnected = false;

            Log.Info("Waiting for controller");

            while (true)
            {
                if (!isConnected)
                {
                    var devices = directInput.GetDevices(DeviceType.Gamepad, DeviceEnumerationFlags.AttachedOnly);

                    if (devices.Count == 0)
                        devices = directInput.GetDevices(DeviceType.FirstPerson, DeviceEnumerationFlags.AttachedOnly);

                    if (devices.Count == 0)
                        devices = directInput.GetDevices(DeviceType.Joystick, DeviceEnumerationFlags.AttachedOnly);

                    if (devices.Count > 0)
                    {
                        var device = devices[0];
                        Log.Success("Controller connected: " + device.InstanceName);
                        Program.Socket.SendToElectron("controller-connected", new { message = "connected" });

                        joystick = new Joystick(directInput, device.InstanceGuid);
                        joystick.Properties.BufferSize = 128;
                        joystick.Acquire();

                        isConnected = true;
                        lastPsState = false;
                    }
                    else
                    {
                        Thread.Sleep(500);
                        continue;
                    }
                }

                try
                {
                    joystick.Poll();
                    var state = joystick.GetCurrentState();

                    bool[] buttons = state.Buttons;
                    bool psPressed = (buttons.Length > 12 && buttons[12]);

                    if (psPressed && !lastPsState && Program.CurrentlyPlaying != null)
                    {
                        Log.Info("PS Button Pressed");
                        Program.Socket.SendToElectron("controller-ps-home", null);
                    }

                    lastPsState = psPressed;
                }
                catch
                {
                    Log.Warning("Controller disconnected.");
                    Program.Socket.SendToElectron("controller-disconnected", new { message = "disconnected" });
                    isConnected = false;
                    joystick = null;
                }

                Thread.Sleep(10);
            }
        }
    }
}