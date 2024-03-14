export function CounterDisplay({ value }: { value: number }) {
  const color = value > 0
    ? "lightgreen"
    : value < 0
    ? "lightcoral"
    : "lightsteelblue";

  return (
    <span
      style={{ color }}
      class="CounterDisplay"
    >
      {value}
    </span>
  );
}
