using System.Net.NetworkInformation;

namespace XiixService.Classes
{
    public class Internet
    {
        public static bool Check()
        {
            if (NetworkInterface.GetIsNetworkAvailable())
            {
                return true;
            }

            return false;
        }
    }
}
