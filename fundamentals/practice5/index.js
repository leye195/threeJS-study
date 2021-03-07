const main = () => {

  const canvas = document.querySelector('#c');
  const progressBar = document.querySelector('.progress__bar');
  //create renderer, it takes all data and rendering to the canvas
  //WebGLRenderer is thate use WebGL to render 3d to the canvas
  const renderer = new THREE.WebGLRenderer({canvas});

  const makeCamera = (fov = 40) => {
    const aspect = 2;
    const near = 0.1;
    const far = 100;

    return new THREE.PerspectiveCamera(fov,aspect,near,far);
  }

  const camera = makeCamera(75);
  camera.position.z = 5;

  const scene = new THREE.Scene();
  
  const createBoxGeometery = (width = 1,height = 1 ,depth = 1) => {
    const geomatry = new THREE.BoxGeometry(width,height,depth);
    return geomatry;
  }

  const createBasicMaterial = () => {
    const material = new THREE.MeshBasicMaterial();
    return material;
  }

  const cubes = [];
  
  const loadManager = new THREE.LoadingManager();
  const loader = new THREE.TextureLoader(loadManager);

  const geometry = createBoxGeometery(1,1,1);

  const materials = [
    new THREE.MeshBasicMaterial({map:loader.load('https://images.unsplash.com/photo-1612053844276-47fe80824473?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=667&q=80 667w')}),
    new THREE.MeshBasicMaterial({map:loader.load('https://images.unsplash.com/photo-1600818112029-cb5814bd3ffe?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80 750w')}),
    new THREE.MeshBasicMaterial({map:loader.load('https://images.unsplash.com/photo-1604731104033-c2cda0e1eb56?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=899&q=80 899w')}),
    new THREE.MeshBasicMaterial({map:loader.load('https://images.unsplash.com/photo-1610447847416-40bac442fbe6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=564&q=80 564w')}),
    new THREE.MeshBasicMaterial({map:loader.load('https://images.unsplash.com/photo-1548097341-3d7b4821f984?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=593&q=80 593w')}),
    new THREE.MeshBasicMaterial({map:loader.load('https://images.unsplash.com/photo-1517461982853-d9e4fa425852?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80 750w')}),
  ];
  //material.map = loader.load('https://images.unsplash.com/photo-1609802437979-f50b135cec7b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=796&q=80 796w');
  //BoxGeometry, ConeGeometry, CylinderGeometry에 material을 배열로 전달 가능

  //const cube = new THREE.Mesh(geometry,materials);

  //scene.add(cube);
  //cubes.push(cube);
  loadManager.onLoad = () => {
    const cube = new THREE.Mesh(geometry,materials);
    scene.add(cube);
    cubes.push(cube);
  }

  loadManager.onProgress = (urlOfLastItemLoaded, itemsLoaded, itemsTotal) => {
    const percent = (itemsLoaded / itemsTotal)*100;
    progressBar.style.width = `${percent}%`;
    
    if(percent===100){
      setTimeout(()=>{
        progressBar.style.visibility = 'hidden';
      },100);
    }
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

    cubes.forEach((cube,idx)=>{
      const speed = .2+idx*.1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    })

    // render the scene
    renderer.render(scene,camera);

    //requestAnimationFrame을 활용한 3D animate
    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
}

main();
