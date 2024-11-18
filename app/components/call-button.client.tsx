import { useEffect, useState } from "react";

const WAITING_SEC = 180;

export function CallButton({
  last,
  onCall,
}: {
  last?: Date;
  onCall: () => void;
}) {
  const [waitSec, setWaitSec] = useState<number>(0);
  const lastMs = last?.getTime() ?? 0;

  useEffect(() => {
    document.addEventListener("keydown", (ev) => {
      const key = ev.code;
      if (key === "Enter") {
        onCall();
      }
    });
  }, [onCall]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setWaitSec(Math.max(WAITING_SEC - Math.floor((now - lastMs) / 1000), 0));
    });
    return () => {
      clearInterval(interval);
    };
  }, [last]);

  const disabled = waitSec > 0;

  return (
    <button
      className={`bg-gray-200 font-semibold border border-gray-500 rounded shadow p-8 ${
        disabled && "opacity-50"
      }`}
      disabled={disabled}
      onClick={onCall}
    >
      {waitSec > 0 && `呼び出し中です... ${waitSec}s`}
      {waitSec > 0 || "呼び出し [Enter]"}
    </button>
  );
}
