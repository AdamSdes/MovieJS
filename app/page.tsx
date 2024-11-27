import TopFilm from "@/components/widgets/Top/Top";
import Categories from "@/components/widgets/Categories/Categories";
import MarqueeDemo from "@/components/widgets/MovieLogo/MovieLogo";
import Header from "@/components/widgets/Header/Header";
import {Button} from "@/components/ui/button";


export default function Home() {
  return (
      <div>
          <Header/>
          <TopFilm/>
          <Categories/>
          <MarqueeDemo/>
          <div className="container border border-white/5 rounded-[16px] flex px-20 items-center justify-between mt-[100px] mb-[100px] mx-auto h-[286px] bg-cover bg-center bg-[url('/score.png')]">
              <div className="flex flex-col gap-3">
                  <p className='text-[30px] font-black'>Start your free trial today!</p>
                  <p className='text-[16px] opacity-70'>This is a clear and concise call to action that encourages users to sign up for a free trial of StreamVibe.</p>
              </div>
              <Button className='p-7 rounded-full font-semibold'>Долучитись</Button>
          </div>
      </div>
  );
}
