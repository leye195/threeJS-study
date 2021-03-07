# Fundamentals

## Three.js Primitives

- BoxGeometry: a box

```
const width = 5;
const height = 5;
const depth = 5;

const geometry = new THREE.BoxGeoMetry(width,height,depth)
```

- CircleGeometry: a flat circle (납작 원)

```
const radious = 4;
const segments = 30;
const thetaStart = Math.PI * 2.0;
const thetaLength = Math.PI * 2.0;

const geometry = new THREE.CircleGeoMetry(radius,segments,thetaStart,thetaLength)

```

- ConeGeometry: a cone (콘)

```
const radius = 2.5;
const height = 5;
const radialSegments = 15;
const heightSegments = 3;
const openEnded = true;
const thetaStart = Math.PI * 2.0;
const thetaLength = Math.PI * 2.0;

const geometry = new THREE.ConeGeoMetry(radius,height,radialSegments,heightSegments,openEnded,thetaStart,thetaLength)
```

- CylinderGeometry: a cylinder (실린더)

```
const radiusTop = 5;
const radiousBottom = 5;
const height = 5;
const radialSegments = 20;
const heightSegments = 10;
const thetaStart = Math.PI * 0.70;
const thetaLength = Math.PI * 1.0;
const geometry = new THREE.CylinderGeometry(radiusTop,radiusBottom,height,radialSegments,heightSegments,openEnded,thetaStart,thetaLength)
```

- DodecahedronGeometry: a dodecahedron (12sides) 십이면체

```
const radius = 3.9;
const detail = 5;
const geometry = new THREE.DodecahedronGeometry(radius,detail)
```

- ExtrudeGeometry (extruded 2d shape with optional bevelling)

```

const extrudeSettings = {
  steps:   1,
  depth:  1.0,
  bevelEnabled: false,
  bevelThickness: 0.10,
  bevelSize: 0.10,
  bevelSegments: 0,
};

const geometry = new THREE.ExtrudeGeometry(shape,extrudeSettings);
```

- IcosahedronGeometrt: An icosahedron (20 sides) 20면체

```
const geometry = new THREE.IcosahedronGeometry(radius,detail);
```

- LatheGeometry: 선을 회전하여 생성 된 모양

```
const points = [];
for (let i = 0; i < 10; ++i) {
  points.push(new THREE.Vector2(Math.sin(i * 0.2) * 3 + 3, (i - 5) * .8));
}
const geometry = new THREE.LatheGeometry(points);
```

- OctahedronGeometry: An Octahedron (8 sides) 팔면체

```
const radius = 7;
const detail = 0;
const geometry = new THREE.OctahedronGeometry(radius, detail);
```

- PlaneGeoMetry: 2d plane (평면)

```
const width = 9;
const height = 9;
const widthSegments = 10;
const heightSegments = 2;
const geometry = new THREE.PlaneGeometry(
    width, height,
    widthSegments, heightSegments);
```

- SphereGeometry: a sphere (구)

```
const radius = 7;
const widthSegments = 30;
const heightSegments = 30;
const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
```

- TextGeometry: 3d text generated from a 3d font and a string

## Scene Graph

3D 엔진에서 Scene graph는 노드들이 계층 구조로 연결 되있는 그래프로 각 노드는 하나의 공간을 나타낸다.

Scene 객체 하나와 여러개의 Mesh, Light, Object3D 그리고 Camera를 포함함.

- Scene: Scene Graph의 루트를 정의하고 어디에 객체들이 나타날것인지 어떻게 놓여질 것인지 재현함.
- Mesh: 어떤 Material로 Geometry를 그리는 객체
  - Material: 기하학 객체를 그리는데 사용되는 표면 속성
  - Geometry: 기하학 객체의 정점 데이터 (구, 정육면체, 면 등등 다양한 것이 될 수 있음)
- Light: 여러 종류의 광원에 해당

<img src="https://threejsfundamentals.org/threejs/lessons/resources/images/scenegraph-generic.svg"/>

솔라 시스템을 예로 들면 지구는 태양의 주위를 공전, 달은 지구의 주위를 공전 있는데. <br/>
달의 관점에서 지구의 `local space`를 돌고 있는 것으로 볼 수 있음.

camera의 뷰를 설정하는 방식

- lookAt: 현재 위치에서 입력한 position를 바라보게 회전 시켜줌
- up: 어느 방향이 윗 방향이지 설정 해 줄수 있음.

```
const camera = new THREE.perspectiveCamera(fov,aspect,near,far);
camera.up.set(0,0,1);
camera.lookAt.set(0,0,0);
```

- Scene graph의 다른 예 자동차
  <img src="https://threejsfundamentals.org/threejs/lessons/resources/images/scenegraph-car.svg"/>

차체(car body)를 움직이면 바퀴(wheel)도 같이 움직임, 차체가 바퀴와 별도로 튀게 하려면 차체와 바퀴를 하나의 차체의 프레임 요소의 자식으로 설정해 줄 수 있다.

