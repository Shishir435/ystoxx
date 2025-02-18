import {
  Card
} from "@/components/ui/card";
import type { NFT } from "@prisma/client";
import Link from "next/link";

const NftCard = ({ id, image, name, quantity }: NFT) => {
  return (
    <Link href={`/${id}`}>
    <Card className="relative rounded-xl w-[240px] h-[250px] overflow-hidden">
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="absolute inset-0 bg-cover bg-center"
      />
      <div className="absolute bottom-2 z-10 flex justify-between w-full  p-2">
          <p className="text-white">{name}</p>
          <p className="text-white">{quantity}</p>
      </div>
    </Card>
    </Link>
  );
};

export default NftCard;