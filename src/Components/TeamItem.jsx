import CounterButton from "./CounterButton";

export default function TeamItem({ item, increment, decrement, remove }) {
  return (
    <div
      style={{
        width: "100%",
        background: "white",
        padding: "15px",
        borderRadius: "12px",
        marginBottom: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`}
          alt={item.name}
          width={55}
        />
        <h3>{item.name}</h3>
      </div>


      <div>
        <CounterButton color="#f4a300" onClick={() => decrement(item.id)}>
          -
        </CounterButton>

        <span style={{ margin: "0 8px", fontWeight: "bold" }}>{item.count}</span>

        <CounterButton color="#228b22" onClick={() => increment(item.id)}>
          +
        </CounterButton>
      </div>

      <CounterButton color="#d9534f" onClick={() => remove(item.id)}>
        Remove
      </CounterButton>
    </div>
  );
}