**Object3D 활용**

Object3D를 활용해 빈 공간으로 다른 오브젝트의 자식으로 추가해 줄 수 있음 (지역 공간)

```
const scene = new THREE.Scene();

const emptyScene = new THREE.Object3D();
scene.add(emptyScene);
objects.push(emptyScene);

const mesh = new THREE.Mesh(geometry,material);
emptyScene.add(mesh);
objects.push(mesh);

```

Object3D를 요소를 만들어 부모로 만드는 것은 Three.js 뿐만 아니라 다른 3D 엔진을 쓸 때도 중요함.

뭔가를 만들다 보면 종종 복잡한 수학이 필요한 것 처럼 느껴지지만, Scene Graph를 사용하지 않으면 달의 궤도를 계산하거나 자동차 바퀴의 위치를 계산하는 건 굉장히 복잡해지기 때문에.
Scene Graph를 적절히 활용하면 복잡한 동작을 더 쉽게 구현 가능함.

**AxesHelper로 local space의 x,y,z 축 표시**

```
objects.forEach((node)=>{
  const axes = new THREE.AxesHelper();
  axes.material.depthTest = false; // 어떤 물체 뒤에 있는 요소를 그릴지 말지 검사하는 과정 생략
  axes.renderOrder = 1; // 구체를 랜더링 한 후 축을 랜더링 하도록 함.
  node.add(axes);
});
```

## Material

기본적으로 Material(재질) 이란 물체가 Scene에 어떤 식으로 나타날지 결정하는 요소로 어떤 재질을 사용할지는 전적으로 상황에 따라 판단해야 됨

속성을 정하는 방법은 2가지로 나뉜다.

```
//1.
const material = new THREE.MeshPhongMaterial({
  color: 0xffaacc,
  flatShading: true
});

//2.
const material = new THREE.MeshPhongMaterial();

/*
색상 설정은 HSL 외에도, RGB, HEX 등 여러방법이 있음
material.color.set(0x00ff00);
material.color.set(cssString); rgb(244,100,22)
material.color.set(someColor); THREE.Color에 정의된 static 색상
material.color.setHSL(h,s,l)  hsl 색상, 0~1
material.color.setRGB(r,g,b)  rgb 색상, 0~1
*/
material.color.setHSL(0,1,.5);
material.flatShading = true; //물체를 각지게 표현할지의 여부를 판단
material.side = THREE.DoubleSide //어떤 면을 렌더링 할 지 여부를 판단
// THREE.FrontSide(앞면), THREE.BackSide(뒷변), THREE.DoubleSide(양면)
material.needsUpdate = true; //Three.js가 변경사항을 반영하도록 함.
//보통 사용할 일은 많지 않음
```

**Material 종류**

- MeshBasicMaterial: 광원에 영향을 받지 않음
- MeshLambertMaterial: 정점에서만 광원을 계산
- MeshPhongMaterial: 픽셀 하나하나 전부 광원을 계산, 반사점(물체가 조명을 받을때 물체에 나타나는 밝은 점)도 지원
  - shininess: MeshPhongMaterial 반사점의 밝기를 조절 가능 (기본값 30)
  - MeshLambertMaterial or MeshPhongMaterial의 emissive에 색상을 지정하고, color를 black으로 지정하면 MeshBasic과 마찬가지로 입체감이 사라짐
- MeshToonMaterial: 투톤을 띄어 카툰 느낌을 줌.

**MeshPhongMaterial와 MeshLambertMaterial 그리고 MeshBasicMaterial을 구분한 이유**

재질이 정교 할 수록 GPU의 부담이 커지기 때문에. GPU 성능이 낮은 기기에서는 덜 정교한 재질을 씀으로 GPU의 부담을 줄일수 있음.
복잡한 표현이 필요 없는 경우 간단한 재질, 광원 효과가 필요 없는 경우 MeshBasicMaterial을 사용하는 것이 좋음.

**PBR(Physically Based Rendering)**

물리 기반 랜더링 PBR은 실제 세계에서처럼 물체를 구현하기 위해 복잡한 수학을 사용함

- MeshStandardMaterial: MeshPhongMaterial와 가장 큰 차이점은 사용하는 속성이 다르다는 것임
  - MeshPhongMaterial은 shiness를 사용, MeshStandardMaterial은 roughness(0~1)와 metalness(얼마나 금속 재질에 가까운가 0~1) 속성을 사용함.
- MeshPhysicalMaterial: 기본적으로 MeshStandardMaterial와 같음
  - 0~1까지의 clearcoat 속성으로 표면 코팅 세기를 설정 가능
  - clearcoatRoughness 속성으로 코팅의 거침 정도를 설정 가능

성능 부담이 클수록 더 현실적인 결과물을 얻을 수 있지만, 저 사양 지원을 위해서는 코드 최적화에 그만큼 신경 써야됨.

**특수한 경우**

