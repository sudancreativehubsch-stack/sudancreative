"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import * as THREE from "three";

export interface ProjectLink {
  title: string;
  link: string;
  image?: string;
}

export interface TwistBandProps {
  projects?: ProjectLink[];
  pillColor?: string;
  pillTextColor?: string;
  background?: string;
  cardCount?: number;
  radius?: number;
  tilt?: number;
  twist?: number;
  autoSpeed?: number;
  hint?: string;
  hintBottom?: number;
  labelColor?: string;
  borderWidth?: number;
  borderColor?: string;
  pattern?: boolean;
  patternOpacity?: number;
  brand?: string;
  brandAccent?: string;
  accentColor?: string;
  style?: CSSProperties;
}

const TEX_W = 640;
const TEX_H = 760;

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function makeCanvas() {
  const c = document.createElement("canvas");
  c.width = TEX_W;
  c.height = TEX_H;
  return c;
}

let cardBorder = { w: 0, color: "#FFFFFF" };

function drawPhoto(img: HTMLImageElement | null, fallback: string) {
  const c = makeCanvas();
  const ctx = c.getContext("2d")!;
  roundRect(ctx, 0, 0, TEX_W, TEX_H, 56);
  ctx.save();
  ctx.clip();
  ctx.fillStyle = fallback;
  ctx.fillRect(0, 0, TEX_W, TEX_H);
  if (img && img.naturalWidth) {
    const s = Math.max(TEX_W / img.naturalWidth, TEX_H / img.naturalHeight);
    const w = img.naturalWidth * s;
    const h = img.naturalHeight * s;
    try {
      ctx.drawImage(img, (TEX_W - w) / 2, (TEX_H - h) / 2, w, h);
    } catch (e) {}
  }
  ctx.restore();
  if (cardBorder.w > 0) {
    const b = cardBorder.w;
    roundRect(ctx, b / 2, b / 2, TEX_W - b, TEX_H - b, Math.max(0, 56 - b / 2));
    ctx.lineWidth = b;
    ctx.strokeStyle = cardBorder.color;
    ctx.stroke();
  }
  return c;
}

const imageCache = new Map<string, HTMLImageElement>();
let savedRot: number | null = null;

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    if (!src) return resolve(null);
    const cached = imageCache.get(src);
    if (cached) return resolve(cached);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

const DEFAULT_PROJECTS: ProjectLink[] = [
  { title: "Commercial Brand Video", link: "/portfolio/video", image: "/about-studio.jpg" },
  { title: "High-Retention 9:16 Reel", link: "/portfolio", image: "/models/model-1.jpg" },
  { title: "Runway & Editorial Fashion", link: "/models", image: "/models/model-3.jpg" },
  { title: "Automotive Motion Campaign", link: "/portfolio/video", image: "/models/model-4.jpg" },
  { title: "Bespoke Brand Identity", link: "/services", image: "/models/model-6.jpg" },
  { title: "Regional Growth Launch", link: "/contact", image: "/models/model-7.jpg" },
  { title: "High-Fashion Casting", link: "/models", image: "/models/model-8.jpg" },
  { title: "Digital Campaign Direction", link: "/portfolio", image: "/models/model-10.jpg" },
];

