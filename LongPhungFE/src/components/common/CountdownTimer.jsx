import { useEffect, useState } from "react";

const CountdownTimer = ({ createdAt }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(createdAt));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(createdAt));
    }, 1000);
    return () => clearInterval(timer);
  }, [createdAt]);

  function getTimeRemaining(startTime) {
    const deadline = new Date(startTime).getTime() + 24 * 60 * 60 * 1000;
    const diff = deadline - Date.now();
    if (diff <= 0) return "Hết hạn";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  return (
    <div style={{ fontSize: 12, fontWeight: "bold" }}>
      {timeLeft}
    </div>
  );
};
export default CountdownTimer;

