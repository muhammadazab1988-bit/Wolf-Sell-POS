import Image from "next/image";

type ProductCardProps = {
  name: string;
  price: number;
  imageUrl: string;
  onBuy: () => void;
};

export default function ProductCard({ name, price, imageUrl, onBuy }: ProductCardProps) {
  return (
    <div className="card bg-black w-full shadow-sm hover:hover-3d">
      <figure className="relative w-auto h-50">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-contain"
        />
      </figure>
      <div className="card-body">
        <h3 className="text-white text-sm">{name}</h3>
        <h2 className="Price text-3xl">{price} $</h2>
        <div className="card-actions justify-end">
          <button
            onClick={onBuy}
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}