import { useState } from "react";
import { pokemonList } from "./data";
import PokemonCard from "./components/PokemonCard";
import TeamItem from "./components/TeamItem";

export default function App() {
  const [team, setTeam] = useState([]);

  function addPokemonToTeam(pokemon) {
    const exists = team.find((p) => p.id === pokemon.id);
    if (exists) return;

    setTeam([...team, { ...pokemon, count: 1 }]);
  }


  function deletePokemon(id) {
    setTeam(team.filter((p) => p.id !== id));
  }


  function incrementPokemonCount(id) {
    setTeam(
      team.map((p) =>
        p.id === id ? { ...p, count: p.count + 1 } : p
      )
    );
  }

  
  function decrementPokemonCount(id) {
    setTeam(
      team.map((p) =>
        p.id === id && p.count > 1 ? { ...p, count: p.count - 1 } : p
      )
    );
  }


  const totalPokemon = team.reduce((sum, p) => sum + p.count, 0);

return (
  <div style={{ padding: "20px", background: "#d9ecff", minHeight: "100vh" }}>
    <h1 style={{ textAlign: "center" }}>Pokémon Team Manager</h1>

    <div
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: "30px",
      }}
    >
      {pokemonList.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onAdd={addPokemonToTeam}
        />
      ))}
    </div>

    <h2 style={{ marginTop: "40px", textAlign: "center" }}>
      Your Pokémon Team (Total: {totalPokemon})
    </h2>


    <div style={{ width: "70%", margin: "0 auto" }}>
      {team.map((item) => (
        <TeamItem
          key={item.id}
          item={item}
          increment={incrementPokemonCount}
          decrement={decrementPokemonCount}
          remove={deletePokemon}
        />
      ))}
    </div>

 
    <h2 style={{ textAlign: "center", marginTop: "40px" }}>
      Total Pokémon in Team: {totalPokemon}
    </h2>

    <h3 style={{ textAlign: "center" }}>Individual Pokémon Count</h3>

    <table
      style={{
        width: "60%",
        margin: "20px auto",
        background: "white",
        borderRadius: "8px",
        borderCollapse: "collapse",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
      }}
    >
      <thead>
        <tr style={{ background: "#e3e3e3", height: "40px" }}>
          <th>Nickname</th>
          <th>Count</th>
          <th>Label</th>
        </tr>
      </thead>

      <tbody>
        {team.map((item) => (
          <tr key={item.id} style={{ textAlign: "center", height: "35px" }}>
            <td style={{ color: "teal", fontWeight: "bold" }}>{item.name}</td>
            <td style={{ color: "red", fontWeight: "bold" }}>{item.count}</td>
            <td>{item.count > 1 ? "Pokémons" : "Pokémon"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);}