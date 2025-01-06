"use client"

import { useState } from 'react';
import Header from '@/components/widgets/Header/Header';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiArrowRight, FiGithub, FiChrome, FiFacebook } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        secondName: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!isLogin && formData.password !== formData.confirmPassword) {
            setError('Паролі не співпадають');
            return;
        }

        try {
            const endpoint = isLogin ? '/login' : '/register';
            const payload = isLogin 
                ? { email: formData.email, password: formData.password }
                : { 
                    email: formData.email, 
                    password: formData.password,
                    firstName: formData.firstName,
                    secondName: formData.secondName
                };

            const response = await fetch(`http://localhost:3001${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                credentials: 'include'
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Щось пішло не так');
            }

            const data = await response.json();
            
            // Save token to localStorage
            localStorage.setItem('token', data.token);
            
            // Redirect to home page
            router.push('/');
        } catch (err) {
            console.error('Auth error:', err);
            setError(err.message || 'Помилка зєднання з сервером');
        }
    };

    return (
        <div className="relative min-h-screen text-white overflow-hidden">
            <Header />
            
            {/* Animated background */}
            <div className="fixed inset-0 bg-black">
                <motion.div
                    className="absolute inset-0 opacity-30"
                    animate={{
                        background: [
                            'radial-gradient(circle at 20% 20%, rgba(195,187,175,0.4) 0%, transparent 50%)',
                            'radial-gradient(circle at 60% 60%, rgba(195,187,175,0.4) 0%, transparent 50%)',
                            'radial-gradient(circle at 20% 60%, rgba(195,187,175,0.4) 0%, transparent 50%)',
                        ]
                    }}
                    transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
                />
            </div>

            <div className="container relative mx-auto px-4 py-20">
                <div className="max-w-md mx-auto">
                    <motion.div
                        className="relative bg-black/40 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-8 overflow-hidden shadow-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Logo and welcome text */}
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold mb-2">
                                Вітаємо в <span className="text-[rgb(195,187,175)]">KinoWorld</span>
                            </h2>
                            <p className="text-white/60 text-sm">
                                {isLogin ? 'Увійдіть щоб продовжити' : 'Створіть новий акаунт'}
                            </p>
                        </div>

                        {/* Navigation tabs */}
                        <div className="flex gap-4 mb-8 p-1 bg-white/5 rounded-xl">
                            <button
                                onClick={() => setIsLogin(true)}
                                className={`flex-1 py-3 text-center rounded-xl transition-all duration-300 ${
                                    isLogin 
                                        ? 'bg-[rgb(195,187,175)] text-black font-medium' 
                                        : 'text-white/60 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                Вхід
                            </button>
                            <button
                                onClick={() => setIsLogin(false)}
                                className={`flex-1 py-3 text-center rounded-xl transition-all duration-300 ${
                                    !isLogin 
                                        ? 'bg-[rgb(195,187,175)] text-black font-medium' 
                                        : 'text-white/60 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                Реєстрація
                            </button>
                        </div>

                        {/* Form */}
                        <AnimatePresence mode="wait">
                            <motion.form
                                key={isLogin ? 'login' : 'register'}
                                initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                                className="space-y-4"
                                onSubmit={handleSubmit}
                            >
                                {!isLogin && (
                                    <>
                                        <div className="relative">
                                            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                                            <input
                                                type="text"
                                                name="firstName"
                                                placeholder="Ім'я"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[rgb(195,187,175)] transition-all"
                                            />
                                        </div>
                                        <div className="relative">
                                            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                                            <input
                                                type="text"
                                                name="secondName"
                                                placeholder="Прізвище"
                                                value={formData.secondName}
                                                onChange={handleChange}
                                                className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[rgb(195,187,175)] transition-all"
                                            />
                                        </div>
                                    </>
                                )}
                                 
                                <div className="relative">
                                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Електронна пошта"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[rgb(195,187,175)] transition-all"
                                    />
                                </div>

                                <div className="relative">
                                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Пароль"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[rgb(195,187,175)] transition-all"
                                    />
                                </div>

                                {!isLogin && (
                                    <div className="relative">
                                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Підтвердіть пароль"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[rgb(195,187,175)] transition-all"
                                        />
                                    </div>
                                )}

                                {/* Remember me & Forgot password */}
                                {isLogin && (
                                    <div className="flex items-center justify-between text-sm">
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <input type="checkbox" className="hidden" />
                                            <div className="w-4 h-4 border border-white/20 rounded group-hover:border-[rgb(195,187,175)] transition-colors" />
                                            <span className="text-white/60 group-hover:text-white/80 transition-colors">Запам'ятати мене</span>
                                        </label>
                                        <a href="#" className="text-[rgb(195,187,175)] hover:underline">
                                            Забули пароль?
                                        </a>
                                    </div>
                                )}

                                {error && (
                                    <div className="text-red-500 text-sm text-center">
                                        {error}
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-[rgb(195,187,175)] hover:bg-white/20 text-black font-medium rounded-xl transition-all duration-300 group"
                                >
                                    {isLogin ? 'Увійти' : 'Зареєструватися'}
                                    <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>

                                {/* Social login */}
                                <div className="relative my-8">
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 text-white/40">Або увійдіть через</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    {[FiGithub, FiChrome, FiFacebook].map((Icon, idx) => (
                                        <Button
                                            key={idx}
                                            variant="outline"
                                            className="h-12 bg-white/5 border-white/10 hover:bg-white/10 text-white"
                                        >
                                            <Icon className="w-5 h-5" />
                                        </Button>
                                    ))}
                                </div>

                                {/* Terms */}
                                <p className="text-center text-white/40 text-xs mt-6">
                                    Продовжуючи, ви погоджуєтеся з {' '}
                                    <a href="#" className="text-[rgb(195,187,175)] hover:underline">
                                        Умовами використання
                                    </a>
                                    {' '} та {' '}
                                    <a href="#" className="text-[rgb(195,187,175)] hover:underline">
                                        Політикою конфіденційності
                                    </a>
                                </p>
                            </motion.form>
                        </AnimatePresence>

                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[rgb(195,187,175)] rounded-full filter blur-[100px] -z-10 opacity-20" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[rgb(195,187,175)] rounded-full filter blur-[100px] -z-10 opacity-20" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
