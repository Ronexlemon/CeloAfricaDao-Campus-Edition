import { ethers } from "ethers";
import React from "react";

export type CardData = {
  itemId: number;
  imageUrl: string;
  itemOwner:string,
  model: string;
  year: string;
  price: number;
  sold: boolean;
};

export type CardProps = {
  data: CardData[];
  onRemove: (itemId: number) => void;
};

const AccountCard: React.FC<CardProps> = ({ data,onRemove}) => {
  return (
    <div className="card-container grid grid-cols-3 gap-8 w-full">
      {data.map((item, index) => (
        <div key={index} className="h-80 w-80 bg-white rounded-xl flex flex-col overflow-hidden">
          <img src={item.imageUrl} alt="" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="model text-xl font-semibold mb-2 truncate">{item.model}</h2>
            <div className="flex justify-between">
            <p className="year">Year: {item.year}</p>
            <p className="price">Price: ${(ethers.utils.formatEther(item.price))}</p>
            <div className=" flex justify-center items-center w-20 h-10 bg-black rounded-xl ">
            <button className=" text-white w-20  "onClick={() => onRemove(Number(item.itemId))}>Remove</button>
          </div>
            </div>
            
          </div>
         
        </div>
      ))}
    </div>
  );
};

export default AccountCard;
