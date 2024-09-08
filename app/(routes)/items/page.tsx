'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ShoppingBasket } from 'lucide-react';
import Image from 'next/image';
const Items = () => {
  // Addd functionality to fetch data data from api/shopping?page=1 on initial load and when the user clicks the next or previous page buttons.
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const [cartData, setCartData] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(`/api/shopping?page=${currentPage}`);
      const data = await response.json();
      setItems(data.data);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
      console.log('response', data)
    };
    fetchItems();
  }, [currentPage]);

  const handleNextPage = async () => {
    if (currentPage < totalPages) {
      setCurrentPage((currentPage) => currentPage + 1);
    }
  };

  const handlePrevPage = async () => {
    if (currentPage > 1) {
      setCurrentPage((currentPage) => currentPage - 1);
    }
  };
  interface Item {
    id: number,
    image: string,
    name: string,
    cost: number,
    qty: number,
    itemNumber: number
  }
  const ShoppingItem = ({item}:{item : Item}) => {
    const handleAddToCart = async (itemNumber : number) => {
      console.log('itemNumber', itemNumber);
      const payload = { itemNumber: itemNumber };
      await fetch('/api/shopping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    };

    return (
      <Card >
        <CardDescription>
        <Image src={item.image} alt={item.name} width="50" height="50" />
          <p>Cost: ${item.cost}</p>
          <p>Qty: {item.qty} lbs</p>
          <Button
            data-itemNumber={item.itemNumber}
            onClick={() =>
              handleAddToCart(item.itemNumber)
            }
          ><ShoppingBasket />
          </Button>
        </CardDescription>
      </Card>
    );
  };
  return (
    <div className="mx-20 my-20">
      <div className="grid gap-10 grid-cols-3 grid-rows-3 flex justify-center w-full">
        {items.map((item) => (
          <ShoppingItem key={item.id} item={item} />
        ))}
      </div>
      <div className="flex justify-center w-full my-10">
          <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          aria-label="Previous Page">
              <ChevronLeft className="h-4 w-4" />
          </Button>
          {currentPage} / {totalPages}&nbsp;&nbsp;&nbsp;
          <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          aria-label="Next Page">
              <ChevronRight className="h-4 w-4" />
          </Button>
      </div>
    </div>
  );
};

export default Items;
