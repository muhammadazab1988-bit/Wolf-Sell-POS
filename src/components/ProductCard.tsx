import Image from "next/image";

export default function ProductCard() {
  return (
    <div className="card bg-black w-full shadow-sm hover:hover-3d">
      <figure className="relative w-auto h-50">
        <Image
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
          fill
          className="object-contain"
        />
      </figure>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div className="card-body">
        <h2 className="Price text-3xl">25 $</h2>
        <div className="card-actions justify-end">
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
