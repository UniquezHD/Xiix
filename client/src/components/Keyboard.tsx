import { useState } from "react";
import { useGamepad, type ControllerAction } from "../hooks/useGamepad";
import "../css/keyboard.css";
import ButtonX from "../assets/buttons_ps/PlayStation_button_X.svg";
import ButtonL2 from "../assets/buttons_ps/PlayStation_4_button_L2.svg";
import ButtonR2 from "../assets/buttons_ps/PlayStation_4_button_R2.svg";
import ButtonSquare from "../assets/buttons_ps/PlayStation_button_S.svg";
import ButtonCircle from "../assets/buttons_ps/PlayStation_button_C.svg";
import ButtonTriangle from "../assets/buttons_ps/PlayStation_button_T.svg";

// https://commons.wikimedia.org/wiki/Category:PlayStation_controller_buttons
// https://commons.wikimedia.org/wiki/Category:Xbox_controller_buttons

const keys = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

const keysUpperCase = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

type KeyboardProps = {
  onSubmit?: (value: string) => void;
  onCancel?: () => void;
};

function Keyboard({ onSubmit, onCancel }: KeyboardProps) {
  const [value, setValue] = useState("");
  const [isUpperCase, setIsUpperCase] = useState<boolean>(true);

  useGamepad({
    onAction: (action: ControllerAction) => {
      switch (action) {
        case "circle":
          onCancel?.();
          break;

        case "square":
          HandleBackspace();
          break;

        case "L2":
          HandleShift();
          break;

        case "R2":
          HandleEnter();
          break;

        case "triangle":
          HandleSpace();
          break;
      }
    },
  });

  const HandleShift = () => {
    setIsUpperCase(!isUpperCase);
  };

  const HandleKeyPress = (key: string) => {
    setValue((current) => current + key);
  };

  const HandleBackspace = () => {
    setValue((current) => current.slice(0, -1));
  };

  const HandleSpace = () => {
    setValue((current) => current + " ");
  };

  const HandleEnter = () => {
    onSubmit?.(value);
  };

  return (
    <div className="keyboard-overlay">
      <div className="keyboard-container">
        <div className="keyboard-header">
          <div className="keyboard-input">
            {value || <span className="keyboard-placeholder">Search</span>}
            <span className="keyboard-cursor" />
          </div>
        </div>

        <div className="keyboard-keys">
          {isUpperCase ? (
            <>
              {keysUpperCase.map((row, _i) => (
                <div className="keyboard-row">
                  {row.map((key) => (
                    <button
                      className="keyboard-key"
                      data-controller-focus
                      data-controller-group="keyboard"
                      onClick={() => HandleKeyPress(key)}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              ))}
            </>
          ) : (
            <>
              {keys.map((row, _i) => (
                <div className="keyboard-row">
                  {row.map((key) => (
                    <button
                      className="keyboard-key"
                      data-controller-focus
                      data-controller-group="keyboard"
                      onClick={() => HandleKeyPress(key)}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              ))}
            </>
          )}

          <div className="keyboard-row keyboard-bottom-row">
            <button
              className="keyboard-key keyboard-shift-key"
              data-controller-focus
              data-controller-group="keyboard"
              onClick={() => HandleShift()}
            >
              Shift
            </button>

            <button
              className="keyboard-key keyboard-delete-key"
              data-controller-focus
              data-controller-group="keyboard"
              onClick={() => HandleBackspace()}
            >
              Delete
            </button>

            <button
              className="keyboard-key keyboard-space-key"
              data-controller-focus
              data-controller-group="keyboard"
              onClick={() => HandleSpace()}
            >
              Space
            </button>

            <button
              className="keyboard-key keyboard-enter-key"
              data-controller-focus
              data-controller-group="keyboard"
              onClick={() => HandleEnter()}
            >
              Enter
            </button>
          </div>
        </div>

        <div className="keyboard-controller-help">

          <img
            className="keyboard-controller-help-icons"
            src={ButtonL2}
            alt=""
          />
          <span>Shift</span>

          <img
            className="keyboard-controller-help-icons"
            src={ButtonX}
            alt=""
          />
          <span>Select</span>

          <img
            className="keyboard-controller-help-icons"
            src={ButtonTriangle}
            alt=""
          />
          <span>Space</span>

          <img
            className="keyboard-controller-help-icons"
            src={ButtonSquare}
            alt=""
          />
          <span>Delete</span>

          <img
            className="keyboard-controller-help-icons"
            src={ButtonCircle}
            alt=""
          />
          <span>Cancel</span> 

          <img
            className="keyboard-controller-help-icons"
            src={ButtonR2}
            alt=""
          />
          <span>Enter</span>
        </div>
      </div>
    </div>
  );
}

export default Keyboard;
