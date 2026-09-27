import LoginIcon from "../../assets/ui/login.svg?react";
import LockIcon from "../../assets/ui/lock.svg?react";
import { KeyboardPasswordOutputType, KeyboardType } from "../../types";

type LoginModalProps = {
  keyboardOutput: string;
  keyboardPasswordOutput: KeyboardPasswordOutputType | undefined;
  setKeyboardOpen: React.Dispatch<React.SetStateAction<KeyboardType>>;

  setIsLoggedIn: (value: boolean) => void;

  onClose: () => void;
};

export function LoginModal({
  keyboardOutput,
  setKeyboardOpen,
  setIsLoggedIn,
  keyboardPasswordOutput,
  onClose,
}: LoginModalProps) {

  const api =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3001"
    : "";

  const HandleLogin = (username: string, password?: string) => {

    //Todo: fix keyboardPasswordOutput possible undefined
    if(password ==  undefined) return;

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    fetch(`${api}/api/login`, {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data from Go: ", data)
      });

    console.log("Login: ", username, password);
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="login-title">
          <div className="login-title-icon">
            <LockIcon />
          </div>

          <div>
            <h2>Login</h2>
            <p>Login to use social features</p>
          </div>
        </div>
      </div>

      <div className="login-section">
        <div className="login-section-title">Action</div>

        <input
          className="login-keyboard-input"
          placeholder="Username"
          value={keyboardOutput}
          onClick={() => setKeyboardOpen({ isOpen: true, isPassword: false })}
          data-controller-focus
          data-controller-group="Login-modal"
        />

        <input
          className="login-keyboard-input"
          placeholder="Password"
          value={keyboardPasswordOutput?.valuePassword}
          onClick={() => setKeyboardOpen({ isOpen: true, isPassword: true })}
          data-controller-focus
          data-controller-group="Login-modal"
        />

        <button
          className="login-container-button"
          data-controller-focus
          data-controller-group="Login-modal"
          onClick={() => {
            // check login
            HandleLogin(keyboardOutput, keyboardPasswordOutput?.value);
            setIsLoggedIn(true);
            onClose();
          }}
        >
          <div className="login-button-icon">
            <LoginIcon />
          </div>

          <div className="login-button-content">
            <span>Login</span>
            <small>Login to social account</small>
          </div>
        </button>
      </div>
    </div>
  );
}
