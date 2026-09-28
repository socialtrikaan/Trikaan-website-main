"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Interactive particle-wave hero (raw three.js , no R3F dep needed).
// Continuous sine motion + cursor distortion + multiple expanding ripples that
// decay back to rest, plus a soft blue glow following the pointer. 60fps, reduced-motion → static.
export default function HeroWave() {
  const mountRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    const glow = glowRef.current;
    if (!mount) return;

    let w = mount.clientWidth;
    let h = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.set(0, 2.6, 8.5);
    camera.lookAt(0, 1.1, -5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    mount.appendChild(renderer.domElement);

    const COLS = 200;
    const ROWS = 120;
    const GAP = 0.3;
    const count = COLS * ROWS;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const base = new Float32Array(count * 2);

    const gray = new THREE.Color(0x9aa0ac);
    const blue = new THREE.Color(0x3b4bd8);
    let p = 0;
    for (let iz = 0; iz < ROWS; iz++) {
      for (let ix = 0; ix < COLS; ix++) {
        // jitter breaks the regular grid → kills moiré banding, gives organic scatter
        const x = (ix - COLS / 2) * GAP + (Math.random() - 0.5) * GAP * 0.9;
        const z = (iz - ROWS / 2) * GAP + (Math.random() - 0.5) * GAP * 0.9;
        positions[p * 3] = x;
        positions[p * 3 + 2] = z;
        base[p * 2] = x;
        base[p * 2 + 1] = z;
        const t = Math.min(1, (ix / COLS) * 0.7 + (iz / ROWS) * 0.3);
        const c = gray.clone().lerp(blue, t * 0.5);
        colors[p * 3] = c.r;
        colors[p * 3 + 1] = c.g;
        colors[p * 3 + 2] = c.b;
        p++;
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // round sprite so particles are circles, not squares
    const dotCanvas = document.createElement("canvas");
    dotCanvas.width = dotCanvas.height = 64;
    const dctx = dotCanvas.getContext("2d")!;
    dctx.beginPath();
    dctx.arc(32, 32, 30, 0, Math.PI * 2);
    dctx.fillStyle = "#ffffff";
    dctx.fill();
    const dotTex = new THREE.CanvasTexture(dotCanvas);

    const mat = new THREE.PointsMaterial({
      size: 0.07,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      map: dotTex,
      alphaTest: 0.5,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);
    const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;

    // pointer → world on y=0 plane
    const pointer = new THREE.Vector2();
    let active = false;
    const ray = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const mouseWorld = new THREE.Vector3(9999, 0, 9999);

    // expanding ripples (multiple, decay to rest)
    const ripples: { x: number; z: number; start: number }[] = [];
    const LIFE = 1.8;
    let lastSpawn = 0;

    let lastMoveT = -99999; // performance.now() when the pointer last moved
    let strength = 0; // hover effect intensity, eased in/out for a slow transition

    // listen on window so overlaying hero text/buttons don't block the ripple;
    // only react when the pointer is actually over the wave's rect
    const onMove = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      const inside =
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom;
      if (!inside) {
        active = false;
        mouseWorld.set(9999, 0, 9999);
        return;
      }
      pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
      active = true;
      lastMoveT = performance.now(); // mark movement , effect only lives while moving
      if (glow) {
        glow.style.left = `${e.clientX - r.left}px`;
        glow.style.top = `${e.clientY - r.top}px`;
      }
    };
    window.addEventListener("pointermove", onMove);

    let scrollPhase = 0;
    const onScroll = () => (scrollPhase = window.scrollY * 0.0012);
    window.addEventListener("scroll", onScroll, { passive: true });

    const wave = (t: number) => {
      // effect alive only while the pointer is moving; slow ease in/out
      const moving = performance.now() - lastMoveT < 120;
      strength += ((moving ? 1 : 0) - strength) * 0.05;
      if (glow) glow.style.opacity = String(strength);

      if (active) {
        ray.setFromCamera(pointer, camera);
        ray.ray.intersectPlane(plane, mouseWorld);
        if (moving && t - lastSpawn > 0.16 && mouseWorld.x < 9000) {
          ripples.push({ x: mouseWorld.x, z: mouseWorld.z, start: t });
          if (ripples.length > 6) ripples.shift();
          lastSpawn = t;
        }
      }
      // prune dead ripples
      for (let k = ripples.length - 1; k >= 0; k--)
        if (t - ripples[k].start > LIFE) ripples.splice(k, 1);

      const mx = mouseWorld.x;
      const mz = mouseWorld.z;
      for (let i = 0; i < count; i++) {
        const x = base[i * 2];
        const z = base[i * 2 + 1];
        let y =
          Math.sin(x * 0.4 + t * 1.6) * 1.0 +
          Math.cos(z * 0.32 + t * 1.3) * 1.0 +
          Math.sin((x + z) * 0.18 + t * 0.9) * 0.6;
        // cursor distortion (dots pushed up near pointer, spring back as pointer leaves)
        const cd2 = (x - mx) * (x - mx) + (z - mz) * (z - mz);
        if (cd2 < 40) y += Math.exp(-cd2 / 16) * 2.6 * strength;
        // expanding ring ripples
        for (let r = 0; r < ripples.length; r++) {
          const rp = ripples[r];
          const age = t - rp.start;
          const dist = Math.hypot(x - rp.x, z - rp.z);
          const front = age * 4.2;
          const dd = dist - front;
          if (dd > -2 && dd < 2) {
            y += Math.exp(-(dd * dd) / 0.6) * 2.4 * (1 - age / LIFE);
          }
        }
        posAttr.setY(i, y);
      }
      posAttr.needsUpdate = true;
    };

    let raf = 0;
    const clock = new THREE.Clock();
    const render = () => {
      const t = clock.getElapsedTime() * 0.9 + scrollPhase;
      wave(t);
      points.rotation.y = Math.sin(t * 0.04) * 0.05;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    render(); // always animate , hero wave is explicitly wanted regardless of prefers-reduced-motion

    const onResize = () => {
      w = mount.clientWidth;
      h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      dotTex.dispose();
      if (renderer.domElement.parentNode === mount)
        mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="pointer-events-auto absolute inset-0 h-full w-full"
    >
      {/* soft blue glow following the cursor */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-300"
        style={{
          width: 220,
          height: 220,
          background:
            "radial-gradient(circle, rgba(59,107,255,0.28) 0%, rgba(59,107,255,0) 70%)",
        }}
      />
    </div>
  );
}
