import React, { useRef, useEffect, useState, createRef } from 'react'
// var k =  document.getElementById('k').value;
// var m = document.getElementById('m').value;
let k = 50;
let m = 10;
var y = 0;
var t = 1;
let g = 9.8;
var v = 0;
var dt = 0.11;
var F;
var a = 1;

let prevTime = undefined;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.canvasRef = createRef();
    this.state = {
      stateK: 50,
    }
  }

  // const [stateK, setStateK] = useState(k);

  componentDidMount() {
    this.move()
  }

  draw = (ctx, dt=0.11) => {
    const {stateK} = this.state;
    t = t + dt;
		F = 5*m*g - (0.05 * stateK)*y;
		a = F/m;
		v = v + a*dt;
    y = y + v*dt + a*(dt*dt)/2;
    ctx.clearRect(0, 0, 300, 800);
		ctx.fillStyle = "grey";
		ctx.fillRect(149.7 - (stateK / 30), 0, 1 + (stateK / 15), 75 + y);
		ctx.fillStyle = "black";
    ctx.fillRect((300 - 10 * m) / 2, 75 + y, 10 * m, 20 * m);
  };

  move = (timestamp) => {
    let deltaT = !!prevTime ? timestamp - prevTime : 0;
    prevTime = timestamp;
    const canvas = this.canvasRef.current;
    const context = canvas.getContext('2d')
    canvas.width = 300;
    canvas.height = 800;
    this.draw(context, deltaT/1000);
    g += 1;
    console.log('debug on g in move', g);

    window.requestAnimationFrame(this.move);
  };

  onInputChange = (e) => {
    const inputValue = e?.target?.value;
    console.log('debug on event', inputValue);
    this.setState({stateK: inputValue});

    e.preventDefault();
  };

  // useEffect(() => {
    // console.log('call use effect');
    // let firstInput = document.getElementById('k');
    // console.log('first input', firstInput);
    //
    // firstInput.onchange = (e) => console.log('debug on event', e?.target?.value);


  // }, []);
  render () {
    return (
      <>
        <div>
          <h1 className="top">Пружинный маятник</h1>
          <p>Коэффициент упругости k = </p>
          <p>Коэффициент упругости k = </p>

          <input id="k" type="number" min="1" max="121" step="10" value={ this.state.stateK } onChange={ this.onInputChange }/>

          <p>Масса груза m = кг</p> <input id="m" type="number" value="10" min="0.1" max="10" step="1"/>

          <button id="mainButton">ЗАПУСК</button>
        </div>
        <canvas ref={ this.canvasRef } { ...this.props }/>
      </>
    )
  }
}



export default App
