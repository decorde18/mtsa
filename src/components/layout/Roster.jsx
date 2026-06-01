"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { useDataContext } from "@/contexts/DataContext";

export default function Roster({ team }) {
  const {
    mtsaPlayers,
    players: importedPlayers,
    currentSeason,
  } = useDataContext();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (team && currentSeason) {
      const filteredPlayers = mtsaPlayers.filter(
        (player) =>
          player.season_id === currentSeason.id &&
          player.team_id === team.id &&
          player.division_id == team.division_id
      );
      setPlayers(
        importedPlayers.filter((player) =>
          filteredPlayers.some((p) => p.player_id === player.id)
        )
      );
    }
  }, [team, currentSeason, mtsaPlayers, importedPlayers]);

  const handlePrint = () => {
    window.print();
  };

  if (!team) return <p>Please select a team.</p>;
  if (!players.length) return <p>Loading roster...</p>;

  return (
    <div className="max-w-[80rem] mx-auto p-8 text-center max-md:max-w-full print:shadow-none print:border-none">
      {/* Header with logos */}
      <div className="flex justify-between items-center mb-8">
        <img className="w-32 h-auto" src='/images/logo.png' alt='MTSA Logo' />
        <div className="flex text-center flex-col gap-[10px]">
          <h1>Middle Tennessee Soccer Alliance</h1>
          <h2>{team.name}</h2>
          <h3>Season: {currentSeason.mtsa_name}</h3>
          <h3>Division: {team.division_name}</h3>
        </div>
        <img className="w-32 h-auto" src='/images/tnsoccer.png' alt='Right Logo' />
      </div>

      {/* Print Button */}
      <Button 
        className="bg-[var(--color-primary)] text-white border-none py-4 px-6 text-[1.6rem] cursor-pointer mb-4 hover:bg-[var(--color-secondary)] print:hidden" 
        onClick={handlePrint}
      >
        Print Roster
      </Button>

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-[var(--color-border)] p-2 bg-[var(--color-border)] font-bold print:border-[var(--color-border)]">Full Name</th>
            <th className="border border-[var(--color-border)] p-2 bg-[var(--color-border)] font-bold print:border-[var(--color-border)]">Season Age</th>
            <th className="border border-[var(--color-border)] p-2 bg-[var(--color-border)] font-bold print:border-[var(--color-border)]">Player ID</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td className="border border-[var(--color-border)] p-2 print:border-[var(--color-border)]">{player.fullname}</td>
              <td className="border border-[var(--color-border)] p-2 print:border-[var(--color-border)]">{player.age}</td>
              <td className="border border-[var(--color-border)] p-2 print:border-[var(--color-border)]">{player.player_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
