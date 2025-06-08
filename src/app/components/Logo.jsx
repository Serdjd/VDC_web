import React from 'react';

const Logo = ({ onClick }) => (
    <div
        className="fixed top-8 right-8 w-20 h-20 rounded-full z-50 flex items-center justify-center bg-amber-50/10 shadow-lg"
        onClick={onClick}
    >
        <img
            src="/logo.png"
            alt="Logo"
            className="w-20 h-20 object-contain drop-shadow-lg z-50"
        />

    </div>
);

export default Logo;


