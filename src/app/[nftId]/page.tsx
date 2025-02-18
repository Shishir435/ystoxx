"use client";
import { NFT } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";



interface PageProps {
  params: {
    nftId: string;
  };
}

const Nft = ({ params }: PageProps) => {
  const [nft, setNft] = useState<NFT | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNft() {
      try {
        const response = await axios.get(`/api/nft?nftId=${params.nftId}`);
        if (response.data.success) {
          setNft(response.data.data);
        } else {
          setError(response.data.error);
        }
      } catch (err: any) {
        setError(err.response?.data?.error || "An error occurred.");
      }
    }
    fetchNft();
  }, [params.nftId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!nft) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{nft.name}</h1>
      {/* <img src={nft.image} alt={nft.name} /> */}
      <p>Quantity: {nft.quantity}</p>
      {nft.description && <p>{nft.description}</p>}
    </div>
  );
};

export default Nft;