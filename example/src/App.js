import React, { useRef, useEffect } from 'react'
var k =  document.getElementById('k').value;
var m = document.getElementById('m').value;
var y = 0;
var t = 1;
var g = 9.8;
var v = 0;
var dt = 0.11;
var F;
var a = 1;

const Canvas = props => {
  
  const canvasRef = useRef(null)
  
  const draw = ctx => {
    t = t + dt;
		F = 5*m*g - (0.05 * k)*y;
		a = F/m;
		v = v + a*dt;
    y = y + v*dt + a*(dt*dt)/2;
    ctx.clearRect(0, 0, 300, 800);
		ctx.fillStyle = "grey";
		ctx.fillRect(149.7 - (k / 30), 0, 1 + (k / 15), 75 + y);
		ctx.fillStyle = "black";
    ctx.fillRect((300 - 10 * m) / 2, 75 + y, 10 * m, 20 * m);
  }


  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    canvas.width = 300;
    canvas.height = 800;
    let animationFrameId
    
    //Our draw come here
    const render = () => {
      draw(context)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  return <canvas ref={canvasRef} {...props}/>
}



export default Canvas
