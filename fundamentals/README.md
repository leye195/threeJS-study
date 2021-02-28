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
