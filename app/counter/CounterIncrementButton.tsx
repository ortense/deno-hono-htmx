import { Button } from "../ui/Button.tsx";

export function CounterIncrementButton() {
  return (
    <Button
      hx-post="/counter/increment"
      hx-swap="outerHTML"
      hx-target=".CounterDisplay"
      class="CounterIncrementButton"
    >
      ➕
    </Button>
  );
}
