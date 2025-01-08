import HomeInput from "@/components/home-input";
import HomeOutput from "@/components/home-output";
import UserLayout from "@/components/user_layout";

export default function Home() {
  return (
    <UserLayout>
      <div className="flex flex-col px-6 py-8 mx-auto lg:py-0 h-full w-full text-black">
        <div className="flex flex-col mb-5">
          <h1 className="font-bold text-[22px]">Text Summarizer</h1>
          <p className="text-[14px] text-[#0F132499]">Summarize and manage text with ease</p>
        </div>
        <HomeInput />
        <HomeOutput />
      </div>
    </UserLayout>
  );
}
