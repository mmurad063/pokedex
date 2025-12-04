export default function CounterButton({ children, onClick, color }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: color,
        padding: "6px 12px",
        color: "white",
        borderRadius: "6px",
        margin: "0 5px",
        border: "none",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}