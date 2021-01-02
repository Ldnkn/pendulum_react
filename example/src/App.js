import React, { useRef, useEffect, useState } from 'react'
// var k =  document.getElementById('k').value;
// var m = document.getElementById('m').value;
let k = 50;
let m = 10;
var y = 0;
var t = 1;
var g = 9.8;
var v = 0;
var dt = 0.11;
var F;
var a = 1;

let prevTime = undefined;
let dynamicData = {
  k: k,
};


const App = props => {

  const canvasRef = useRef(null);

  // const [stateK, setStateK] = useState(k);

  const draw = (ctx, dt=0.11) => {
    t = t + dt;
    let dynamicK = dynamicData.k;
    console.log('dynamic K', dynamicData);
		F = 5*m*g - (0.05 * dynamicK)*y;
		a = F/m;
		v = v + a*dt;
    y = y + v*dt + a*(dt*dt)/2;
    ctx.clearRect(0, 0, 300, 800);
		ctx.fillStyle = "grey";
		ctx.fillRect(149.7 - (dynamicK / 30), 0, 1 + (dynamicK / 15), 75 + y);
		ctx.fillStyle = "black";
    ctx.fillRect((300 - 10 * m) / 2, 75 + y, 10 * m, 20 * m);
  };

  const render = (timestamp) => {
    let deltaT = !!prevTime ? timestamp - prevTime : 0;
    prevTime = timestamp;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d')
    canvas.width = 300;
    canvas.height = 800;
    draw(context, deltaT/1000);

    window.requestAnimationFrame(render);
  };

  const onInputChange = (e) => {
    const inputValue = e?.target?.value;
    console.log('debug on event', inputValue);
    // setStateK(inputValue);
    dynamicData.k = inputValue;

    e.preventDefault();
  };

  useEffect(() => {
    // console.log('call use effect');
    // let firstInput = document.getElementById('k');
    // console.log('first input', firstInput);
    //
    // firstInput.onchange = (e) => console.log('debug on event', e?.target?.value);

    render()
  }, []);

  return (
    <>
      <div>
        <h1 className ="top">Пружинный маятник</h1>
        <p>Коэффициент упругости k = </p>

        <input id="k" type="number" min="1" max="121" step="10" value={dynamicData.k} onChange={onInputChange}/>

        <p>Масса груза m =   кг</p> <input id="m" type="number" value="10" min="0.1" max="10" step="1" />

        <button id="mainButton">ЗАПУСК</button>
      </div>
      <canvas ref={canvasRef} {...props}/>
    </>
  )
}



export default App
