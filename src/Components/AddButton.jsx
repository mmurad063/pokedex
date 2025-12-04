export default function AddButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "#1e90ff",
        padding: "8px 14px",
        color: "white",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
      }}
    >
      Add to Team
    </button>
  );
}