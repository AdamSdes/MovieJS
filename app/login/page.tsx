"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/widgets/Header/Header';
import { FiGithub, FiChrome, FiFacebook } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isClient, setIsClient] = useState(false);  // Додаємо стан для клієнтської перевірки
    const router = useRouter();  // Ініціалізуємо роутер

    useEffect(() => {
        setIsClient(true);  // Оновлюємо стан після рендеру
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Тут буде логіка авторизації
    };

    if (!isClient) {
        return null;  // Не рендеримо компонент, поки не стало відомо, що це клієнт
    }

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
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold mb-2">Вітаємо в <span className="text-[rgb(195,187,175)]">KinoWorld</span></h2>
                            <p className="text-white/60 text-sm">Увійдіть щоб продовжити</p>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit}>
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

                            <Button type="submit" className="w-full h-12 bg-[rgb(195,187,175)] hover:bg-white/20 text-black font-medium rounded-xl transition-all duration-300 group">
                                Увійти
                                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </form>

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

                        <p className="text-center text-white/40 text-xs mt-6">
                            Немає акаунту? 
                            <button onClick={() => router.push('/register')} className="text-[rgb(195,187,175)] hover:underline">Зареєструйтесь</button>
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
