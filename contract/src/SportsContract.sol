// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract AuctionMarketPlace{
//struct to define item details
struct AuctionItem{
    uint  itemId;
    address itemOwner;
    string imageUrl;
    string year;
    string model;
    uint price;
    bool  sold;


}
//item index
uint256 itemIndex;

//mapping a uint to item
mapping(uint => AuctionItem)public auctionitem;

//function AddItem
function addItem(string memory _imageUrl,string memory _year,string memory _model,uint256 _price)external{
    uint newItemIndex = itemIndex;
    auctionitem[newItemIndex] = AuctionItem({itemId:newItemIndex,itemOwner:msg.sender,imageUrl:_imageUrl,year:_year,model:_model,price:_price,sold:false});
    
    itemIndex ++;

}

//function all readItem

function getAllItems()public view returns(AuctionItem[] memory items ){
   //AuctionItem[] memory items = new AuctionItem[](itemIndex); or this way
   items = new AuctionItem[](itemIndex);

    for(uint i=0;i < itemIndex;++i){
        items[i] = auctionitem[i];
    }
    return items;
}


// read myitems
function myItems(address _ownerAddress)public view returns(AuctionItem[] memory myitems ){
    uint count=0;
    for (uint i=0;i <itemIndex;++i){
        if(auctionitem[i].itemOwner == _ownerAddress){
            count ++;

        }
    }

     myitems = new AuctionItem[](count);
    uint index=0;

    for(uint i=0; i < itemIndex;++i){
        if(auctionitem[i].itemOwner == _ownerAddress){
            myitems[index] = auctionitem[i];
            index ++;

        }

    }
    return myitems;

   
}

//function to delete an item

// Function to delete an item
    function removeItem(uint256 index) public {
        require(index < itemIndex, "Index out of bounds");
        require(auctionitem[index].itemOwner == msg.sender, "You are not the owner of this item");

        // Shift items in the mapping to fill the gap left by the deleted item
        for (uint i = index; i < itemIndex - 1; i++) {
            auctionitem[i] = auctionitem[i + 1];
        }
        
        // Delete the last item in the mapping
        delete auctionitem[itemIndex - 1];
        
        // Decrement itemIndex
        itemIndex--;
    }

    //function buy item

    function buyItem(uint amount,uint _index)public payable {
        require(msg.value >= amount,"no amout");
        auctionitem[_index].sold = true;
    }
}