"use client"
// pages/registration.js
import { useState } from 'react';
import Header from '@/components/widgets/Header/Header';
import { Button } from '@/components/ui/button';

export default function Registration() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Тут можна додати логіку відправки даних на сервер
    };

    return (
        <div className="bg-black min-h-screen text-white">
            <Header />
            <div className="container mx-auto py-20 flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-8">Реєстрація</h1>
                <form 
                    onSubmit={handleSubmit} 
                    className="bg-black/90 backdrop-blur-md border border-white/10 rounded-xl p-10 w-full max-w-md flex flex-col gap-6">
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="Ім'я користувача" 
                        value={formData.username} 
                        onChange={handleChange} 
                        className="w-full p-4 bg-black/70 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        required
                    />
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Електронна пошта" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className="w-full p-4 bg-black/70 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        required
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Пароль" 
                        value={formData.password} 
                        onChange={handleChange} 
                        className="w-full p-4 bg-black/70 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        required
                    />
                    <Button 
                        type="submit" 
                        className="w-full py-4 text-lg font-semibold bg-blue-500 rounded-lg hover:bg-blue-600">
                        Зареєструватись
                    </Button>
                </form>
            </div>
        </div>
    );
}
