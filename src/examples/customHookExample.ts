import { useState, useEffect } from "react";

// You cannot use this like context, it must be passed through props.

function useTicTacToeApi() {
  const [turn, setTurn] = useState("X");
  const toggleTurn = setTurn(turn == "X" ? "O" : "X");

  return {
    turn,
    toggleTurn,
  };
}

export function useGeolocation() {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [status, setStatus] = useState("requesting");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (result) => {
        console.log(result);
        setLocation(result);
        setStatus("approved");
      },
      () => {
        setStatus("denied");
      }
    );
  }, []);

  return {
    location,
    status,
  };
}
