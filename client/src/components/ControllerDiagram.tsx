import { useEffect, useState } from "react";

import "../css/controllerdiagram.css";

// https://commons.wikimedia.org/wiki/Category:PlayStation_controller_buttons
// https://commons.wikimedia.org/wiki/Category:Xbox_controller_buttons

// skal komme fra config fil
let controllerType = "xbox";

import ControllerImagePs4 from "../assets/buttons_ps/ps4-controller.png";
import ControllerImageXbox from "../assets/buttons_xbox/xbox-controller.png";

//#region PS4
import ButtonPS4X from "../assets/buttons_ps/PlayStation_button_X.svg";
import ButtonPS4L1 from "../assets/buttons_ps/PlayStation_4_button_L1.svg";
import ButtonPS4L2 from "../assets/buttons_ps/PlayStation_4_button_L2.svg";
import ButtonPS4L3 from "../assets/buttons_ps/PlayStation_button_L3.svg";
import ButtonPS4R1 from "../assets/buttons_ps/PlayStation_4_button_R1.svg";
import ButtonPS4R2 from "../assets/buttons_ps/PlayStation_4_button_R2.svg";
import ButtonPS4R3 from "../assets/buttons_ps/PlayStation_button_R3.svg";

import ButtonPS4Square from "../assets/buttons_ps/PlayStation_button_S.svg";
import ButtonPS4Circle from "../assets/buttons_ps/PlayStation_button_C.svg";
import ButtonPS4Triangle from "../assets/buttons_ps/PlayStation_button_T.svg";
import ButtonPS4Home from "../assets/buttons_ps/PlayStation_button_home.svg";
import ButtonPS4Options from "../assets/buttons_ps/PlayStation_4_Options_button.svg";
import ButtonPS4Share from "../assets/buttons_ps/PlayStation_4_Share_button.svg";
import ButtonPS4TouchPad from "../assets/buttons_ps/PlayStation_4_Touch_Pad_button.svg";

import ButtonPS4DpadUp from "../assets/buttons_ps/PlayStation_Portable_button_Up.svg";
import ButtonPS4DpadDown from "../assets/buttons_ps/PlayStation_Portable_button_Down.svg";
import ButtonPS4DpadLeft from "../assets/buttons_ps/PlayStation_Portable_button_Left.svg";
import ButtonPS4DpadRight from "../assets/buttons_ps/PlayStation_Portable_button_Right.svg";
//#endregion

//#region Xbox
import ButtonXboxDpadUp from "../assets/buttons_xbox/Xbox_D-Pad_Up.svg";
import ButtonXboxDpadDown from "../assets/buttons_xbox/Xbox_D-Pad_Down.svg";
import ButtonXboxDpadLeft from "../assets/buttons_xbox/Xbox_D-Pad_Left.svg";
import ButtonXboxDpadRight from "../assets/buttons_xbox/Xbox_D-Pad_Right.svg";

