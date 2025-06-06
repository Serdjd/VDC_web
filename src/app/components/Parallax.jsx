import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function PermanentParallaxComponent() {
  const mainImageRef = useRef(null);
  const parallaxStageRef = useRef(null);
  const secondaryImagesRefs = useRef([]);
  const comp = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parallaxStageRef.current,
          start: "top top",
          end: "max",
          scrub: true,
          pin: true,
          //markers: true,
        }
      });

      tl.to(mainImageRef.current, {
        width: "60vw",
        height: "55vh",
        top: "22.5vh",
        left: "20vw",
        borderRadius: "20px",
        ease: "power1.inOut",
      }, 0);

      const secondaryImagesStartTime = 0;

      secondaryImagesRefs.current.slice(0, 2).forEach((image, i) => {
        tl.fromTo(image,
          { opacity: 0, x: -100 },
          { opacity: 1, x: 0, ease: "power2.out" },
          secondaryImagesStartTime + (i * 0.05)
        );
      });

      secondaryImagesRefs.current.slice(2, 4).forEach((image, i) => {
        tl.fromTo(image,
          { opacity: 0, x: 100 },
          { opacity: 1, x: 0, ease: "power2.out" },
          secondaryImagesStartTime + (i * 0.05)
        );
      });

      tl.fromTo(secondaryImagesRefs.current[5],
        { opacity: 0, y: -100 },
        { opacity: 1, y: 0, ease: "power2.out" },
        secondaryImagesStartTime + 0.1
      );

      tl.fromTo(secondaryImagesRefs.current[6],
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, ease: "power2.out" },
        secondaryImagesStartTime + 0.1
      );

    }, comp);

    return () => ctx.revert();
  }, []);


  return (
    <div ref={comp} className="overflow-x-hidden bg-neutral-700">
      {/*Section 1: Initial Full-Screen Image*/}
      <div className="relative h-screen overflow-hidden bg-gray-800">
        <img
          ref={mainImageRef}
          src={'/banda.jpg'}
          alt="Initial Full Screen View"
          className="fixed inset-0 w-screen h-screen object-cover z-10"
        />
        <h1 className="absolute top-8/10 left-1/2 -translate-x-1/2 text-white md:text-7xl font-bold z-20 text-5xl text-shadow-lg text-center">
          Banda de Música Virgen del Castillo
        </h1>
      </div>

      {/*Section 2: Parallax Stage with Shrinking Image and Side Images*/}
      <div
        ref={parallaxStageRef}
        className="relative flex h-screen w-screen items-center justify-center overflow-hidden"
      >
          {/*Imagenes lado izquierdo*/}
          <div className="absolute left-0 top-100 -translate-y-1/2 flex flex-col gap-10 -translate-x-1/3 z-20">
            {['/saxos.jpg', '/lazo.jpg'].map((src, i) => (
              <img
                key={`left-img-${i}`}
                ref={el => secondaryImagesRefs.current[i] = el}
                src={src}
                alt={`Imagen lateral ${i + 1}`}
                className="w-120 h-140 object-cover rounded-lg shadow-lg opacity-0"
              />
            ))}
          </div>

          {/*Espacio Imagen Principal*/}
          <div className="w-[70vw] h-full flex items-center justify-center"/>

          {/*Imagenes lado derecho*/}
          <div className="absolute right-0 top-120 -translate-y-1/2 flex flex-col gap-10 translate-x-1/3 z-20">
            {['/todos.jpg', '/banderin.jpg'].map((src, i) => (
              <img
                key={`right-img-${i}`}
                ref={el => secondaryImagesRefs.current[i + 2] = el}
                src={src}
                alt={`Imagen lateral ${i + 2}`}
                className="w-120 h-140 object-cover rounded-lg shadow-lg opacity-0"
              />
            ))}
          </div>

        {/*Imagen Superior*/}
        <div className="absolute top-0 flex justify-center transform -translate-y-3/5 z-20">
          <img
            ref={el => secondaryImagesRefs.current[5] = el}
            src={'/ensayo.jpg'}
            alt="Imagen Superior"
            className="w-[60vw] h-100 object-cover rounded-lg shadow-lg opacity-0"
          />
        </div>

        {/*Imagen Inferior*/}
        <div className="absolute bottom-0 flex justify-center transform translate-y-3/5 z-20">
          <img
            ref={el => secondaryImagesRefs.current[6] = el}
            src={'/beduinos.jpg'}
            alt="Imagen Inferior"
            className="w-[60vw] h-100 object-cover rounded-lg shadow-lg opacity-0"
          />
        </div>
        </div>

      {/*Section 3: Content Below Parallax*/}
      <div className="min-h-screen p-12 text-gray-800">

      </div>
    </div>
  );
}

export default PermanentParallaxComponent;