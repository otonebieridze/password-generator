import "./App.css";

function App() {
  return (
    <div className="container">
      <p className="title">Password Generator</p>

      <div className="password-box">
        <p>P4$5W0rD!</p>
        <div className="copy-div" />
      </div>

      <div className="generation-box">
        <div className="character-length">
          <h3>Character Length</h3>
          <h2>0</h2>
        </div>

        <input type="range" className="range-slider" value={10} min={0} max={20} step={1} />

        <div className="checkboxes">
          <div>
            <input type="checkbox" value="uppercase" />
            <label>Include Uppercase Letters</label>
          </div>
          <div>
            <input type="checkbox" value="lowercase" />
            <label>Include Lowercase Letters</label>
          </div>
          <div>
            <input type="checkbox" value="numbers" />
            <label>Include Numbers</label>
          </div>
          <div>
            <input type="checkbox" value="symbols" />
            <label>Include Symbols</label>
          </div>
        </div>
        
        <div className="strength-box">
          <p>STRENGTH</p>
          <div className="strength-result">
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>

        <button className="generate-btn">GENERATE</button>
      </div>
    </div>
  );
}

export default App;
