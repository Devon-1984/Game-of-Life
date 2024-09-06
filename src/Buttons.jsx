import React from "react";

export default function Buttons({
  seed,
  startSimulation,
  stopSimulation,
  toggleBadApple,
}) {
  return (
    <div>
      <button
        onClick={seed}
        className="mt-4 px-4 py-2 bg-gray-500 mr-5 text-white rounded"
      >
        Seed
      </button>
      <button
        onClick={startSimulation}
        className="mt-4 px-4 py-2 bg-green-500 mr-5 text-white rounded"
      >
        Play
      </button>
      <button
        onClick={stopSimulation}
        className="mt-4 px-4 py-2 bg-red-500 mr-5 text-white rounded"
      >
        Pause
      </button>
      <button
        onClick={toggleBadApple}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Bad Apple
      </button>
    </div>
  );
}
