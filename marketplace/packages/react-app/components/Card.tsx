import React from "react";

export type CardData = {
  imageUrl: string;
  itemOwner:string,
  model: string;
  year: string;
  price: number;
  sold: boolean;
};

export type CardProps = {
  data: CardData[];
};

const MarketCard: React.FC<CardProps> = ({ data }) => {
  return (
    <div className="card-container grid grid-cols-3 gap-8 w-full">
      {data.map((item, index) => (
        <div key={index} className="h-80 w-80 bg-white rounded-xl flex flex-col overflow-hidden">
          <img src={item.imageUrl} alt="" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="model text-xl font-semibold mb-2 truncate">{item.model}</h2>
            <div className="flex justify-between">
            <p className="year">Year: {item.year}</p>
            <p className="price">Price: ${Number(item.price)}</p>
            <div className=" flex justify-center items-center w-12 h-10 bg-black rounded-xl ">
            <button className=" text-white  ">BUY</button>
          </div>
            </div>
            
          </div>
         
        </div>
      ))}
    </div>
  );
};

export default MarketCard;
