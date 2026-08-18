import { useEffect, useRef } from "react";

export type ControllerAction =
  | "up"
  | "down"
  | "left"
  | "right"
  | "select"
  | "back"
  | "home"
  | "options";

type Props = {
  onAction: (action: ControllerAction) => void;
};

export function useGamepad({ onAction }: Props) {
  const previousButtons = useRef<boolean[]>([]);
  const lastDirection = useRef<ControllerAction | null>(null);
  const lastDirectionTime = useRef(0);

  useEffect(() => {
    let animationFrame: number;

    const poll = () => {
      const gamepads = navigator.getGamepads();

      const gamepad = Array.from(gamepads).find(
        (pad): pad is Gamepad => pad !== null,
      );

      if (gamepad) {
        const buttons = gamepad.buttons.map((button) => button.pressed);

        const previous = previousButtons.current;

        if (buttons[0] && !previous[0]) {
          onAction("select");
        }

        if (buttons[1] && !previous[1]) {
          onAction("back");
        }

        if (buttons[9] && !previous[9]) {
          onAction("options");
        }

        if (buttons[12] && !previous[12]) {
          onAction("up");
        }

        if (buttons[13] && !previous[13]) {
          onAction("down");
        }

        if (buttons[14] && !previous[14]) {
          onAction("left");
        }

        if (buttons[15] && !previous[15]) {
          onAction("right");
        }

        if (buttons[16] && !previous[16]) {
          onAction("home");
        }

        const x = gamepad.axes[0] ?? 0;
        const y = gamepad.axes[1] ?? 0;

        const now = performance.now();

        if (now - lastDirectionTime.current > 200) {
          let direction: ControllerAction | null = null;

          if (x < -0.5) direction = "left";
          if (x > 0.5) direction = "right";
          if (y < -0.5) direction = "up";
          if (y > 0.5) direction = "down";

          if (direction) {
            onAction(direction);

            lastDirection.current = direction;
            lastDirectionTime.current = now;
          }
        }

        previousButtons.current = buttons;
      }

      animationFrame = requestAnimationFrame(poll);
    };

    poll();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [onAction]);
}
