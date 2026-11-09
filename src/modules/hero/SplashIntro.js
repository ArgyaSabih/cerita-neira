"use client";

import {useEffect, useRef} from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import gsap from "gsap";

const PHOTOS = Array.from({length: 10}, (_, i) => `/assets/splashscreen/splash_${i + 1}.webp`);
const GRID_SLOTS = [[1, 1], [0, 0], [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2], null];
const STACK_TILTS = [0, -6, 5, -3, 8, -8, 4, -5, 7, -2];

const preload = (src) =>
  new Promise((resolve) => {
    const img = new window.Image();
    img.onload = img.onerror = () => resolve();
    img.src = src;
  });

const SplashIntro = ({onReveal, onComplete}) => {
  const rootRef = useRef(null);
  const cardsRef = useRef([]);
  const imagesRef = useRef([]);
  const titleRef = useRef(null);
  const revealedRef = useRef(false);

  const reveal = () => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    onReveal?.();
  };

  useEffect(() => {
    let cancelled = false;
    const ctx = gsap.context(() => {}, rootRef);

    const timeout = new Promise((resolve) => setTimeout(resolve, 1500));
    Promise.race([Promise.all(PHOTOS.map(preload)), timeout]).then(() => {
      if (cancelled) return;

      ctx.add(() => {
        const W = window.innerWidth;
        const H = window.innerHeight;
        const gap = 0;

        const cardW = Math.min(W * 0.55, 320);
        const cardH = cardW * 1.3;
        const stack = {left: (W - cardW) / 2, top: (H - cardH) / 2, width: cardW, height: cardH};

        const tileW = (W - gap * 4) / 3;
        const tileH = (H - gap * 4) / 3;
        const tile = ([r, c]) => ({
          left: gap + c * (tileW + gap),
          top: gap + r * (tileH + gap),
          width: tileW,
          height: tileH
        });

        const cards = cardsRef.current;
        const images = imagesRef.current;
        const center = cards[0];
        const others = cards.slice(1, 9);
        const leftover = cards[9];

        gsap.set(cards, {
          ...stack,
          y: H,
          opacity: 1,
          rotation: (i) => STACK_TILTS[i] * 3,
          borderRadius: 16
        });
        gsap.set(images, {scale: 1.15});

        const tl = gsap.timeline({onComplete: () => onComplete?.()});

        // 1. Deal the cards into a stack
        tl.to([...cards].reverse(), {
          y: 0,
          rotation: (i) => STACK_TILTS[9 - i],
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.08
        })
          .to({}, {duration: 0.25})

          // 2. Spread to a 3x3 grid that fills the screen.
          .addLabel("spread")
          .to(
            cards.slice(0, 9),
            {
              left: (i) => tile(GRID_SLOTS[i]).left,
              top: (i) => tile(GRID_SLOTS[i]).top,
              width: tileW,
              height: tileH,
              rotation: 0,
              borderRadius: 0,
              duration: 0.9,
              ease: "expo.inOut",
              stagger: (i) => (i === 0 ? 0 : 0.04 * i)
            },
            "spread"
          )
          .to(leftover, {opacity: 0, scale: 0.8, rotation: 0, duration: 0.5}, "spread")
          .to(images, {scale: 1, duration: 2.4, ease: "power1.out"}, "spread")
          .fromTo(
            titleRef.current,
            {opacity: 0, y: 30},
            {opacity: 1, y: 0, duration: 0.6, ease: "power3.out"},
            "spread+=0.7"
          )
          .to({}, {duration: 0.5})

          // 3. Zoom-through: center tile fills the screen, the rest push outward.
          .addLabel("zoom")
          .to(center, {left: 0, top: 0, width: W, height: H, duration: 0.9, ease: "expo.inOut"}, "zoom")
          .to(
            others,
            {
              x: (i) => (GRID_SLOTS[i + 1][1] - 1) * W * 0.6,
              y: (i) => (GRID_SLOTS[i + 1][0] - 1) * H * 0.6,
              opacity: 0,
              duration: 0.9,
              ease: "expo.inOut"
            },
            "zoom"
          )
          .to(rootRef.current, {opacity: 0, duration: 0.7, ease: "power2.out"}, "zoom+=0.9")

          // Crossfade the photo and the title together into the real hero underneath.
          .addLabel("reveal")
          .call(reveal, [], "reveal")
          .to([center, titleRef.current], {opacity: 0, duration: 0.7, ease: "power2.out"}, "reveal");
      });
    });

    return () => {
      cancelled = true;
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] overflow-hidden bg-[url('/assets/splashscreen/bg-splash.webp')] bg-cover bg-center"
    >
      {PHOTOS.map((src, i) => (
        <div
          key={src}
          ref={(el) => (cardsRef.current[i] = el)}
          className="absolute overflow-hidden shadow-2xl will-change-transform"
          style={{opacity: 0, zIndex: 10 - i}}
        >
          <div ref={(el) => (imagesRef.current[i] = el)} className="relative w-full h-full">
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              sizes={i === 0 ? "100vw" : "50vw"}
              className="object-cover"
            />
          </div>
        </div>
      ))}

      <div
        ref={titleRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
        style={{opacity: 0}}
      >
        <h2 className="text-6xl leading-none text-center font-auromiya sm:text-7xl md:text-8xl text-neutral-100 drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
          Cerita Neira
        </h2>
      </div>
    </div>
  );
};

SplashIntro.propTypes = {
  onReveal: PropTypes.func,
  onComplete: PropTypes.func
};

export default SplashIntro;