- ShadowMaterial: 그림자로 부터 데이터를 자겨오는데 사용
- MeshDepthMaterial: 각 픽셀의 깊이를 렌더링함
- MeshNormalMaterial: geomatery의 법선을 보여줌 (x축은 빨강, y축은 초록, z는 파랑)
- ShaderMaterial, RawShaderMaterial (재질을 커스텀 할 때 사용)
  - ShaderMaterial: Three.js의 쉐이더 시스템 사용
  - RawShaderMaterial: Three.js의 도움을 받지 않음

## Textures

일반적으로 포토샵 등의 프로그램으로 만든 이미지를 말하는 것임.

기본 활용 방법

```
const loader = new THREE.TextureLoader();
const material = new THREE.MeshBasicMaterial({
  map: loader.load('')
});
```

**각 면에 다른 텍스쳐 지정**

```

const loader = new THREE.TextureLoader();

// const texture = loader.load(''); 텍스처 불러오기, 비동기로 작동하며 이미지를 완전히 불러온 후 이미지로 텍스처를 업테이트 하기 전 까지 투명하게 보임

const materials = [
  new THREE.MeshBasicMaterial({map: loader.load('resources/images/flower-1.jpg')}),
  new THREE.MeshBasicMaterial({map: loader.load('resources/images/flower-2.jpg')}),
  new THREE.MeshBasicMaterial({map: loader.load('resources/images/flower-3.jpg')}),
  new THREE.MeshBasicMaterial({map: loader.load('resources/images/flower-4.jpg')}),
  new THREE.MeshBasicMaterial({map: loader.load('resources/images/flower-5.jpg')}),
  new THREE.MeshBasicMaterial({map: loader.load('resources/images/flower-6.jpg')}),
];
const cube = new THREE.Mesh(geometry, materials);
```

주의: 모든 geometry가 material을 배열로 받지는 않음

하나의 geometry에 여러 텍스쳐를 쓰고 싶을 경우 보통 텍스쳐 아틀라스(여러 이미지로 구성된 하나의 텍스터)를 사용함<br>
geometry의 정점에 따라 텍스처의 좌표를 조절해 geometry의 각 삼각형이 텍스처의 일정 부분을 표현하도록 할 수 있다.

**텍스처를 불러온 후 처리**

텍스처를 불러온 뒤 후처리를 위해 load는 두번째 인자로 콜백 함수를 받는다.

```
const loader = new THREE.TextureLoader();
loader.load('',(texture)=>{
  const material = new THREE.MeshBasicMaterial();
  material.map = texture;

  const cube = new THREE.Mesh(geometry,material);
  scene.add(cube);
  cubes.push(cube);
})
```

**다수 텍스처 불러온 후 처리하기**

다수의 텍스처를 한 번에 불러와야 하는 경우 LoadingManager룰 사용 할 수 있다.<br>
TextureLoader를 생성할 때 미리 생성한 LoadingManager의 인스턴스를 인자로 넘겨주고, LoadingManager 인스턴스의 onLoad 속성에 콜백 함수를 설정.<br>
onProgress 함수로 현재 불러온 URL, 현재 까지 불러온 자원 수, 총 자원 수를 매개 변수로 활용 함.

```
const loadManager = new THREE.LoadingManager();
const loader = new THREE.TextureLoader(loadManager);

const materials = [
  new THREE.MeshBasicMaterial({map: loader.load('resources/images/flower-1.jpg')}),
  new THREE.MeshBasicMaterial({map: loader.load('resources/images/flower-2.jpg')}),
  new THREE.MeshBasicMaterial({map: loader.load('resources/images/flower-3.jpg')}),
  new THREE.MeshBasicMaterial({map: loader.load('resources/images/flower-4.jpg')}),
  new THREE.MeshBasicMaterial({map: loader.load('resources/images/flower-5.jpg')}),
  new THREE.MeshBasicMaterial({map: loader.load('resources/images/flower-6.jpg')}),
];

loadManager.onLoad = () => {
  const cube = new THREE.Mesh(geometry, materials);
  scene.add(cube);
  cubes.push(cube);  // 회전 애니메이션을 위해 배열에 추가
};
```

**메모리 관리**

텍스처는 메모리를 가장 많이 사용하는 요소 중 하나로 대체로 약 `width * height * 4* 1.33` 바이트의 메모리를 사용함

압축이 중요하겠다고 생각되겠지만, 여기서는 그다지 중요한 요소가 아님. 예를 들어 해당 이미지의 실제 크기가 3024x3761 이라면, 공식을 적용할 경우<br>

- 3024 x 3761 x 4 x 1.33 = 60505764.5, 약 60 메가바이트의 메모리를 사용한다.
- 매우 극단적인 예로 볼수 있지만, 여기서 알려주는 것은 파일의 용량이 아니라 파일의 해상도를 줄여야 메모리의 사용량을 줄일 수 있다는 것
  - 필요한 만큼 퀄리티를 유지하는 선에서 가능한 낮게 만들어 주는게 좋음
