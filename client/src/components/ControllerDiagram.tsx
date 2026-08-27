import { useEffect, useState } from "react";

import "../css/controllerdiagram.css";

import ControllerImage from "../assets/buttons_ps/ps4-controller.png";

import ButtonX from "../assets/buttons_ps/PlayStation_button_X.svg";
import ButtonL1 from "../assets/buttons_ps/PlayStation_4_button_L1.svg";
import ButtonL2 from "../assets/buttons_ps/PlayStation_4_button_L2.svg";
import ButtonL3 from "../assets/buttons_ps/PlayStation_button_L3.svg";
import ButtonR1 from "../assets/buttons_ps/PlayStation_4_button_R1.svg";
import ButtonR2 from "../assets/buttons_ps/PlayStation_4_button_R2.svg";
import ButtonR3 from "../assets/buttons_ps/PlayStation_button_R3.svg";

import ButtonSquare from "../assets/buttons_ps/PlayStation_button_S.svg";
import ButtonCircle from "../assets/buttons_ps/PlayStation_button_C.svg";
import ButtonTriangle from "../assets/buttons_ps/PlayStation_button_T.svg";
import ButtonHome from "../assets/buttons_ps/PlayStation_button_home.svg";
import ButtonOptions from "../assets/buttons_ps/PlayStation_4_Options_button.svg";
import ButtonShare from "../assets/buttons_ps/PlayStation_4_Share_button.svg";
import ButtonTouchPad from "../assets/buttons_ps/PlayStation_4_Touch_Pad_button.svg";

import ButtonDpadUp from "../assets/buttons_ps/PlayStation_Portable_button_Up.svg";
import ButtonDpadDown from "../assets/buttons_ps/PlayStation_Portable_button_Down.svg";
import ButtonDpadLeft from "../assets/buttons_ps/PlayStation_Portable_button_Left.svg";
import ButtonDpadRight from "../assets/buttons_ps/PlayStation_Portable_button_Right.svg";

type GamepadState = {
  connected: boolean;
  buttons: boolean[];
  axes: number[];
};

type ControllerDiagramProps = {
  isController?: string;
};

function ControllerDiagram({ isController }: ControllerDiagramProps) {
  const [gamepad, setGamepad] = useState<GamepadState>({
    connected: false,
    buttons: [],
    axes: [],
  });

  useEffect(() => {
    let animationFrame: number;

    const pollGamepad = () => {
      const pads = navigator.getGamepads();
      const pad = Array.from(pads).find(Boolean);

      if (pad) {
        setGamepad({
          connected: true,
          buttons: pad.buttons.map((button) => button.pressed),
          axes: Array.from(pad.axes),
        });
      } else {
        setGamepad({
          connected: false,
          buttons: [],
          axes: [],
        });
      }

      animationFrame = requestAnimationFrame(pollGamepad);
    };

    pollGamepad();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const isPressed = (index: number) => {
    return gamepad.buttons[index] ?? false;
  };

  return (
    <div className="controller-diagram-container">
      <div className="controller-diagram">
        <div className="controller-image-wrapper">
          <img src={ControllerImage} className="controller-image" />

          {isController === "disconnected" && (
            <div className="controller-disconnected">
              Controller Disconnected
            </div>
          )}

          <>
            <div
              className={`controller-button dpad-up ${
                isPressed(12) ? "pressed" : ""
              }`}
            >
              <img src={ButtonDpadUp} alt="" />
            </div>

            <div
              className={`controller-button dpad-down ${
                isPressed(13) ? "pressed" : ""
              }`}
            >
              <img src={ButtonDpadDown} alt="" />
            </div>

            <div
              className={`controller-button dpad-left ${
                isPressed(14) ? "pressed" : ""
              }`}
            >
              <img src={ButtonDpadLeft} alt="" />
            </div>

            <div
              className={`controller-button dpad-right ${
                isPressed(15) ? "pressed" : ""
              }`}
            >
              <img src={ButtonDpadRight} alt="" />
            </div>

            <div
              className={`controller-button face-triangle ${
                isPressed(3) ? "pressed" : ""
              }`}
            >
              <img src={ButtonTriangle} alt="" />
            </div>

            <div
              className={`controller-button face-circle ${
                isPressed(1) ? "pressed" : ""
              }`}
            >
              <img src={ButtonCircle} alt="" />
            </div>

            <div
              className={`controller-button face-cross ${
                isPressed(0) ? "pressed" : ""
              }`}
            >
              <img src={ButtonX} alt="" />
            </div>

            <div
              className={`controller-button face-square ${
                isPressed(2) ? "pressed" : ""
              }`}
            >
              <img src={ButtonSquare} alt="" />
            </div>

            <div
              className={`controller-button share ${
                isPressed(8) ? "pressed" : ""
              }`}
            >
              <img src={ButtonShare} alt="" />
            </div>

            <div
              className={`controller-button options ${
                isPressed(9) ? "pressed" : ""
              }`}
            >
              <img src={ButtonOptions} alt="" />
            </div>

            <div
              className={`controller-button home ${
                isPressed(16) ? "pressed" : ""
              }`}
            >
              <img src={ButtonHome} alt="" />
            </div>

            <div
              className={`controller-button l1 ${
                isPressed(4) ? "pressed" : ""
              }`}
            >
              <img src={ButtonL1} alt="" />
            </div>

            <div
              className={`controller-button r1 ${
                isPressed(5) ? "pressed" : ""
              }`}
            >
              <img src={ButtonR1} alt="" />
            </div>

            <div
              className={`controller-button l2 ${
                isPressed(6) ? "pressed" : ""
              }`}
            >
              <img src={ButtonL2} alt="" />
            </div>

            <div
              className={`controller-button r2 ${
                isPressed(7) ? "pressed" : ""
              }`}
            >
              <img src={ButtonR2} alt="" />
            </div>

            <div
              className={`controller-button l3 ${
                isPressed(10) ? "pressed" : ""
              }`}
            >
              <img src={ButtonL3} alt="" />
            </div>

            <div
              className={`controller-button r3 ${
                isPressed(11) ? "pressed" : ""
              }`}
            >
              <img src={ButtonR3} alt="" />
            </div>

            <div
              className={`controller-button touch-pad ${
                isPressed(17) ? "pressed" : ""
              }`}
            >
              <img src={ButtonTouchPad} alt="" />
            </div>
          </>
        </div>
        <div className="controller-diagram-help">

          <span>Hold</span>
          <img
            className="controller-diagram-help-icons"
            src={ButtonCircle}
            alt=""
          />
          <span>to Exit</span>
        </div>
      </div>
    </div>
  );
}

export default ControllerDiagram;