export function TwistBand(props: TwistBandProps) {
  const {
    projects = DEFAULT_PROJECTS,
    pillColor = "#fbc701",
    pillTextColor = "#050b4d",
    background = "transparent",
    cardCount = 10,
    radius = 4.2,
    tilt = 20,
    twist = 34,
    autoSpeed = 6,
    hint = "Drag to spin",
    hintBottom = 40,
    labelColor = "rgba(255, 255, 255, 0.7)",
    borderWidth = 1,
    borderColor = "rgba(255, 255, 255, 0.25)",
    pattern = false,
    patternOpacity = 0.12,
  } = props;

  const mountRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const imageList = projects.map((p) => p.image || "");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false;
    let raf = 0;

    cardBorder = { w: Math.max(0, borderWidth) * (TEX_W / 280), color: borderColor };

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.2, 17);

    const ring = new THREE.Group();
    scene.add(ring);

    const N = Math.max(6, Math.round(cardCount));
    const covers = Array.from({ length: N }, (_, i) => (imageList.length ? imageList[i % imageList.length] : "") || "");
    const SEG = 24;
    const step = (Math.PI * 2) / N;
    const span = step * 0.965;
    const cardH = ((2 * Math.PI * radius) / N) * 0.9;

    const textures: THREE.Texture[] = [];
    const materials: THREE.Material[] = [];
    const cards: { mesh: THREE.Mesh; base: number; uv0: Float32Array }[] = [];
    const geoms: THREE.BufferGeometry[] = [];

    const makeTex = (canvas: HTMLCanvasElement) => {
      const t = new THREE.CanvasTexture(canvas);
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
      textures.push(t);
      return t;
    };

    for (let i = 0; i < N; i++) {
      const g = new THREE.PlaneGeometry(1, 1, SEG, 1);
      geoms.push(g);
      const src = covers[i];
      const cached = src ? imageCache.get(src) : undefined;
      const coverTex = makeTex(drawPhoto(cached ?? null, "#09126b"));
      if (src && !cached) {
        loadImage(src).then((img) => {
          if (disposed || !img) return;
          (coverTex as THREE.CanvasTexture).image = drawPhoto(img, "#09126b");
          coverTex.needsUpdate = true;
        });
      }
      const m = new THREE.MeshBasicMaterial({ map: coverTex, side: THREE.FrontSide, transparent: true, alphaTest: 0.5 });
      materials.push(m);
      const mesh = new THREE.Mesh(g, m);
      mesh.userData.card = i;
      ring.add(mesh);

      const gb = new THREE.BufferGeometry();
      gb.setAttribute("position", g.attributes.position);
      const uv = (g.attributes.uv as THREE.BufferAttribute).clone();
      for (let j = 0; j < uv.count; j++) uv.setX(j, 1 - uv.getX(j));
      gb.setAttribute("uv", uv);
      gb.setIndex(g.index);
      geoms.push(gb);
      const mb = new THREE.MeshBasicMaterial({ map: coverTex, side: THREE.BackSide, transparent: true, alphaTest: 0.5 });
      materials.push(mb);
      const back = new THREE.Mesh(gb, mb);
      back.userData.card = i;
      back.frustumCulled = false;
      mesh.frustumCulled = false;
      ring.add(back);

      const p0 = g.attributes.position as THREE.BufferAttribute;
      const uv0 = new Float32Array(p0.count * 2);
      for (let j = 0; j < p0.count; j++) {
        uv0[j * 2] = p0.getX(j) + 0.5;
        uv0[j * 2 + 1] = p0.getY(j);
      }
      cards.push({ mesh, base: i * step, uv0 });
    }

    const tw = (twist * Math.PI) / 180;
    const layout = (rot: number) => {
      for (const { mesh, base, uv0 } of cards) {
        const pos = (mesh.geometry as THREE.BufferGeometry).attributes.position as THREE.BufferAttribute;
        for (let j = 0; j < pos.count; j++) {
          const u = uv0[j * 2];
          const v = uv0[j * 2 + 1];
          const phi = base + rot + (u - 0.5) * span;
          const sx = Math.sin(phi);
          const cz = Math.cos(phi);
          const alpha = tw * sx * sx;
          const wave = radius * 0.09 * Math.sin(2 * phi + 0.6);
          const h = v * cardH;
          pos.setXYZ(j, radius * sx + h * Math.sin(alpha) * sx, wave + h * Math.cos(alpha), radius * cz + h * Math.sin(alpha) * cz);
        }
        pos.needsUpdate = true;
        mesh.geometry.computeBoundingSphere();
      }
    };

    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const dist = radius * 3;
      const halfW = radius / 0.6;
      const halfH = Math.max(halfW / camera.aspect, radius * 1.05);
      camera.fov = (2 * Math.atan(halfH / dist) * 180) / Math.PI;
      camera.position.set(0, 0, dist);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const baseTilt = (tilt * Math.PI) / 180;
    let rot = savedRot ?? 0;
    let vel = -(autoSpeed / 100) * 0.06;
    let idle = -(autoSpeed / 100) * 0.06;
    let dragDx = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let tiltOffset = 0;
    let tiltVel = 0;
    let hoverIdx = -1;
    let pointerIn = false;
    let px = 0;
    let py = 0;
    let downX = 0;
    let downY = 0;
    let moved = 0;
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();

    const projectFor = (i: number) => {
      const list = projects.filter((p) => p && p.title);
      return list.length ? list[i % list.length] : null;
    };

    const pickCard = () => {
      const r = renderer.domElement.getBoundingClientRect();
      if (!r.width || !r.height) return -1;
      ndc.set(((px - r.left) / r.width) * 2 - 1, -((py - r.top) / r.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      const hit = raycaster.intersectObjects(ring.children, false)[0];
      if (!hit) return -1;
      const i = hit.object.userData.card as number;
      const front = cards
        .map((c, k) => ({ k, z: Math.cos(c.base + rot) }))
        .sort((p, q) => q.z - p.z)
        .slice(0, 3)
        .map((p) => p.k);
      return front.includes(i) ? i : -1;
    };

    const showPill = (i: number) => {
      const pill = pillRef.current;
      if (!pill) return;
      const p = i >= 0 ? projectFor(i) : null;
      if (!p) {
        pill.style.opacity = "0";
        pill.style.transform = pill.style.transform.replace(/scale\([^)]*\)/, "") + " scale(0.92)";
        return;
      }
      if (pill.textContent !== p.title) pill.textContent = p.title;
      const r = mount.getBoundingClientRect();
      const pw = pill.offsetWidth;
      const ph = pill.offsetHeight;
      const mx = px - r.left;
      const my = py - r.top;
      const pad = 12;
      let x = mx + 22;
      if (x + pw > r.width - pad) x = mx - pw - 22;
      let y = my + 22;
      if (y + ph > r.height - pad) y = my - ph - 22;
      x = Math.min(Math.max(pad, x), Math.max(pad, r.width - pw - pad));
      y = Math.min(Math.max(pad, y), Math.max(pad, r.height - ph - pad));
      pill.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1)`;
      pill.style.opacity = "1";
    };

    const updateHover = () => {
      const i = pointerIn && !dragging ? pickCard() : -1;
      const has = i >= 0 && !!projectFor(i);
      hoverIdx = has ? i : -1;
      showPill(hoverIdx);
      renderer.domElement.style.cursor = dragging ? "grabbing" : has ? "pointer" : "grab";
    };

    const tmp = new THREE.Vector3();
    let fitW = 0;
    let fitH = 0;
    const recenter = (snap: boolean) => {
      ring.updateMatrixWorld(true);
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      for (const { mesh } of cards) {
        const pos = (mesh.geometry as THREE.BufferGeometry).attributes.position as THREE.BufferAttribute;
        for (let j = 0; j < pos.count; j++) {
          tmp.fromBufferAttribute(pos, j).applyMatrix4(mesh.matrixWorld).project(camera);
          if (tmp.x < minX) minX = tmp.x;
          if (tmp.x > maxX) maxX = tmp.x;
          if (tmp.y < minY) minY = tmp.y;
          if (tmp.y > maxY) maxY = tmp.y;
        }
      }
      const cx = (minX + maxX) / 2;
      const cy = (minY + maxY) / 2;
      const halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      const k = snap ? 1 : 0.08;
      ring.position.x -= cx * halfH * camera.aspect * k;
      ring.position.y -= cy * halfH * k;
      const w = (maxX - minX) / 2;
      const h = (maxY - minY) / 2;
      if (w > 0 && h > 0) {
        fitW = Math.max(w, fitW * 0.995);
        fitH = Math.max(h, fitH * 0.995);
        const px = mount.clientWidth || 1;
        const targetW = Math.min(0.82, 1 - (2 * 40) / px);
        const scale = Math.min(targetW / fitW, 0.86 / fitH);
        const s2 = 1 + (scale - 1) * (snap ? 1 : 0.08);
        const tanHalf = Math.tan((camera.fov * Math.PI) / 360) / s2;
        camera.fov = Math.min(100, Math.max(5, (2 * Math.atan(tanHalf) * 180) / Math.PI));
        camera.updateProjectionMatrix();
      }
    };

    const apply = (t: number, snap = false) => {
      ring.rotation.x = baseTilt + tiltOffset + Math.sin(t * 0.0004) * 0.03;
      ring.rotation.z = Math.sin(t * 0.0003) * 0.03;
      layout(rot);
      recenter(snap);
      renderer.render(scene, camera);
    };

    const el = renderer.domElement;
    el.style.cursor = "grab";
    el.style.touchAction = "pan-y";
    const down = (e: PointerEvent) => {
      dragging = true;
      dragDx = 0;
      downX = e.clientX;
      downY = e.clientY;
      moved = 0;
      showPill(-1);
      lastX = e.clientX;
      lastY = e.clientY;
      el.style.cursor = "grabbing";
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      pointerIn = true;
      if (!dragging) return;
      moved = Math.max(moved, Math.abs(e.clientX - downX) + Math.abs(e.clientY - downY));
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      vel = dx * 0.006;
      rot += vel;
      dragDx += dx;
      tiltVel = dy * 0.0015;
      tiltOffset = Math.max(-0.25, Math.min(0.25, tiltOffset + tiltVel));
    };
    const up = (e: PointerEvent) => {
      if (dragging && Math.abs(dragDx) > 8) idle = Math.sign(dragDx) * Math.abs(idle);
      const wasDrag = moved > 6;
      dragging = false;
      el.style.cursor = "grab";
      try {
        el.releasePointerCapture(e.pointerId);
      } catch (err) {}
      if (!wasDrag && e.type === "pointerup") {
        px = e.clientX;
        py = e.clientY;
        const i = pickCard();
        const p = i >= 0 ? projectFor(i) : null;
        if (p && p.link) window.location.assign(p.link);
      }
    };
    const leave = () => {
      pointerIn = false;
      if (!dragging) updateHover();
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("pointerleave", leave);

    let visible = true;
    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
    });
    io.observe(mount);

    const loop = (t: number) => {
      if (disposed) return;
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      if (!dragging) updateHover();
      if (!dragging) {
        vel += ((hoverIdx >= 0 ? 0 : idle) - vel) * (hoverIdx >= 0 ? 0.12 : 0.03);
        rot += vel;
        tiltOffset *= 0.96;
      }
      apply(t);
    };
    for (let i = 0; i < 6; i++) apply(0, true);
    raf = requestAnimationFrame(loop);

    return () => {
      disposed = true;
      savedRot = rot;
      cancelAnimationFrame(raf);
      ro.disconnect();
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("pointerleave", leave);
      io.disconnect();
      geoms.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [imageList.join("|"), cardCount, radius, tilt, twist, autoSpeed, borderWidth, borderColor]);

  const label: CSSProperties = {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontFamily: '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: labelColor,
    lineHeight: 1.5,
    pointerEvents: "none",
    zIndex: 2,
  };
  const dot = <span style={{ flexShrink: 0, width: 5, height: 5, borderRadius: 5, background: "#fbc701", display: "inline-block" }} />;

  return (
    <section
      aria-label="Twist Band interactive showcase"
      style={{ ...props.style, position: "relative", width: "100%", height: "100%", overflow: "hidden", background }}
    >
      {pattern && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: patternOpacity,
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.4) 1.4px, transparent 2px)`,
            backgroundSize: "24px 24px",
            backgroundPosition: "center center",
            WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, #000 35%, transparent 100%)",
            maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, #000 35%, transparent 100%)",
          }}
        />
      )}
      <div
        ref={mountRef}
        className="agx-mount"
        style={{
          position: "absolute",
          inset: 0,
        }}
      />
      {/* Floating Hover Project Pill */}
      <div
        ref={pillRef}
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 4,
          opacity: 0,
          transform: "translate3d(0px, 0px, 0) scale(0.92)",
          transition: "opacity 0.2s ease, transform 0.12s ease-out",
          pointerEvents: "none",
          background: pillColor,
          color: pillTextColor,
          borderRadius: 100,
          padding: "10px 28px",
          whiteSpace: "nowrap",
          fontFamily: '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif',
          fontSize: 18,
          fontWeight: 700,
          lineHeight: 1.4,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
        }}
      />
      {hint && (
        <div style={{ ...label, bottom: hintBottom, left: "50%", transform: "translateX(-50%)", maxWidth: "90%" }}>
          {dot}
          {hint}
          {dot}
        </div>
      )}
    </section>
  );
}
