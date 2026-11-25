import '@fontsource/poppins/latin-300.css'
import '@fontsource/poppins/latin-400.css'
import '@fontsource/poppins/latin-500.css'
import '@fontsource/poppins/latin-700.css'
import '@fontsource/poppins/latin-800.css'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import './style.css'

const wallpaperUrl = `${import.meta.env.BASE_URL}anime-wallpaper.png`

const showFallback = (message) => {
  const hero = document.querySelector('#hero')
  const loader = document.querySelector('#loader')
  if (hero instanceof HTMLElement) {
    hero.classList.add('webgl-fallback')
    hero.style.backgroundImage = `linear-gradient(90deg, rgb(3 12 17 / 92%), rgb(4 15 21 / 42%)), linear-gradient(180deg, transparent 45%, rgb(3 12 18 / 88%)), url(${wallpaperUrl})`
  }
  if (loader instanceof HTMLElement) loader.textContent = message
}

function init() {

      const canvas = document.querySelector('#scene');
      const hero = document.querySelector('#hero');
      const loaderEl = document.querySelector('#loader');
      const prevButton = document.querySelector('#prev');
      const nextButton = document.querySelector('#next');
      const dots = [...document.querySelectorAll('.dot')];
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
      renderer.setClearColor(0x000000, 1);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.NoToneMapping;
    canvas.addEventListener('webglcontextlost', (event) => {
      event.preventDefault()
      showFallback('Graphics context lost — showing a still frame')
    })
    canvas.addEventListener('webglcontextrestored', () => window.location.reload(), { once: true })

      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
      camera.position.set(0, 0, 10);
      camera.lookAt(0, 0, 0);

      const scene = new THREE.Scene();
      const pivot = new THREE.Group();
      const spinner = new THREE.Group();
      pivot.add(spinner);
      scene.add(pivot);
      spinner.rotation.set(-0.42, 0.62, 0.18);

      const bgScene = new THREE.Scene();
      const bgCamera = new THREE.Camera();
      const headlineCanvas = document.createElement('canvas');
      headlineCanvas.width = 2;
      headlineCanvas.height = 2;
      const headlineTexture = new THREE.CanvasTexture(headlineCanvas);
      headlineTexture.colorSpace = THREE.SRGBColorSpace;
      headlineTexture.minFilter = THREE.LinearFilter;
      headlineTexture.magFilter = THREE.LinearFilter;
      headlineTexture.generateMipmaps = false;

      const bgMaterial = new THREE.ShaderMaterial({
        uniforms: { uTex: { value: headlineTexture } },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position.xy, 0.0, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D uTex;
          varying vec2 vUv;
          void main() {
            gl_FragColor = texture2D(uTex, vUv);
            #include <colorspace_fragment>
          }
        `,
        depthTest: false,
        depthWrite: false
      });
      const bgQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bgMaterial);
      bgQuad.frustumCulled = false;
      bgScene.add(bgQuad);

      const vertexShader = `
        varying vec3 vNormal;
        varying vec3 vEye;

        void main() {
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vec4 mvPos = viewMatrix * worldPos;
          gl_Position = projectionMatrix * mvPos;
          vNormal = normalize(normalMatrix * normal);
          vEye = normalize(mvPos.xyz);
        }
      `;

      const fragmentShader = `
        uniform sampler2D uTexture;
        uniform vec2 uResolution;
        uniform float uIorR;
        uniform float uIorY;
        uniform float uIorG;
        uniform float uIorC;
        uniform float uIorB;
        uniform float uIorP;
        uniform float uRefractPower;
        uniform float uChromatic;
        uniform float uSaturation;
        uniform float uShininess;
        uniform float uDiffuseness;
        uniform float uFresnelPower;
        uniform vec3 uLight;
        uniform float uBackside;

        varying vec3 vNormal;
        varying vec3 vEye;

        float specularLight(vec3 normal, vec3 eye, vec3 light, float shininess, float diffuseness) {
          vec3 lightVec = normalize(-light);
          vec3 viewVec = -eye;
          vec3 halfVec = normalize(lightVec + viewVec);
          return pow(max(dot(normal, halfVec), 0.0), shininess)
            + max(0.0, dot(normal, lightVec)) * diffuseness;
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / uResolution;
          vec3 n = normalize(vNormal);
          if (uBackside > 0.5) n = -n;
          vec3 eye = normalize(vEye);
          vec3 color = vec3(0.0);
          const int LOOP = 16;

          for (int i = 0; i < LOOP; i++) {
            float slide = float(i) / float(LOOP) * 0.045;
            vec2 refrR = refract(eye, n, 1.0 / uIorR).xy;
            vec2 refrY = refract(eye, n, 1.0 / uIorY).xy;
            vec2 refrG = refract(eye, n, 1.0 / uIorG).xy;
            vec2 refrC = refract(eye, n, 1.0 / uIorC).xy;
            vec2 refrB = refract(eye, n, 1.0 / uIorB).xy;
            vec2 refrP = refract(eye, n, 1.0 / uIorP).xy;

            vec3 texR = texture2D(uTexture, uv + refrR * (uRefractPower + slide) * uChromatic).rgb;
            vec3 texY = texture2D(uTexture, uv + refrY * (uRefractPower + slide) * uChromatic).rgb;
            vec3 texG = texture2D(uTexture, uv + refrG * (uRefractPower + slide * 2.0) * uChromatic).rgb;
            vec3 texC = texture2D(uTexture, uv + refrC * (uRefractPower + slide * 2.5) * uChromatic).rgb;
            vec3 texB = texture2D(uTexture, uv + refrB * (uRefractPower + slide * 3.0) * uChromatic).rgb;
            vec3 texP = texture2D(uTexture, uv + refrP * (uRefractPower + slide) * uChromatic).rgb;

            float r = texR.r * 0.5;
            float y = (texY.r * 2.0 + texY.g * 2.0 - texY.b) / 6.0;
            float g = texG.g * 0.5;
            float c = (texC.g * 2.0 + texC.b * 2.0 - texC.r) / 6.0;
            float b = texB.b * 0.5;
            float p = (texP.b * 2.0 + texP.r * 2.0 - texP.g) / 6.0;

            float outR = r + (2.0 * p + 2.0 * y - c) / 3.0;
            float outG = g + (2.0 * y + 2.0 * c - p) / 3.0;
            float outB = b + (2.0 * c + 2.0 * p - y) / 3.0;
            color += vec3(outR, outG, outB);
          }

          color /= float(LOOP);
          float luma = dot(color, vec3(0.2125, 0.7154, 0.0721));
          color = mix(vec3(luma), color, uSaturation);

          float spec = specularLight(n, eye, uLight, uShininess, uDiffuseness)
            + 0.6 * specularLight(n, eye, vec3(1.0, 1.0, -1.0), uShininess * 0.6, uDiffuseness * 0.5);
          color += vec3(spec * (uBackside > 0.5 ? 0.35 : 1.0));

          float fresnel = pow(1.0 + dot(eye, n), uFresnelPower);
          color = mix(color, vec3(1.0), fresnel * (uBackside > 0.5 ? 0.25 : 0.55));
          color += vec3(0.004, 0.005, 0.007);
          gl_FragColor = vec4(color, 1.0);
          #include <colorspace_fragment>
        }
      `;

      const resolution = new THREE.Vector2(1, 1);
      const displayResolution = new THREE.Vector2(1, 1);
      const targetResolution = new THREE.Vector2(1, 1);
      const maxRenderTargetSize = 2048;

      function makeGlassMaterial(backside) {
        return new THREE.ShaderMaterial({
          uniforms: {
            uTexture: { value: null },
            uResolution: { value: resolution },
            uIorR: { value: 1.15 },
            uIorY: { value: 1.16 },
            uIorG: { value: 1.18 },
            uIorC: { value: 1.22 },
            uIorB: { value: 1.22 },
            uIorP: { value: 1.22 },
            uRefractPower: { value: backside ? 0.22 : 0.30 },
            uChromatic: { value: 0.5 },
            uSaturation: { value: 1.08 },
            uShininess: { value: 90.0 },
            uDiffuseness: { value: 0.02 },
            uFresnelPower: { value: 5.0 },
            uLight: { value: new THREE.Vector3(-1, 1, 1) },
            uBackside: { value: backside ? 1.0 : 0.0 }
          },
          vertexShader,
          fragmentShader,
          side: backside ? THREE.BackSide : THREE.FrontSide,
          depthTest: true,
          depthWrite: true
        });
      }

      const backMaterial = makeGlassMaterial(true);
      const frontMaterial = makeGlassMaterial(false);
      const rtOptions = {
        type: THREE.HalfFloatType,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        depthBuffer: true,
        stencilBuffer: false
      };
      const rtBack = new THREE.WebGLRenderTarget(1, 1, rtOptions);
      const rtFront = new THREE.WebGLRenderTarget(1, 1, rtOptions);
      backMaterial.uniforms.uTexture.value = rtBack.texture;
      frontMaterial.uniforms.uTexture.value = rtFront.texture;

      let cubeMesh = null;
      let viewWidth = 1;
      let viewHeight = 1;
      let pixelRatio = 1;
      let isMobile = false;
      const wallpaperImage = new Image();
      wallpaperImage.decoding = 'async';
      wallpaperImage.src = wallpaperUrl;

      function drawCoverImage(context, image, width, height) {
        const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
        const sourceWidth = width / scale;
        const sourceHeight = height / scale;
        const mobileFocus = isMobile ? 0.56 : 0.5;
        const sourceX = Math.max(0, (image.naturalWidth - sourceWidth) * mobileFocus);
        const sourceY = Math.max(0, (image.naturalHeight - sourceHeight) * 0.5);
        context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, width, height);
      }

      function redrawHeadline() {
        const width = viewWidth;
        const height = viewHeight;
        const dpr = pixelRatio;
        headlineCanvas.width = Math.max(1, Math.round(width * dpr));
        headlineCanvas.height = Math.max(1, Math.round(height * dpr));
        const context = headlineCanvas.getContext('2d');
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
        context.fillStyle = '#061118';
        context.fillRect(0, 0, width, height);

        if (wallpaperImage.complete && wallpaperImage.naturalWidth > 0) {
          context.save();
          context.globalAlpha = 0.78;
          drawCoverImage(context, wallpaperImage, width, height);
          context.restore();
        }

        const horizontalShade = context.createLinearGradient(0, 0, width, 0);
        horizontalShade.addColorStop(0, 'rgba(3, 12, 17, 0.94)');
        horizontalShade.addColorStop(0.38, 'rgba(4, 15, 21, 0.70)');
        horizontalShade.addColorStop(0.72, 'rgba(4, 15, 21, 0.34)');
        horizontalShade.addColorStop(1, 'rgba(3, 11, 17, 0.60)');
        context.fillStyle = horizontalShade;
        context.fillRect(0, 0, width, height);

        const verticalShade = context.createLinearGradient(0, 0, 0, height);
        verticalShade.addColorStop(0, 'rgba(2, 8, 13, 0.36)');
        verticalShade.addColorStop(0.54, 'rgba(3, 12, 18, 0.08)');
        verticalShade.addColorStop(1, 'rgba(3, 12, 18, 0.86)');
        context.fillStyle = verticalShade;
        context.fillRect(0, 0, width, height);

        let fontSize = Math.min(height * 0.21, width * (isMobile ? 0.21 : 0.118));
        context.font = `800 ${fontSize}px Poppins, sans-serif`;
        const lines = ['Explore', 'New', 'Ideas'];
        const widest = Math.max(...lines.map((line) => context.measureText(line).width));
        const maxWidth = width * (isMobile ? 0.9 : 0.5);
        if (widest > maxWidth) fontSize *= maxWidth / widest;

        context.font = `800 ${fontSize}px Poppins, sans-serif`;
        context.fillStyle = '#effffb';
        context.shadowColor = 'rgba(0, 0, 0, 0.38)';
        context.shadowBlur = 18;
        context.textAlign = 'center';
        context.textBaseline = 'alphabetic';
        const centerX = width * (isMobile ? 0.5 : 0.505);
        const centerY = height * (isMobile ? 0.45 : 0.468);
        const gap = fontSize * 1.07;
        const capHeight = fontSize * 0.7;
        lines.forEach((line, index) => {
          const baseline = centerY + capHeight / 2 + (index - 1) * gap;
          context.fillText(line, centerX, baseline);
        });
        headlineTexture.needsUpdate = true;
      }

      wallpaperImage.addEventListener('load', () => {
        redrawHeadline();
      }, { once: true });

      function layout() {
        const rect = hero.getBoundingClientRect();
        viewWidth = Math.max(1, Math.round(rect.width));
        viewHeight = Math.max(1, Math.round(rect.height));
        isMobile = viewWidth < 768 || viewWidth / viewHeight < 1;
        pixelRatio = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5);

        renderer.setPixelRatio(pixelRatio);
        renderer.setSize(viewWidth, viewHeight, false);
        camera.aspect = viewWidth / viewHeight;
        camera.updateProjectionMatrix();

        renderer.getDrawingBufferSize(displayResolution);
        const targetScale = Math.min(1, maxRenderTargetSize / Math.max(displayResolution.x, displayResolution.y));
        targetResolution.set(
          Math.max(1, Math.round(displayResolution.x * targetScale)),
          Math.max(1, Math.round(displayResolution.y * targetScale)),
        );
        rtBack.setSize(targetResolution.x, targetResolution.y);
        rtFront.setSize(targetResolution.x, targetResolution.y);

        const visibleHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5)) * 10;
        const visibleWidth = visibleHeight * camera.aspect;
        const sx = isMobile ? 0.5 : 0.517;
        const sy = isMobile ? 0.45 : 0.488;
        pivot.position.set((sx - 0.5) * visibleWidth, (0.5 - sy) * visibleHeight, 0);
        const edgePixels = Math.min(viewHeight * 0.44, viewWidth * (isMobile ? 0.45 : 0.29));
        const scale = edgePixels / viewHeight * visibleHeight;
        pivot.scale.setScalar(scale);
        redrawHeadline();
      }

      function installGeometry(geometry) {
        if (cubeMesh) {
          spinner.remove(cubeMesh)
          cubeMesh.geometry.dispose()
        }
        cubeMesh = new THREE.Mesh(geometry, frontMaterial)
        cubeMesh.frustumCulled = false
        spinner.add(cubeMesh)
        loaderEl.textContent = 'Scene ready'
        loaderEl.classList.add('done')
        layout()
      }

      installGeometry(new RoundedBoxGeometry(1, 1, 1, 8, 0.12));

      const axisX = new THREE.Vector3(1, 0, 0);
      const axisY = new THREE.Vector3(0, 1, 0);
      const rotationX = new THREE.Quaternion();
      const rotationY = new THREE.Quaternion();

      function applyWorldRotation(deltaX, deltaY) {
        if (deltaX) {
          rotationY.setFromAxisAngle(axisY, deltaX);
          spinner.quaternion.premultiply(rotationY);
        }
        if (deltaY) {
          rotationX.setFromAxisAngle(axisX, deltaY);
          spinner.quaternion.premultiply(rotationX);
        }
      }

      let dragging = false;
      let activePointer = null;
      let lastPointerX = 0;
      let lastPointerY = 0;
      let lastPointerTime = 0;
      let velocityX = 0;
      let velocityY = 0;
      let spinRemaining = 0;
      let lastInteraction = performance.now();

      canvas.addEventListener('pointerdown', (event) => {
        if (activePointer !== null) return;
        activePointer = event.pointerId;
        dragging = true;
        velocityX = 0;
        velocityY = 0;
        spinRemaining = 0;
        lastPointerX = event.clientX;
        lastPointerY = event.clientY;
        lastPointerTime = event.timeStamp;
        lastInteraction = performance.now();
        canvas.setPointerCapture(event.pointerId);
        canvas.classList.add('dragging');
      });

      canvas.addEventListener('pointermove', (event) => {
        if (!dragging || event.pointerId !== activePointer) return;
        const elapsed = Math.max(1, event.timeStamp - lastPointerTime);
        const dx = (event.clientX - lastPointerX) * 0.008;
        const dy = (event.clientY - lastPointerY) * 0.008;
        applyWorldRotation(dx, dy);
        const frameRatio = 16.67 / elapsed;
        velocityX = dx * frameRatio;
        velocityY = dy * frameRatio;
        lastPointerX = event.clientX;
        lastPointerY = event.clientY;
        lastPointerTime = event.timeStamp;
        lastInteraction = performance.now();
      });

      function finishDrag(event) {
        if (event.pointerId !== activePointer) return;
        dragging = false;
        activePointer = null;
        lastInteraction = performance.now();
        canvas.classList.remove('dragging');
        if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
      }

      canvas.addEventListener('pointerup', finishDrag);
      canvas.addEventListener('pointercancel', finishDrag);
      canvas.addEventListener('lostpointercapture', (event) => {
        if (event.pointerId !== activePointer) return;
        dragging = false;
        activePointer = null;
        lastInteraction = performance.now();
        canvas.classList.remove('dragging');
      });

      function queueQuarterTurn(direction) {
        velocityX = 0;
        velocityY = 0;
        spinRemaining += direction * Math.PI / 2;
        lastInteraction = performance.now();
      }

      prevButton.addEventListener('click', () => queueQuarterTurn(-1));
      nextButton.addEventListener('click', () => queueQuarterTurn(1));

      dots.forEach((dot) => {
        dot.addEventListener('click', () => {
          dots.forEach((item) => {
            const active = item === dot;
            item.classList.toggle('active', active);
            if (active) item.setAttribute('aria-current', 'true');
            else item.removeAttribute('aria-current');
          });
        });
      });

      let resizeFrame = 0;
      function requestLayout() {
        if (resizeFrame) return;
        resizeFrame = requestAnimationFrame(() => {
          resizeFrame = 0;
          layout();
        });
      }

      window.addEventListener('resize', requestLayout, { passive: true });
      window.visualViewport?.addEventListener('resize', requestLayout, { passive: true });
      new ResizeObserver(requestLayout).observe(hero);
      document.fonts?.addEventListener('loadingdone', requestLayout);

      function renderFrame() {
        if (!cubeMesh) {
          renderer.setRenderTarget(null);
          renderer.autoClear = true;
          renderer.render(bgScene, bgCamera);
          return;
        }

        renderer.autoClear = true;
        resolution.copy(targetResolution);
        renderer.setRenderTarget(rtBack);
        renderer.render(bgScene, bgCamera);

        renderer.setRenderTarget(rtFront);
        renderer.render(bgScene, bgCamera);
        renderer.autoClear = false;
        cubeMesh.material = backMaterial;
        renderer.render(scene, camera);

        renderer.setRenderTarget(null);
        resolution.copy(displayResolution);
        renderer.autoClear = true;
        renderer.render(bgScene, bgCamera);
        renderer.autoClear = false;
        renderer.clearDepth();
        cubeMesh.material = frontMaterial;
        renderer.render(scene, camera);

        renderer.autoClear = true;
      }

      let previousTime = performance.now();
      function animate(now) {
        const dt = Math.min(0.05, Math.max(0, (now - previousTime) / 1000));
        previousTime = now;
        const frameScale = dt * 60;

        if (!dragging) {
          if (Math.abs(spinRemaining) >= 0.0005) {
            const step = spinRemaining * Math.min(1, 0.09 * frameScale);
            applyWorldRotation(step, 0);
            spinRemaining -= step;
          } else if (spinRemaining !== 0) {
            applyWorldRotation(spinRemaining, 0);
            spinRemaining = 0;
          } else if (Math.abs(velocityX) > 0.00001 || Math.abs(velocityY) > 0.00001) {
            if (reducedMotion.matches) {
              velocityX = 0;
              velocityY = 0;
            } else {
              applyWorldRotation(velocityX * frameScale, velocityY * frameScale);
              const damping = Math.pow(0.94, frameScale);
              velocityX *= damping;
              velocityY *= damping;
            }
          }

          if (!reducedMotion.matches && spinRemaining === 0) {
            const idleBlend = THREE.MathUtils.clamp((now - lastInteraction - 600) / 1000, 0, 1);
            if (idleBlend > 0) applyWorldRotation(0.0035 * frameScale * idleBlend, 0.0012 * frameScale * idleBlend);
          }
        }

        renderFrame();
        animationFrame = requestAnimationFrame(animate);
      }

      let animationFrame = 0;
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          cancelAnimationFrame(animationFrame);
          animationFrame = 0;
          return;
        }
        previousTime = performance.now();
        if (!animationFrame) animationFrame = requestAnimationFrame(animate);
      });

      Promise.race([
        Promise.all([
          document.fonts?.load('800 100px Poppins') ?? Promise.resolve(),
          document.fonts?.ready ?? Promise.resolve()
        ]),
        new Promise((resolve) => setTimeout(resolve, 2500))
      ]).finally(() => {
        layout();
        previousTime = performance.now();
        animationFrame = requestAnimationFrame(animate);
      });
}

try {
  init()
} catch (error) {
  console.warn('WebGL scene unavailable; showing a static preview.', error)
  showFallback('Interactive preview unavailable — showing a still frame')
}
