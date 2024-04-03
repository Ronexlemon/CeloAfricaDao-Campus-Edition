import React, { useEffect, useState } from "react";
import { useAccount,useReadContract } from "wagmi";
import { useForm } from "react-hook-form";
import { data } from "@/constant/data";
import MarketCard from "@/components/Card";
import auctionAbi from "../constant/abi/auction.json"
import { AuctionContractAddress } from "@/constant/address";

const Home = () => {
  const { address, isConnected } = useAccount();
  const [userAddress, setUserAddress] = useState("");
  const [isOpen, setOpen] = useState(false);

  const { register, handleSubmit } = useForm();

  const {data:itemdata} = useReadContract({
    abi:auctionAbi,
    address: AuctionContractAddress,
    functionName: 'getAllItems',
  })
  
  console.log("the data is data contract",itemdata)

  const onSubmit = async (formData: any) => {
    console.log(formData);
  };

  useEffect(() => {
    console.log("the data is data contract",itemdata)
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  return (
    <div className="h-full max-w-full relative">
      <div className="w-full h-32 flex justify-end">
        <div className="bg-green-500 rounded-2xl w-28 h-10 flex justify-center text-center">
          <button onClick={() => setOpen(true)} className="text-center">Add</button>
        </div>
      </div>

      {isOpen && (
        <div className="h-1/2 w-full static">
          <div className="w-1/4 h-96 rounded-xl bg-[#000000] right-0 top-0 absolute">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-around h-full">
              <div className="flex justify-around items-center mt-2">
                <label className="text-white">Image</label>
                <input type="file" className="w-1/2 h bg-slate-200" {...register("image", { required: true })} />
              </div>
              <div className="flex justify-around items-center mt-2">
                <label className="text-white">Model</label>
                <input type="text" placeholder="Urus" className="w-1/2 bg-slate-200 text-center" {...register("model", { required: true })} />
              </div>
              <div className="flex justify-around items-center mt-2">
                <label className="text-white">Year</label>
                <input type="text" placeholder="2024" className="w-1/2 bg-slate-200 text-center" {...register("year", { required: true })} />
              </div>
              <div className="flex justify-around items-center mt-2">
                <label className="text-white">Price</label>
                <input type="number" placeholder="$10000" className="w-1/2 bg-slate-200 text-center" {...register("price", { required: true })} />
              </div>
              <div className="flex justify-around items-center mt-2 text-white">
                <div className="flex justify-center items-center text-center bg-red-500 w-16 h-10 rounded-xl">
                  <button onClick={() => setOpen(false)}>Cancel</button>
                </div>
                <div className="flex justify-center items-center text-center bg-green-500 w-16 h-10 rounded-xl">
                  <button type="submit">Submit</button>
                </div>
              </div>
            </form>
          </div>

          
        </div>
      )}
      <div className="w-full">
            <MarketCard data={data} />
          </div>
    </div>
  );
};

export default Home;