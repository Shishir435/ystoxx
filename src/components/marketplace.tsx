import { NFT } from "@prisma/client"
import NftCard from "./nft-card"

interface  MarketplaceProps{
    nfts: NFT[]
}
const Marketplace = ({nfts}:MarketplaceProps) => {
  return (
    <div className="flex flex-wrap gap-4">
        {nfts.map((nft,i)=><NftCard key={i} {...nft} />)}
    </div>
  )
}

export default Marketplace