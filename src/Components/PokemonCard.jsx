import AddButton from "./AddButton";

export default function PokemonCard({ pokemon, onAdd }) {
  return (
    <div
      style={{
        width: "180px",
        background: "white",
        padding: "15px",
        borderRadius: "12px",
        textAlign: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      }}
    >
     <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        alt={pokemon.name}
        width={80}
        height={80}
      />
      <h3>{pokemon.name}</h3>
   

      <AddButton onClick={() => onAdd(pokemon)} />
    </div>
  );
}