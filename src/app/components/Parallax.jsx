import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

function PermanentParallaxComponent() {
  const titleRef = useRef(null);
  const mainImageRef = useRef(null);
  const parallaxStageRef = useRef(null);
  const smallScreenTopLeftImageRef = useRef(null);
  const smallScreenBottomRightImageRef = useRef(null);
  const secondaryImagesRefs = useRef([]);
  const transitionElementRef = useRef(null);
  const comp = useRef(null);
  const nextSectionRef = useRef(null);
  const bottomTextRef = useRef(null);
  const bottomImagesRefs = useRef([]);
  const newSectionImageRef = useRef(null);
  const newSectionTextRef = useRef(null);
  const contactImageRef = useRef(null);
  const contactTextRef = useRef(null);

  const setBottomImageRef = (el, index) => {
    if (el) {
      bottomImagesRefs.current[index] = el;
      gsap.set(el, { opacity: 0, scale: 0.8, y: 100 });
    }
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      const pinnedTl = gsap.timeline({
        scrollTrigger: {
          trigger: parallaxStageRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
          onLeave: () => {
            const scrollY = window.scrollY || window.pageYOffset;
            gsap.set(mainImageRef.current, {
              position: "absolute",
              top: 0 + scrollY,
              scale: 0.6,
              borderRadius: "20px",
            });
          },
          onEnterBack: () => {
            gsap.set(mainImageRef.current, {
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
            });
          },
        }
      });

      const titleAnimationDuration = 0.5;
      const mainImageAndSecondaryStart = titleAnimationDuration;
      const mainImageScaleDuration = 1;
      const triangleRevealStart = mainImageAndSecondaryStart + mainImageScaleDuration * 0.5;
      const triangleRevealDuration = 1;

      pinnedTl.to(titleRef.current, {
        opacity: 0,
        yPercent: -100,
        ease: "power1.in",
        duration: titleAnimationDuration,
      }, 0);

      pinnedTl.to(mainImageRef.current, {
        scale: 0.6,
        borderRadius: "20px",
        ease: "power2.inOut",
        duration: mainImageScaleDuration,
      }, mainImageAndSecondaryStart);

      if (window.innerWidth >= 1024) {
        secondaryImagesRefs.current.slice(0, 2).forEach((image, i) => {
          pinnedTl.fromTo(image,
            { opacity: 0, x: -100 },
            { opacity: 1, x: 0, ease: "power2.out", duration: 0.5 },
            mainImageAndSecondaryStart + .5 + (i * 0.05)
          );
        });

        secondaryImagesRefs.current.slice(2, 4).forEach((image, i) => {
          pinnedTl.fromTo(image,
            { opacity: 0, x: 100 },
            { opacity: 1, x: 0, ease: "power2.out", duration: 0.5 },
            mainImageAndSecondaryStart + .5 + (i * 0.05)
          );
        });

        pinnedTl.fromTo(secondaryImagesRefs.current[5],
          { opacity: 0, y: -100 },
          { opacity: 1, y: 0, ease: "power2.out", duration: 0.5 },
          mainImageAndSecondaryStart + .5
        );

        pinnedTl.fromTo(secondaryImagesRefs.current[6],
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, ease: "power2.out", duration: 0.5 },
          mainImageAndSecondaryStart + .5
        );
      } else {
        gsap.fromTo([smallScreenTopLeftImageRef.current, smallScreenBottomRightImageRef.current],
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, ease: "power2.out", duration: 0.5, stagger: 0.1 }
        );
      }
      
      pinnedTl.fromTo(transitionElementRef.current,
        {
          height: "0%",
          opacity: 1,
          top: "105%",
        },
        {
          top: "80%",
          height: "20%",
          opacity: 1,
          ease: "none",
          duration: triangleRevealDuration,
        },
        triangleRevealStart
      );

      const secondaryImagesAndTriangleToReset = [
        ...secondaryImagesRefs.current,
        transitionElementRef.current
      ];

      if (window.innerWidth >= 1024) {
          pinnedTl.to(secondaryImagesAndTriangleToReset, {
            x: 0,
            y: 0,
            duration: 0.5,
          }, triangleRevealStart + triangleRevealDuration + 0.5);
      }
      

      const allImagesForParallax = window.innerWidth >= 1024 ? [...secondaryImagesRefs.current] : [smallScreenTopLeftImageRef.current, smallScreenBottomRightImageRef.current];

      allImagesForParallax.forEach((image, i) => {
        if (image) {
          gsap.to(image, {
            y: (i % 2 === 0 ? 50 : -50),
            ease: "none",
            scrollTrigger: {
              trigger: parallaxStageRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });

      gsap.fromTo(bottomTextRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, ease: "power2.out", duration: 1,
          scrollTrigger: {
            trigger: bottomTextRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          }
        }
      );

      bottomImagesRefs.current.forEach((image) => {
        if (image) {
          gsap.fromTo(image,
            { opacity: 0, scale: 0.8, y: 100 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              ease: "back.out(1.7)",
              duration: 0.8,
              scrollTrigger: {
                trigger: image,
                start: "top center",
                end: "bottom center",
                scrub: 0.5,
                toggleActions: "play reverse play reverse",
              }
            }
          );
        }
      });

      gsap.fromTo(newSectionImageRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1, x: 0, ease: 'power2.out', duration: 1,
          scrollTrigger: {
            trigger: newSectionImageRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      gsap.fromTo(newSectionTextRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1, x: 0, ease: 'power2.out', duration: 1,
          scrollTrigger: {
            trigger: newSectionTextRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      gsap.fromTo(contactTextRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1, x: 0, ease: 'power2.out', duration: 1,
          scrollTrigger: {
            trigger: contactTextRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      gsap.fromTo(contactImageRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1, x: 0, ease: 'power2.out', duration: 1,
          scrollTrigger: {
            trigger: contactImageRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={comp} className="overflow-x-hidden bg-neutral-800">
      <img
        ref={mainImageRef}
        src={'/banda.jpg'}
        alt="Fondo de la banda"
        className="fixed inset-0 w-full h-full object-cover z-10"
      />
      <Link
        href="./vdc.apk"
        download
        className="absolute top-4 left-4 z-30 text-white text-3xl cursor-pointer hover:text-blue-400 transition-colors duration-300"
        title="Descargar Información"
      >
        <FontAwesomeIcon icon={faDownload} />
      </Link>
      <h1 ref={titleRef} className="absolute top-[75%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl sm:text-5xl md:text-7xl font-bold z-20 text-shadow-lg text-center w-full px-4">
        Banda de Música Virgen del Castillo
      </h1>
      <div ref={parallaxStageRef} className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
        <div className="absolute top-0 left-0 flex lg:hidden items-center justify-center w-full h-full">
          <img
            ref={smallScreenTopLeftImageRef}
            src={'/saxos.jpg'}
            alt="Saxos"
            className="absolute top-10 left-5 w-[200px] h-[240px] sm:w-[250px] sm:h-[300px] object-cover rounded-lg shadow-lg z-5 opacity-0"
          />
          <img
            ref={smallScreenBottomRightImageRef}
            src={'/banderin.jpg'}
            alt="Banderín"
            className="absolute bottom-10 right-5 w-[200px] h-[240px] sm:w-[250px] sm:h-[300px] object-cover rounded-lg shadow-lg z-5 opacity-0"
          />
        </div>

        <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-10 -translate-x-1/3 z-10">
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
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-10 translate-x-1/3 z-10">
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
        <div className="absolute top-0 hidden lg:flex justify-center transform -translate-y-3/5 z-10">
          <img
            ref={el => secondaryImagesRefs.current[5] = el}
            src={'/ensayo.jpg'}
            alt="Imagen Superior"
            className="w-[60vw] h-100 object-cover rounded-lg shadow-lg opacity-0"
          />
        </div>
        <div className="absolute bottom-0 hidden lg:flex justify-center transform translate-y-3/5 z-10">
          <img
            ref={el => secondaryImagesRefs.current[6] = el}
            src={'/beduinos.jpg'}
            alt="Imagen Inferior"
            className="w-[60vw] h-100 object-cover rounded-lg shadow-lg opacity-0"
          />
        </div>
        <div ref={transitionElementRef} className="fixed inset-0 z-20" style={{ top: '105%', height: '0%', opacity: 1 }}>
          <img
            src="/triangulo.svg"
            alt="Transition Triangle"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div ref={nextSectionRef} className="bg-neutral-900 text-white flex flex-col items-center justify-start px-4 sm:px-8 pt-16 md:pt-32">
        <div className="flex justify-center w-full mb-16 md:mb-32">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center" ref={bottomTextRef}>
            ¡Nuestra Trayectoria en Imágenes!
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full mx-auto max-w-7xl">
          {['/domingo.jpg', '/lunes.jpg', '/martes.jpg', '/miercoles.jpg', '/jueves.jpg', '/viernes.jpg', '/viernes.jpg', '/sabado.jpg'].map((src, i) => (
            <div key={`bottom-img-${i}`}>
              <img
                ref={el => setBottomImageRef(el, i)}
                src={src}
                alt={`Galería ${i + 1}`}
                className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center bg-neutral-900 text-white px-4 sm:px-8 py-16 md:py-20 gap-8 md:gap-12 min-h-screen">
        <div ref={newSectionImageRef} className="w-full md:w-1/2 flex justify-center">
          <img
            src="/dirigiendo.png"
            alt="Concierto de la banda"
            className="w-full max-w-md md:max-w-full h-auto rounded-lg shadow-xl object-cover"
          />
        </div>
        <div ref={newSectionTextRef} className="w-full md:w-1/2 text-center md:text-left p-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Un Legado de Armonía</h2>
          <p className="text-base md:text-lg lg:text-xl leading-relaxed">
            Nuestra banda no es solo música; es historia, pasión y dedicación. Desde sus raíces en una tierra con más de un siglo de tradición musical, nos hemos consolidado como un referente. Con más de 80 componentes y bajo la batuta de José María Dorantes Ramos, cada nota es un testimonio de nuestro espíritu de superación y amor por el arte. Hemos llevado nuestra música a innumerables rincones, desde certámenes nacionales hasta las emblemáticas Semanas Santas, siempre dejando una huella imborrable.
          </p>
          <p className="text-base md:text-lg lg:text-xl leading-relaxed mt-4">
            Nuestro disco "Entre Bambalinas Lebrijanas" encapsula la esencia de nuestro origen y el orgullo de nuestra trayectoria. Cada concierto, cada desfile, es una oportunidad para compartir la magia de nuestra banda, una sinfonía de talento y compromiso que resuena con el alma de nuestra comunidad.
          </p>
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row items-center justify-center bg-neutral-900 text-white py-16 md:py-20 px-4 sm:px-8 gap-8 md:gap-12 min-h-screen">
        <div ref={contactTextRef} className="w-full md:w-1/2 text-center md:text-left p-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Dónde Encontrarnos</h2>
          <p className="text-base md:text-lg lg:text-xl leading-relaxed">
            Estamos ubicados en el corazón de Lebrija, un lugar donde la música y la tradición se unen. Si deseas conocernos, ensayar con nosotros o simplemente saludar, ¡nuestras puertas están siempre abiertas!
          </p>
          <div className='w-full flex flex-col sm:flex-row justify-between items-center mt-8 gap-6'>
            <p className="text-base md:text-lg lg:text-xl leading-relaxed">
              Puedes encontrarnos en <b>El Antiguo Silo de Trigo</b>
            </p>
            <div className="flex justify-center md:justify-end space-x-6">
              <a href="https://www.facebook.com/Bandademusicavirgendelcastillo/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500 transition-colors duration-300">
                <FontAwesomeIcon icon={faFacebookF} size="2x" />
              </a>
              <a href="https://www.instagram.com/bandavirgendelcastillo/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-500 transition-colors duration-300">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
              <a href="https://x.com/bmvdelcastillo/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition-colors duration-300">
                <FontAwesomeIcon icon={faXTwitter} size="2x" />
              </a>
            </div>
          </div>
        </div>
        <div ref={contactImageRef} className="w-full md:w-1/2 flex justify-center">
          <img
            src="/silo.jpg"
            alt="Ubicación de la banda"
            className="w-full max-w-md md:max-w-full h-auto rounded-lg shadow-xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default PermanentParallaxComponent;