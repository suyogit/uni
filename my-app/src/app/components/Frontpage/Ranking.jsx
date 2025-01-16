import Image from "next/image";
import React from "react";
import { FaGreaterThan } from "react-icons/fa";

const Ranking = () => {
  return (
    <div className=" h-[120vh] md:h-screen bg-gradient-to-r flex items-center text-black ">
      <div className="flex items-center max-w-[1600px] mx-auto gap-16  2xl:gap-64 flex-col 2xl:flex-row">
        <div className="flex flex-col items-left sm:items-center md:items-start " >
          <div className="font-poppins text-xl md:text-5xl 2xl:text-7xl font-bold md:font-extrabold leading-9 md:leading-[80px] text-left text-inherit w-[300px] md:w-[400px] mb-4">
            Find The Perfect College For You
          </div>
          <div className="w-[300px] md:w-[600px] text-black text-md md:text-2xl font-bold mb-4">
            Select colleges based on your goals, interests and future
            aspirations
          </div>
          <button className="w-[130px] text-center border border-black rounded-xl  flex items-center justify-center p-2 font-bold">
            View all
            <div className="w-6 h-6 rounded-full bg-black text-white mx-2">
              &gt;
            </div>
          </button>
        </div>
        <div
          className="flex flex-col justify-center rounded-lg "
          style={{
            background:
              "linear-gradient(133.94deg, #FFFFFF 0.51%, #E9E9E9 99.49%)",
            boxShadow: "8px 10px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="flex items-center">
            <Image
              src={"/images/ranking.png"}
              width={100}
              height={100}
              alt="Mero UNI logo"
            />
            <div className="font-extrabold text-2xl">Rankings</div>
          </div>
          <p className="font-semibold w-[300px] md:w-[600px] mx-2">
            1500+ colleges ranked with trusted, student-focused data approved by
            Nepal’s Education Authorities
          </p>
          <div className="flex flex-col gap-4 mx-auto my-8 font-semibold">
            <div className="flex flex-col gap-4 md:flex-row justify-evenly">
              <div className="border border-black rounded-lg text-center p-2 w-[275px] ">
                Top IT COllege in Nepal
              </div>
              <div className="border border-black rounded-lg text-center p-2 w-[275px] ">
                Top Universities in Nepal
              </div>
            </div>
            <div className="flex flex-col md:flex-row  gap-4 justify-evenly">
              <div className="border border-black rounded-lg text-center p-2 w-[275px] ">
                Top Engineering COlleges in Nepal
              </div>
              <div className="border border-black rounded-lg text-center p-2 w-[275px] ">
                Top MBA colleges in Nepal
              </div>
            </div>
            <div className="flex  flex-col md:flex-row gap-4 justify-evenly">
              <div className="border border-black rounded-lg text-center p-2 w-[275px] ">
                Top Medical COlleges in Nepal
              </div>
              <div className="border border-black rounded-lg text-center p-2 w-[275px] ">
                Top Law COlleges in Nepal
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
