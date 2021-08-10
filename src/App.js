import { useRef } from 'react';
import './App.css';
import DigiGrid from './DigiGrid'
import Slider from './components/Slider'

function App() {
  const waveSliderRef = useRef()
  const speedSliderRef = useRef()

  var testVar = 0;

  var settings = [testVar]

  function asciiClick(){
    window.dispatchEvent(new CustomEvent('characterMode', {detail: 'ascii'}))
  }
  function numberClick(){
    window.dispatchEvent(new CustomEvent('characterMode', {detail: 'numbers'}))
  }
  function gridClick(){
    window.dispatchEvent(new CustomEvent('characterMode', {detail: 'grid'}))
  }
  function heatClick(){
    window.dispatchEvent(new CustomEvent('colorMode', {detail: 'heatmap'}))
  }
  function grayscaleClick(){
    window.dispatchEvent(new CustomEvent('colorMode', {detail: 'grayscale'}))
  }
  function rainbowClick(){
    window.dispatchEvent(new CustomEvent('colorMode', {detail: 'rainbow'}))
  }

  return (
    <>
    <div className="grid">
      <div className="left">
      <Slider label = "Wavelength: " min = '1' max = '20' default = '10' sliderRef = { waveSliderRef } />
      </div>
      <div className="right">
      <Slider label = "Velocity: " min = '1' max = '5' default = '1' sliderRef = { speedSliderRef } />
      </div>
      <DigiGrid width = { '20' } height = { '20' } length = { waveSliderRef } speed = { speedSliderRef } settings = { settings } />
      <br></br>
      <div className="buttonGrid">
      <div className="buttons">
      <button className="buttonCharacters" onClick={asciiClick}>Ascii</button>
      <div style={{height: "5px"}}></div>
      <button className="buttonCharacters" onClick={numberClick}>Numbers</button>
      <div style={{height: "5px"}}></div>
      <button className="buttonCharacters" onClick={gridClick}>Tiles</button>
      </div>
      <div className="spacer"></div>
      <div className="buttons">
      <button className="buttonColors" onClick={heatClick}>Heatmap</button>
      <div style={{height: "5px"}}></div>
      <button className="buttonColors" onClick={rainbowClick}>Rainbow</button>
      <div style={{height: "5px"}}></div>
      <button className="buttonColors" onClick={grayscaleClick}>Grayscale</button>
      </div>
      </div>
    </div>
    </>
  );
}

export default App;
