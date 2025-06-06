import React from 'react';

const Hero = () => {
    return (
        <section
        className="min-h-screen flex items-start justify-center text-white"
        style={heroStyle}
    >
        <Logo />
        <div className="text-center max-w-3xl p-8 rounded-2xl shadow-2xl">
            <h1 className="text-4xl md:text-7xl font-bold mb-4">Banda de Música Virgen del Castillo</h1>
        </div>
    </section>
    );
};

const heroStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.5)), url('/banda.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
};
heroStyle.filter = 'brightness(1.1) drop-shadow(0 0 40px rgba(255,255,255,0.15))';

export default Hero;

const Logo = () => (
    <div
        className="absolute top-8 left-8 w-40 h-40 rounded-full z-10 pointer-events-none flex items-center justify-center bg-amber-50/10 shadow-lg" 
    >
        <img
            src="/logo.png"
            alt="Logo"
            className="w-40 h-40 object-contain drop-shadow-lg z-20"
        />

    </div>
);
