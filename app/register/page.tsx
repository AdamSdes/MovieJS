"use client"
import Link from "next/link";
import { useState } from "react";
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import axiosInstance from "@/axios/axios"; // Ваш налаштований axios
import axios from "axios";

export default function Register() {
    const [formData, setFormData] = useState({
        firstName: "",
        secondName: "",
        email: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState(false); // Стан завантаження
    const [error, setError] = useState<string | null>(null); // Стан помилки
    const [success, setSuccess] = useState<string | null>(null); // Стан успішної реєстрації
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target; // Використовуємо 'name' для визначення поля
        setFormData({ ...formData, [name]: value }); // Оновлюємо відповідне поле
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        // Базова валідація
        if (!formData.firstName || !formData.secondName || !formData.email || !formData.password) {
            setError("Будь ласка, заповніть всі поля!");
            setIsLoading(false);
            return;
        }

        try {
            console.log("Дані для реєстрації:", {
                first_name: formData.firstName,
                second_name: formData.secondName,
                email: formData.email,
                pass: formData.password,
            });

            const response = await axiosInstance.post("/auth/register", {
                first_name: formData.firstName,
                second_name: formData.secondName,
                email: formData.email,
                pass: formData.password,
            });

            const { token } = response.data;
            localStorage.setItem("token", token);
            setSuccess("Реєстрація пройшла успішно!");
            router.push("/profile");
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const errorMessage = err.response?.data?.message || err.message || "Не вдалося зареєструватися";
                setError(errorMessage);
            } else {
                setError("Не вдалося зареєструватися");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen text-white overflow-hidden">
            {/* Animated background */}
            <div className="fixed inset-0 bg-black">
                <motion.div
                    className="absolute inset-0 opacity-30"
                    animate={{
                        background: [
                            "radial-gradient(circle at 20% 20%, rgba(195,187,175,0.4) 0%, transparent 50%)",
                            "radial-gradient(circle at 60% 60%, rgba(195,187,175,0.4) 0%, transparent 50%)",
                            "radial-gradient(circle at 20% 60%, rgba(195,187,175,0.4) 0%, transparent 50%)",
                        ],
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
                            <p className="text-white/60 text-sm">Зареєструйтесь для доступу до усіх функцій</p>
                        </div>

                        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                        {success && <p className="text-green-500 text-sm text-center mb-4">{success}</p>}

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="relative">
                                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="Ім'я"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[rgb(195,187,175)] transition-all"
                                    required
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
                                    required
                                />
                            </div>

                            <div className="relative">
                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Електронна пошта"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[rgb(195,187,175)] transition-all"
                                    required
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
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className={`w-full h-12 ${isLoading ? 'bg-gray-400' : 'bg-[rgb(195,187,175)]'} hover:bg-white/20 text-black font-medium rounded-xl transition-all duration-300 group`}
                                disabled={isLoading}
                            >
                                {isLoading ? "Реєстрація..." : "Зареєструватися"}
                                {!isLoading && <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />}
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
