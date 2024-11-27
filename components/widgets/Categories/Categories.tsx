import { MagicCard } from "@/components/ui/magic-card";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import { VelocityScroll } from "@/components/ui/scroll-based-velocity";

const categories = [
    { id: 1, title: "Екшен", image: "/Action.png" },
    { id: 2, title: "Комедія", image: "/Comedy.png" },
    { id: 3, title: "Драма", image: "/Drama.png" },
    { id: 4, title: "Ужас", image: "/Horror.png" },
    { id: 5, title: "Фантастика", image: "/Adventure.png" },
];

const Categories = () => {
    return (
        <div className="container mx-auto mb-20">
            <div className="flex flex-col gap-2 mb-10">
                <VelocityScroll
                    text="КАТЕГОРІЇ"
                    default_velocity={2}
                    className="font-display text-center text-4xl font-black tracking-[-0.02em] text-black drop-shadow-sm dark:text-[#C3BBAF] md:text-7xl md:leading-[5rem]"
                />
                <p className="w-[70%] text-white/60">
                    Зі StreamVibe ви можете насолоджуватися улюбленими фільмами та
                    телешоу будь-де і будь-коли. Наша платформа сумісна з широким спектром
                    пристроїв, що гарантує, що ви ніколи не пропустите жодної розважальної
                    миті.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {categories.map(({ id, title, image }) => (
                    <MagicCard
                        key={id}
                        className="cursor-pointer px-5 py-4 flex flex-col items-center justify-center shadow-2xl text-4xl"
                        gradientColor="#313131"
                    >
                        <div className="flex flex-col gap-5 items-center">
                            <img src={image} alt={title} className="" />
                            <div className="flex justify-between items-center w-full">
                                <p className="text-[18px] font-semibold">{title}</p>
                                <Button variant="secondary" size="icon">
                                    <ChevronRight />
                                </Button>
                            </div>
                        </div>
                    </MagicCard>
                ))}
            </div>
        </div>
    );
};

export default Categories;