import ButtonXboxX from "../assets/buttons_xbox/Xbox_button_X.svg";
import ButtonXboxY from "../assets/buttons_xbox/Xbox_button_Y.svg";
import ButtonXboxB from "../assets/buttons_xbox/Xbox_button_B.svg";
import ButtonXboxA from "../assets/buttons_xbox/Xbox_button_A.svg";
//#endregion

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
          {controllerType === "ps4" ? (
            <>
              <img src={ControllerImagePs4} className="controller-image" />
              <>
                <div
                  className={`controller-button dpad-up ${
                    isPressed(12) ? "pressed" : ""
                  }`}
                >
                  <img src={ButtonPS4DpadUp} alt="" />
                </div>

                <div
                  className={`controller-button dpad-down ${
                    isPressed(13) ? "pressed" : ""
                  }`}
                >
                  <img src={ButtonPS4DpadDown} alt="" />
                </div>

                <div
                  className={`controller-button dpad-left ${
                    isPressed(14) ? "pressed" : ""
                  }`}
                >
                  <img src={ButtonPS4DpadLeft} alt="" />
                </div>

                <div
                  className={`controller-button dpad-right ${
                    isPressed(15) ? "pressed" : ""
                  }`}
                >
                  <img src={ButtonPS4DpadRight} alt="" />
                </div>

                <div
                  className={`controller-button face-triangle ${
                    isPressed(3) ? "pressed" : ""
                  }`}
                >
                  <img src={ButtonPS4Triangle} alt="" />
                </div>

                <div
                  className={`controller-button face-circle ${
                    isPressed(1) ? "pressed" : ""
                  }`}
                >
                  <img src={ButtonPS4Circle} alt="" />
                </div>

                <div
                  className={`controller-button face-cross ${
                    isPressed(0) ? "pressed" : ""
                  }`}
                >
                  <img src={ButtonPS4X} alt="" />
                </div>

                <div
                  className={`controller-button face-square ${
                    isPressed(2) ? "pressed" : ""
                  }`}
                >
                  <img src={ButtonPS4Square} alt="" />
                </div>

                <div
                  className={`controller-button share ${
                    isPressed(8) ? "pressed" : ""
                  }`}
                >
                  <img src={ButtonPS4Share} alt="" />
                </div>

                <div
                  className={`controller-button options ${
                    isPressed(9) ? "pressed" : ""
                  }`}
                >
                  <img src={ButtonPS4Options} alt="" />
                </div>

                <div
                  className={`controller-button home ${
                    isPressed(16) ? "pressed" : ""
                  }`}
                >
                  <img src={ButtonPS4Home} alt="" />
                </div>

                <div
                  className={`controller-button l1 ${
                    isPressed(4) ? "pressed" : ""
                  }`}
                >
                  <img src={ButtonPS4L1} alt="" />
                </div>

                <div
                  className={`controller-button r1 ${
                    isPressed(5) ? "pressed" : ""
                  }`}
                >
                  <img src={ButtonPS4R1} alt="" />
                </div>

                <div
                  className={`controller-button l2 ${
                    isPressed(6) ? "pressed" : ""
                  }`}
                >
                  <img src={ButtonPS4L2} alt="" />
                </div>

                <div
                  className={`controller-button r2 ${
                    isPressed(7) ? "pressed" : ""
                  }`}
                >
                  <img src={ButtonPS4R2} alt="" />
                </div>

                <div
                  className={`controller-button l3 ${
                    isPressed(10) ? "pressed" : ""
                  }`}
                >
                  <img src={ButtonPS4L3} alt="" />
                </div>

                <div
                  className={`controller-button r3 ${
                    isPressed(11) ? "pressed" : ""
                  }`}
                >
                  <img src={ButtonPS4R3} alt="" />
                </div>

                <div
                  className={`controller-button touch-pad ${
                    isPressed(17) ? "pressed" : ""
                  }`}
                >
                  <img src={ButtonPS4TouchPad} alt="" />
                </div>
              </>
            </>
          ) : (
            <>
              <img src={ControllerImageXbox} className="controller-image" />
              <>
                <div
                  className={`controller-button dpad-xbox-up ${
                    isPressed(12) ? "pressed" : ""
                  }`}
                >
                  <img src={ButtonXboxDpadUp} alt="" />
                </div>

                <div
                  className={`controller-button dpad-xbox-down ${
                    isPressed(13) ? "pressed" : ""
                  }`}
                >
                  <img src={ButtonXboxDpadDown} alt="" />
                </div>

                <div
                  className={`controller-button dpad-xbox-left ${
                    isPressed(14) ? "pressed" : ""
                  }`}
                >
                  <img src={ButtonXboxDpadLeft} alt="" />
                </div>

                <div
                  className={`controller-button dpad-xbox-right ${
                    isPressed(15) ? "pressed" : ""
                  }`}
                >
                  <img src={ButtonXboxDpadRight} alt="" />
                </div>

                <div
                  className={`controller-button face-y ${
                    isPressed(3) ? "pressed" : ""
                  }`}
                >
                  <img src={ButtonXboxY} alt="" />
                </div>

                <div
                  className={`controller-button face-b ${
                    isPressed(1) ? "pressed" : ""
                  }`}
                >
                  <img src={ButtonXboxB} alt="" />
                </div>

                <div
                  className={`controller-button face-a ${
                    isPressed(0) ? "pressed" : ""
                  }`}
                >
                  <img src={ButtonXboxA} alt="" />
                </div>

                <div
                  className={`controller-button face-x ${
                    isPressed(2) ? "pressed" : ""
                  }`}
                >
                  <img src={ButtonXboxX} alt="" />
                </div>

                <div
                  className={`controller-button back ${
                    isPressed(8) ? "pressed" : ""
                  }`}
                >
                  {/* <img src={ButtonShare} alt="" /> */}
                </div>

                <div
                  className={`controller-button start ${
                    isPressed(9) ? "pressed" : ""
                  }`}
                >
                  {/* <img src={ButtonOptions} alt="" /> */}
                </div>

                <div
                  className={`controller-button guide ${
                    isPressed(16) ? "pressed" : ""
                  }`}
                >
                  {/* <img src={ButtonHome} alt="" /> */}
                </div>

                <div
                  className={`controller-button lb ${
                    isPressed(4) ? "pressed" : ""
                  }`}
                >
                  {/* <img src={ButtonL1} alt="" /> */}
                </div>

                <div
                  className={`controller-button rb ${
                    isPressed(5) ? "pressed" : ""
                  }`}
                >
                  {/* <img src={ButtonR1} alt="" /> */}
                </div>

                <div
                  className={`controller-button lt ${
                    isPressed(6) ? "pressed" : ""
                  }`}
                >
                  {/* <img src={ButtonL2} alt="" /> */}
                </div>

                <div
                  className={`controller-button rt ${
                    isPressed(7) ? "pressed" : ""
                  }`}
                >
                 {/*  <img src={ButtonR2} alt="" /> */}
                </div>

                <div
                  className={`controller-button l3 ${
                    isPressed(10) ? "pressed" : ""
                  }`}
                >
                  {/* <img src={ButtonL3} alt="" /> */}
                </div>

                <div
                  className={`controller-button r3 ${
                    isPressed(11) ? "pressed" : ""
                  }`}
                >
                 {/*  <img src={ButtonR3} alt="" /> */}
                </div>

                <div
                  className={`controller-button touch-pad ${
                    isPressed(17) ? "pressed" : ""
                  }`}
                >
                  {/* <img src={ButtonTouchPad} alt="" /> */}
                </div>
              </>
            </>
          )}
        </div>

        {isController === "disconnected" && (
          <div className="controller-disconnected">Controller Disconnected</div>
        )}

        <div className="controller-diagram-help">
          <span>Hold</span>
          <img
            className="controller-diagram-help-icons"
            src={controllerType === "ps4" ? ButtonPS4Circle : ButtonXboxB}
            alt=""
          />
          <span>to Exit</span>
        </div>
      </div>
    </div>
  );
}

export default ControllerDiagram;
