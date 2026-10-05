'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { HiMail, HiOutlineCheckCircle, HiPhone, HiUser } from 'react-icons/hi';
import { MdClose, MdLockOutline, MdVisibility, MdVisibilityOff } from 'react-icons/md';

const GOOGLE_ICON_URL = 'https://www.gstatic.com/images/branding/product/2x/googleg_48dp.png';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthView = 'signin' | 'signup' | 'success';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [view, setView] = useState<AuthView>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { data: session, status } = useSession();
  
  // Sign In State
  const [signInData, setSignInData] = useState({ username: '', password: '' });
  
  // Sign Up State
  const [signUpData, setSignUpData] = useState({
    username: '',
    email: '',
    contact: '',
    password: '',
  });

  const handleGoogleAuth = () => {
    signIn('google');
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const storedUsers = JSON.parse(localStorage.getItem('octasence_users') || '[]');
      const user = storedUsers.find(
        (u: any) => u.username === signInData.username && u.password === signInData.password
      );

      if (user) {
        setView('success');
        setTimeout(() => onClose(), 2000);
      } else {
        setError('Invalid username or password. Please sign up first.');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const storedUsers = JSON.parse(localStorage.getItem('octasence_users') || '[]');
      if (storedUsers.some((u: any) => u.username === signUpData.username)) {
        setError('Username already exists.');
        setIsLoading(false);
        return;
      }

      storedUsers.push(signUpData);
      localStorage.setItem('octasence_users', JSON.stringify(storedUsers));
      
      setError('Account created successfully! You can now sign in.');
      setTimeout(() => {
        setView('signin');
        setError('');
      }, 2000);
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    if (status === 'authenticated') {
      setView('success');
      const timer = setTimeout(() => onClose(), 2000);
      return () => clearTimeout(timer);
    }
  }, [status, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setView('signin');
        setError('');
        setSignInData({ username: '', password: '' });
        setSignUpData({ username: '', email: '', contact: '', password: '' });
      }, 300);
    }
  }, [isOpen]);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[2147483647] flex items-center justify-center p-4 backdrop-blur-md bg-black/50"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
            className="relative w-full max-w-md bg-white shadow-[0_30px_60px_rgba(0,0,0,0.3)] rounded-3xl border border-gray-100 flex flex-col max-h-[95vh] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#031629] px-6 py-6 text-center relative z-20 shadow-xl border-b border-blue-500/20">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all font-bold"
              >
                <MdClose size={24} />
              </button>
              
              <div className="flex justify-center -mb-2">
                <Image 
                  src="/assets/images/logo.avif" 
                  alt="OctaSence Logo" 
                  width={400} 
                  height={160} 
                  className="h-36 w-auto object-contain brightness-110 drop-shadow-lg"
                  priority
                />
              </div>
              <h2 className="text-lg font-black text-white tracking-[0.25em] uppercase border-t border-white/5 pt-4">
                {view === 'signin' ? 'Portal Login' : view === 'signup' ? 'Create Account' : 'Verified'}
              </h2>
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1 custom-scrollbar">
              {view === 'success' ? (
                 <div className="p-12 flex flex-col items-center justify-center text-center">
                   <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                     <HiOutlineCheckCircle size={48} />
                   </motion.div>
                   <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome Back{session?.user?.name ? `, ${session.user.name}` : ''}!</h3>
                   <p className="text-gray-500">Accessing structural intelligence dashboard...</p>
                 </div>
              ) : (
                  <div className="p-8">
                    {error && (
                      <div className={`mb-6 p-4 rounded-xl text-sm font-bold ${error.includes('successfully') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                        {error}
                      </div>
                    )}

                    <form onSubmit={view === 'signin' ? handleSignIn : handleSignUp} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[12px] font-black text-[#031629] uppercase tracking-[0.1em] ml-1">Username</label>
                        <div className="relative">
                          <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                          <input required type="text" placeholder="Type your username" className="w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-xl outline-none focus:border-[#2563eb] shadow-sm" value={view === 'signin' ? signInData.username : signUpData.username} onChange={(e) => view === 'signin' ? setSignInData({...signInData, username: e.target.value}) : setSignUpData({...signUpData, username: e.target.value})} />
                        </div>
                      </div>

                      {view === 'signup' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                          <div className="space-y-2">
                            <label className="text-[12px] font-black text-[#031629] uppercase tracking-[0.1em] ml-1">Email Address</label>
                            <div className="relative">
                              <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                              <input required type="email" placeholder="name@company.com" className="w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-xl outline-none focus:border-[#2563eb] shadow-sm" value={signUpData.email} onChange={(e) => setSignUpData({...signUpData, email: e.target.value})} />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <div className="space-y-2">
                        <label className="text-[12px] font-black text-[#031629] uppercase tracking-[0.1em] ml-1">Password</label>
                        <div className="relative">
                          <MdLockOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
                          <input required type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="w-full pl-12 pr-12 py-4 bg-white border border-gray-300 rounded-xl outline-none focus:border-[#2563eb] shadow-sm" value={view === 'signin' ? signInData.password : signUpData.password} onChange={(e) => view === 'signin' ? setSignInData({...signInData, password: e.target.value}) : setSignUpData({...signUpData, password: e.target.value})} />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showPassword ? <MdVisibilityOff size={22} /> : <MdVisibility size={22} />}</button>
                        </div>
                      </div>

                      <button disabled={isLoading} className="w-full py-4 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold rounded-xl shadow-lg shadow-blue-200 uppercase tracking-widest">{isLoading ? 'Verifying...' : view === 'signin' ? 'Sign In' : 'Create Account'}</button>
                    </form>

                    <div className="mt-8 flex flex-col gap-5">
                      <button onClick={handleGoogleAuth} className="flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all font-bold text-gray-700 uppercase tracking-widest">
                        <img src={GOOGLE_ICON_URL} alt="Google" width={20} height={20} />
                        <span>Continue with Google</span>
                      </button>

                      <p className="text-center text-sm text-gray-500">
                        {view === 'signin' ? (
                          <>Don't have an account? <button onClick={() => setView('signup')} className="text-[#2563eb] font-bold hover:underline">Sign Up</button></>
                        ) : (
                          <>Already have an account? <button onClick={() => setView('signin')} className="text-[#2563eb] font-bold hover:underline">Sign In</button></>
                        )}
                      </p>
                    </div>
                  </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
