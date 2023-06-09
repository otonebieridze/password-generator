import "./App.css";
import { useState, useEffect } from "react";

interface PasswordState {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

function App() {
  const [password, setPassword] = useState<PasswordState>({
    length: 10,
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });

  const [strengthLevel, setStrengthLevel] = useState(0);
  const strengthTexts = ["", "too weak!", "weak", "medium", "strong"];
  const bgColors = ["transparent", "#F64A4A", "#FB7C58", "#F8CD65", "#A4FFAF"];

  const [generatedPassword, setGeneratedPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setStrengthLevel(0);
    Object.keys(password).map((key) => {
      if (password[key as keyof PasswordState] === true) {
        setStrengthLevel((prev) => prev + 1);
      }
    });
  }, [password]);

  function changeUppercase() {
    setPassword({
      ...password,
      uppercase: !password.uppercase,
    });
  }
  function changeLowercase() {
    setPassword({
      ...password,
      lowercase: !password.lowercase,
    });
  }
  function changeNumbers() {
    setPassword({
      ...password,
      numbers: !password.numbers,
    });
  }
  function changeSymbols() {
    setPassword({
      ...password,
      symbols: !password.symbols,
    });
  }
  function changeLength(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setPassword({
      ...password,
      length: Number(value),
    });
  }

  function getBgColor(index: number) {
    if (index <= strengthLevel) {
      return bgColors[strengthLevel];
    } else {
      return bgColors[0];
    }
  }

  function generatePassword() {
    setGeneratedPassword("");
    setErrorMessage("");

    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+=-{}[]<>?,.";

    let validChars = "";

    if (password.lowercase) {
      validChars += lowercaseLetters;
    }
    if (password.uppercase) {
      validChars += uppercaseLetters;
    }
    if (password.numbers) {
      validChars += numbers;
    }
    if (password.symbols) {
      validChars += symbols;
    }

    if (password.length === 0) {
      setErrorMessage("Select a password length!");
    }

    for (let i = 0; i < password.length; i++) {
      if (validChars === "") {
        return setErrorMessage("Select at least one option!");
      }
      const randomIndex = Math.floor(Math.random() * validChars.length);
      setGeneratedPassword((prev) => prev + validChars[randomIndex]);
    }
  }

  function copyPassword() {
    if (generatedPassword.length > 0) {
      navigator.clipboard.writeText(generatedPassword);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000)
    }
  }

  return (
    <div className="container">
      <p className="title">Password Generator</p>

      <div className="password-box">
        {generatedPassword.length === 0 && errorMessage.length === 0 && (
          <p>P4$5W0rD!</p>
        )}
        {errorMessage.length === 0 ? (
          <p style={{ opacity: 1 }}>{generatedPassword}</p>
        ) : (
          <p style={{ color: "red", opacity: 0.9 }}>{errorMessage}</p>
        )}
        <div className="copy-div" onClick={copyPassword}>
          {copied && <p className="copied">copied!</p>}
        </div>
      </div>

      <div className="generation-box">
        <div className="character-length">
          <h3>Character Length</h3>
          <h2>{password.length}</h2>
        </div>

        <input
          type="range"
          className="range-slider"
          style={{
            background: `linear-gradient(to right, #A4FFAF 0%, #A4FFAF ${
              (password.length * 100) / 20
            }%, #18171F ${(password.length * 100) / 20}%, #18171F 100%)`,
          }}
          value={password.length}
          onChange={(e) => changeLength(e)}
          min={0}
          max={20}
          step={1}
        />

        <div className="checkboxes">
          <div>
            <input
              type="checkbox"
              value="uppercase"
              onChange={changeUppercase}
            />
            <label>Include Uppercase Letters</label>
          </div>
          <div>
            <input
              type="checkbox"
              value="lowercase"
              onChange={changeLowercase}
            />
            <label>Include Lowercase Letters</label>
          </div>
          <div>
            <input type="checkbox" value="numbers" onChange={changeNumbers} />
            <label>Include Numbers</label>
          </div>
          <div>
            <input type="checkbox" value="symbols" onChange={changeSymbols} />
            <label>Include Symbols</label>
          </div>
        </div>

        <div className="strength-box">
          <p>STRENGTH</p>
          <div className="strength-result">
            <p>{strengthTexts[strengthLevel].toUpperCase()}</p>
            <div
              style={{
                backgroundColor: getBgColor(1),
              }}
            />
            <div
              style={{
                backgroundColor: getBgColor(2),
              }}
            />
            <div
              style={{
                backgroundColor: getBgColor(3),
              }}
            />
            <div
              style={{
                backgroundColor: getBgColor(4),
              }}
            />
          </div>
        </div>

        <button className="generate-btn" onClick={generatePassword}>
          GENERATE
        </button>
      </div>
    </div>
  );
}

export default App;
