import { useEffect, useState } from "react";

function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      setTime(`${hh}:${mm}`);
    };

    update();
    const interval = setInterval(update, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h1>{time}</h1>
      <span style={{ marginTop: "-1rem"}}>{new Date().toLocaleDateString()}</span>
    </>
  );
}

export default Clock;
