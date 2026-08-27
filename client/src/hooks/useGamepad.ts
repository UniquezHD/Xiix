import { useEffect, useRef } from "react";

export type ControllerAction =
  | "up"
  | "down"
  | "left"
  | "right"
  | "options"
  | "cross"
  | "circle"
  | "square"
  | "triangle"
  | "L1"
  | "L2"
  | "L3"
  | "R1"
  | "R2"
  | "R3"
  | "select"
  | "home"
  | "circle-release";

type Props = {
  onAction: (action: ControllerAction) => void;
};

export function useGamepad({ onAction }: Props) {
  const previousButtons = useRef<boolean[]>([]);
  const lastDirection = useRef<ControllerAction | null>(null);
  const lastDirectionTime = useRef(0);

  useEffect(() => {
    let animationFrame: number;

    const Poll = () => {
      const gamepads = navigator.getGamepads();

      const gamepad = Array.from(gamepads).find(
        (pad): pad is Gamepad => pad !== null,
      );

      if (gamepad) {
        const buttons = gamepad.buttons.map((button) => button.pressed);

        const previous = previousButtons.current;

        if (buttons[0] && !previous[0]) {
          onAction("cross");
        }

        if (buttons[1] && !previous[1]) {
          onAction("circle");
        }

        if (!buttons[1] && previous[1]) {
          onAction("circle-release");
        }

        if (buttons[2] && !previous[2]) {
          onAction("square");
        }

        if (buttons[3] && !previous[3]) {
          onAction("triangle");
        }

        if (buttons[4] && !previous[4]) {
          onAction("L1");
        }

        if (buttons[5] && !previous[5]) {
          onAction("R1");
        }

        if (buttons[6] && !previous[6]) {
          onAction("L2");
        }

        if (buttons[7] && !previous[7]) {
          onAction("R2");
        }

        if (buttons[8] && !previous[8]) {
          onAction("select");
        }

        if (buttons[9] && !previous[9]) {
          onAction("options");
        }

        if (buttons[10] && !previous[10]) {
          onAction("L3");
        }

        if (buttons[11] && !previous[11]) {
          onAction("R3");
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

      animationFrame = requestAnimationFrame(Poll);
    };

    Poll();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [onAction]);
}
