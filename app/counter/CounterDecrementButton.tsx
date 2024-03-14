import { Button } from "../ui/Button.tsx";

export function CounterDecrementButton() {
  return (
    <Button
      hx-post="/counter/decrement"
      hx-swap="outerHTML"
      hx-target=".CounterDisplay"
      class="CounterDecrementButton"
    >
      ➖
    </Button>
  );
}
