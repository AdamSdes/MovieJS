"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { FiX, FiChevronRight } from 'react-icons/fi'

interface BookingModalProps {
    isOpen: boolean
    onClose: () => void
    movieTitle: string
}

const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date
})

const times = ['10:00', '13:00', '16:00', '19:00', '22:00']

const seatTypes = [
    { type: 'Стандарт', price: 120 },
    { type: 'Комфорт', price: 180 },
    { type: 'VIP', price: 250 }
]

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, movieTitle }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedTime, setSelectedTime] = useState<string | null>(null)
    const [selectedSeats, setSelectedSeats] = useState<string[]>([])
    const [step, setStep] = useState(1)

    // Generate seats layout
    const generateSeats = (rows: number, seatsPerRow: number) => {
        return Array.from({ length: rows }, (_, rowIndex) => {
            const row = String.fromCharCode(65 + rowIndex)
            return Array.from({ length: seatsPerRow }, (_, seatIndex) => ({
                id: `${row}${seatIndex + 1}`,
                type: seatIndex < 2 || seatIndex > seatsPerRow - 3 ? 'Стандарт' : 
                      rowIndex < 2 ? 'Стандарт' : 
                      rowIndex > rows - 3 ? 'VIP' : 'Комфорт'
            }))
        })
    }

    const seats = generateSeats(8, 12)

    const getTotalPrice = () => {
        return selectedSeats.reduce((total, seatId) => {
            const [row] = seatId.split('');
            const rowIndex = row.charCodeAt(0) - 65;
            const type = rowIndex < 2 ? 'Стандарт' : rowIndex > 5 ? 'VIP' : 'Комфорт';
            const price = seatTypes.find(st => st.type === type)?.price || 0;
            return total + price;
        }, 0);
    };

    const renderContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-6">
                        {/* Date selection */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-white">
                                Виберіть дату
                            </h3>
                            <div className="flex gap-2 overflow-x-auto py-2">
                                {dates.map((date) => (
                                    <Button
                                        key={date.toISOString()}
                                        variant="outline"
                                        className={`px-8 py-8 ${
                                            selectedDate?.toDateString() === date.toDateString()
                                                ? 'bg-[rgb(195,187,175)] text-black border-transparent'
                                                : 'border-white/10 text-white/70 hover:text-white hover:bg-white/5'
                                        }`}
                                        onClick={() => setSelectedDate(date)}
                                    >
                                        <div className="text-center">
                                            <div className="text-sm">
                                                {format(date, 'EEE')}
                                            </div>
                                            <div className="text-lg font-semibold">
                                                {format(date, 'd')}
                                            </div>
                                        </div>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Time selection */}
                        {selectedDate && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-white">
                                    Виберіть час
                                </h3>
                                <div className="grid grid-cols-5 gap-2">
                                    {times.map((time) => (
                                        <Button
                                            key={time}
                                            variant="outline"
                                            className={`${
                                                selectedTime === time
                                                    ? 'bg-[rgb(195,187,175)] text-black border-transparent'
                                                    : 'border-white/10 text-white/70 hover:text-white hover:bg-white/5'
                                            }`}
                                            onClick={() => setSelectedTime(time)}
                                        >
                                            {time}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6">
                        {/* Seat selection */}
                        <div className="space-y-8">
                            {/* Legend */}
                            <div className="flex items-center justify-center gap-6">
                                {[
                                    { type: 'Доступне', color: 'bg-white/20' },
                                    { type: 'Вибране', color: 'bg-[rgb(195,187,175)]' },
                                    { type: 'Зайняте', color: 'bg-red-500/20' }
                                ].map(({ type, color }) => (
                                    <div key={type} className="flex items-center gap-2">
                                        <div className={`w-4 h-4 rounded ${color}`} />
                                        <span className="text-white/60 text-sm">{type}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Screen */}
                            <div className="relative">
                                <div className="w-3/4 h-2 bg-[rgb(195,187,175)]/20 rounded-full mx-auto mb-12" />
                                <p className="absolute top-4 left-1/2 -translate-x-1/2 text-white/40 text-sm">
                                    Екран
                                </p>
                            </div>

                            {/* Seats */}
                            <div className="flex flex-col items-center gap-2">
                                {seats.map((row, rowIndex) => (
                                    <div key={rowIndex} className="flex items-center gap-2">
                                        <span className="text-white/40 w-6 text-right">
                                            {String.fromCharCode(65 + rowIndex)}
                                        </span>
                                        <div className="flex gap-1">
                                            {row.map((seat) => {
                                                const isSelected = selectedSeats.includes(seat.id);
                                                const isBooked = Math.random() > 0.8;

                                                return (
                                                    <motion.button
                                                        key={seat.id}
                                                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                                                            isBooked ? 'bg-red-500/20 cursor-not-allowed' :
                                                            isSelected ? 'bg-[rgb(195,187,175)] text-black' :
                                                            seat.type === 'VIP' ? 'bg-[rgb(195,187,175)]/20 hover:bg-[rgb(195,187,175)]/30' :
                                                            seat.type === 'Комфорт' ? 'bg-blue-400/20 hover:bg-blue-400/30' :
                                                            'bg-white/10 hover:bg-white/20'
                                                        }`}
                                                        whileHover={!isBooked ? { scale: 1.1 } : undefined}
                                                        whileTap={!isBooked ? { scale: 0.95 } : undefined}
                                                        onClick={() => {
                                                            if (!isBooked) {
                                                                setSelectedSeats(prev =>
                                                                    isSelected
                                                                        ? prev.filter(id => id !== seat.id)
                                                                        : [...prev, seat.id]
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        {seat.id.slice(1)}
                                                    </motion.button>
                                                );
                                            })}
                                        </div>
                                        <span className="text-white/40 w-6 text-left">
                                            {String.fromCharCode(65 + rowIndex)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6">
                        {/* Order summary */}
                        <div className="space-y-4">
                            <div className="bg-white/5 rounded-xl p-4 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-white/60">Дата</span>
                                    <span className="text-white">{format(selectedDate!, 'dd.MM.yyyy')}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white/60">Час</span>
                                    <span className="text-white">{selectedTime}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white/60">Місця</span>
                                    <span className="text-white">{selectedSeats.join(', ')}</span>
                                </div>
                                <div className="pt-4 border-t border-white/10">
                                    <div className="flex justify-between items-center">
                                        <span className="text-white">Всього до сплати</span>
                                        <span className="text-xl font-semibold text-[rgb(195,187,175)]">
                                            {getTotalPrice()} грн
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative w-full max-w-4xl bg-black/80 border border-white/[0.08] rounded-2xl p-6 overflow-hidden"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white/60 hover:text-white"
                        >
                            <FiX className="w-6 h-6" />
                        </button>

                        {/* Header */}
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-white mb-2">
                                Бронювання квитків
                            </h2>
                            <p className="text-white/60">{movieTitle}</p>
                        </div>

                        {/* Steps */}
                        <div className="flex items-center gap-2 mb-8">
                            {[1, 2, 3].map((s) => (
                                <div
                                    key={s}
                                    className={`h-2 rounded-full transition-all ${
                                        s === step ? 'w-8 bg-[rgb(195,187,175)]' :
                                        s < step ? 'w-8 bg-[rgb(195,187,175)]/60' :
                                        'w-2 bg-white/20'
                                    }`}
                                />
                            ))}
                        </div>

                        {/* Content */}
                        <div className="space-y-8">
                            {renderContent()}

                            {/* Navigation */}
                            <div className="flex justify-between pt-6 border-t border-white/10">
                                <Button
                                    variant="ghost"
                                    onClick={() => step > 1 ? setStep(step - 1) : onClose()}
                                    className="text-white/60 hover:text-white"
                                >
                                    {step > 1 ? 'Назад' : 'Скасувати'}
                                </Button>
                                <Button
                                    onClick={() => {
                                        if (step < 3) {
                                            setStep(step + 1);
                                        } else {
                                            // Handle booking completion
                                            console.log('Booking completed!');
                                            onClose();
                                        }
                                    }}
                                    disabled={
                                        (step === 1 && (!selectedDate || !selectedTime)) ||
                                        (step === 2 && selectedSeats.length === 0)
                                    }
                                    className="bg-[rgb(195,187,175)] hover:bg-white/20 text-black"
                                >
                                    {step === 3 ? 'Підтвердити' : 'Далі'}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default BookingModal;
