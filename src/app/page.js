"use client";
import { useState } from "react";
import Logo from "./components/Logo";
import PermanentParallaxComponent from "./components/Parallax";
import LoginModal from "./components/SignIn";

export default function Home() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <PermanentParallaxComponent />
      <Logo onClick={openModal} />
      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
