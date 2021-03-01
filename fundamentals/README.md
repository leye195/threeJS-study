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

**AxesHelper로 local space의 x,y,z 축 표시**

```
objects.forEach((node)=>{
  const axes = new THREE.AxesHelper();
  axes.material.depthTest = false; // 어떤 물체 뒤에 있는 요소를 그릴지 말지 검사하는 과정 생략
  axes.renderOrder = 1; // 구체를 랜더링 한 후 축을 랜더링 하도록 함.
  node.add(axes);
});
```
