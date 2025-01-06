import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";

const reviews = [
    {
        body: "Netflix",
        img: "https://avatar.vercel.sh/jack",
    },
    {
        body: "Warner Bros.",
        img: "https://avatar.vercel.sh/jill",
    },
    {
        body: "Disney",
        img: "https://avatar.vercel.sh/john",
    },
    {
        body: "Universal Pictures",
        img: "https://avatar.vercel.sh/jane",
    },
    {
        body: "Paramount Pictures",
        img: "https://avatar.vercel.sh/jenny",
    },
    {
        body: "20th Century Studios",
        img: "https://avatar.vercel.sh/james",
    },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
    img,
    body,
}: {
    img: string;
    body: string;
}) => {
    return (
        <figure
            className={cn(
                "relative w-64 cursor-pointer overflow-hidden rounded-xl p-4",
                // dark styles
                "dark:bg-[rgba(255,255,255,0.03)] dark:hover:bg-gray-50/[.15]"
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <img className="rounded-full" width="32" height="32" alt="" src={img} />
                <blockquote className="text-sm">{body}</blockquote>
            </div>
        </figure>
    );
};

export function MarqueeDemo() {
    return (
        <div className="relative flex mb-5 w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl">
            <div className="w-full h-[1px] bg-white/5 mb-20"></div>
            <p className="font-bold text-[20px] mb-5">Студії з якими ми співпрацюємо</p>
            <Marquee pauseOnHover className="[--duration:20s]">
                {firstRow.map((review, index) => (
                    <ReviewCard key={index} {...review} />
                ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
            <div className="w-full h-[1px] bg-white/5 mt-20"></div>
        </div>
    );
}

export default MarqueeDemo;
