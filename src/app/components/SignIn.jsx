import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useRef, useEffect } from "react";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';

const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const LoginModal = ({ isOpen, onClose }) => {
  const dialogRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (dialogElement) {
      if (isOpen) {
        dialogElement.showModal();
        if (emailRef.current) emailRef.current.value = '';
        if (passwordRef.current) passwordRef.current.value = '';
      } else {
        dialogElement.close();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (dialogElement) {
      const handleClickOutside = (event) => {
        if (event.target === dialogElement && !isLoading) {
          onClose();
        }
      };
      dialogElement.addEventListener('click', handleClickOutside);

      return () => {
        dialogElement.removeEventListener('click', handleClickOutside);
      };
    }
  }, [onClose, isLoading]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn(emailRef.current?.value, passwordRef.current?.value);
      console.log('Login successful! Redirecting to /dashboard...');
      toast.success('¡Inicio de sesión exitoso!');
      router.push('/dashboard');
      onClose();
    } catch (err) {
      console.error('Login failed:', err);
      
      onClose(); 
      toast.error('Datos incorrectos');

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        className="backdrop:bg-stone-800/70 backdrop:backdrop-blur-md m-auto rounded-2xl shadow-2xl"
      >
        <div className="p-10 w-96 max-w-sm bg-white">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800 tracking-wide">Login</h2>
          <form className="flex flex-col gap-6" onSubmit={handleLogin}>
            <input
              ref={emailRef}
              type="text"
              placeholder="Email"
              className="py-3 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200"
              disabled={isLoading}
            />
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              className="py-3 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200"
              disabled={isLoading}
            />
            <button
              className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 transform disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 text-white mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </div>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>
      </dialog>
      <Toaster />
    </>
  );
}
export default LoginModal;