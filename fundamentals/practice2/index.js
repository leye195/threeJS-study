

const main = () => {

  const canvas = document.querySelector('#c');

  //create renderer, it takes all data and rendering to the canvas
  //WebGLRenderer is thate use WebGL to render 3d to the canvas
  const renderer = new THREE.WebGLRenderer({canvas});
  
  //create a camera through PerspectiveCamera
  const fov = 75; // field of view, 75deg in the vertical dimention (카메라 시야각)
  const aspect = 2; // 시야의 가로세로비 
  const near = 10; // 랜더링할 물체 거리의 하한 값, 너무 가까이 있는 물체를 그리는 것을 막기 위해 사용
  const far = 500; // 랜더링할 물체의 상한 값, 너무 멀리 있는 물체를 그리는 것을 막이 위해 사용
  const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
  camera.position.z = 30;

  //create a sceme
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xaaaaaa);

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color,intensity);
    light.position.set(-1,2,4);
    scene.add(light);
  }

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color,intensity);
    light.position.set(-1,-2,-3);
    scene.add(light);
  }

  //create a basic material and set color
  //const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
  
  //MeshPhongMaterial is affected by lights
  //const material = new THREE.MeshPhongMaterial({color: 0x44aa88}); 

  const objects = [];
  const spread = 10;
  const addObject = (x,y,obj) => {
    obj.position.x = x * spread;
    obj.position.y = y * spread;

    scene.add(obj);
    objects.push(obj);
  }

  const createMaterial = () => {
    const material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide, // draw both sides of the triangles that make up a shape
    });
    
    const hue = Math.random();
    const saturation = 1;
    const luminance = .5;
    material.color.setHSL(hue,saturation,luminance);
    return material;
  }

  const addSolidGeometry = (x,y,geometry) => {
    const mesh = new THREE.Mesh(geometry,createMaterial());
    addObject(x,y,mesh);
  }

  const addLineGeometry = (x,y,geometry) => {
    const material = new THREE.LineBasicMaterial({color: 0x000000});
    const mesh = new THREE.Mesh(geometry,material);
    addObject(x,y,mesh);
  }

  const addPointGeometry = (x,y,geometry) => {
    const material = new THREE.PointsMaterial({size: 3, sizeAttenuation: false});

    const hue = Math.random();
    const saturation = 1;
    const luminance = .5;
    material.color.setHSL(hue,saturation,luminance);

    const mesh = new THREE.Points(geometry,material);
    addObject(x,y,mesh);
  }

  {
    const width = 2;
    const height = 2;
    const depth = 2;
    addSolidGeometry(0,0,new THREE.BoxGeometry(width,height,depth));
  }
 
  {
    const radius = 3;
    const segments = 20;
    addSolidGeometry(1,0, new THREE.CircleGeometry(radius,segments));
  }

  {
    const radius = 2;
    const height = 4;
    const radialSegments = 54;
    addSolidGeometry(-1,0,new THREE.ConeGeometry(radius,height,radialSegments));
  }

  {
    const radiusTop = 1;
    const radiusBottom = 3;
    const height = 2;
    const radialSegments = 50;
    addSolidGeometry(-1,1,new THREE.CylinderGeometry(radiusTop,radiusBottom,height,radialSegments));
  }

  {
   const radius = 3.5;
   const detail = 0;
   addSolidGeometry(0,1,new THREE.DodecahedronGeometry(radius,detail));
  }

  { 
   const radius = 2;
   const widthSegments = 13;
   const heightSegments = 2;
   addSolidGeometry(1,1,new THREE.SphereGeometry(radius,widthSegments,heightSegments));
  }

  {
    const radius = 3;
    const tubeRadius = 1;
    const radialSegments = 30;
    const tubularSegments= 20;
    addSolidGeometry(0,-1,new THREE.TorusGeometry(radius,tubeRadius,radialSegments,tubularSegments));
  }
   
  {
    const radius = 3;
    const widthSegments = 20;
    const heightSegments = 8;
    addPointGeometry(1,-1,new THREE.SphereGeometry(radius,widthSegments,heightSegments));
  }

  const resizeRendererToDisplaySize = (renderer) => {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const isResize = width!==canvas.width || height !== canvas.height;
    if(isResize) {
      renderer.setSize(width,height,false);
    }
    return isResize;
  }
  const render = (time) => {
    time*=0.001;
    
    if(resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    
    objects.forEach((obj,idx)=>{
      const speed = 1 + idx * .1;
      const rot = time * speed;
      obj.rotation.x = rot;
      obj.rotation.y = rot;
    })
    
    // render the scene
    renderer.render(scene,camera);

    //requestAnimationFrame을 활용한 3D animate
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);

}

main();