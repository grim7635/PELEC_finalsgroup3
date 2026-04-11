export default function Button({ text, onClick, type = "submit" }) {
  return (
    <button className="btn" type={type} onClick={onClick}>
      {text}
    </button>
  );
}