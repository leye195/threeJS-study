# Three.js Responsive Design

## 반응형에서 발생 가능한 문제

canvas는 기본적으로 300x150 size로 설정되 있음 (aspect = 2) <br/>

canvas에 `width:100%`,`height:100%`,`display:block`을 아래 css 형식으로 정의한 경우<br/>

```
html, body {
  margin: 0;
  height: 100%;
}
#c {
  width: 100%;
  height: 100%;
  display: block;
}

```

2가지 문제가 발생:

- cube가 늘어지는 현상 발생, 너무 넓거나 너무 길어지는 보임
- 퀄리티가 떨어져보임

**stretchy 문제 해결 방법**

camera의 aspect를 canvas의 display size로 설정을 해주며 화면이 삐뚤어져 보이는 문제를 해결한다.

```
const render = (time) => {
  time*=0.001;

  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth/canvas/clientHeight;
  camera.updateProjectionMatrix();
  ...
}
``
```

**blockiness 문제 해결 방법**

canvas는 2가지 사이즈를 가지고 있음:

1. page에 display되는 canvas 사이즈
2. canvas의 내부 크기 (internal size), drawingbuffer size

three.js의 renderer.setSize를 통해 canvas의 drawingbuffer size를 설정해줄수 있으며, display 되는 사이즈와 canvas의 clientWidth, clientHeight의 비교를 통해 사이즈 조절 필요 여부를 체크한다.

```
const resizeRendererToDisplaySize = (renderer) => {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = width !== canvas.width || height !== canvas.height;
  if(needResize) {
    renderer.setSize(width,height,false);
  }
  return needResize;
}

...
//resizeRendererToDisplaySize()가 true인 경우 camera의 aspect를 바꿔주는 작업을 진행하도록 설정
if(resizeRendererToDisplaySize(renderer)) {
  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
}

...

```

## HD-DPI Display

HD-DPI: 인치 당 고밀도 dot display를 말함.

**three.js에서 HD-DPI 처리하는 방법**

1. renderer.setPixelRatio를 통해 browser에 css 픽셀에서 device 픽셀로 전환하기 위해서는 어떤 multiplier를 three.js에 전달 할 것인지를 물어봐 renderer.setSize가 호출 될 시 multiplied된 size를 전달 (권장되지 않는 방법)
2. 본인이 작성하는 방법 (이 방법을 활용할 경우 요청하는 값이 무엇인지 알수 있음)

```
const resizeRendererToDisplaySize = (renderer) => {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width = canvas.clientWidth*pixelRatio | 0;
  const height = canvas.clientHeight*pixelRatio | 0;
  const needResize = width !==canvas.width || height !== canvas.height;
  if(needResize) {
    renderer.setSize(width,height,false);
  }
  return needResize;
}
```
