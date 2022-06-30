import { createContext, useEffect, useState } from "react"
import { useContract, useEVM } from "react-ethers"

export const ERC721Context = createContext(null)

const ERC721Provider = ({ children, contract, goodNetwork }) => {
  const token = useContract(contract.address, contract.abi)
  const { account } = useEVM()
  const [userColor, setUserColor] = useState({
    haveColor: false,
    color: "#000000",
  })

  useEffect(() => {
    // check user balance and get tokenID
    const main = async () => {
      let tokenId
      const balance = await token.balanceOf(account.address)

      if (balance.toString() !== "0") {
        const enters = await token.queryFilter(
          token.filters.Transfer(null, account.address, null)
        )
        tokenId = enters[enters.length - 1].args.tokenId.toHexString()
      }

      if (tokenId) {
        setUserColor({ haveColor: true, color: `#${tokenId.slice(2)}` })
      } else {
        setUserColor({ haveColor: false, color: "#000000" })
      }
    }
    if (account.address && token && goodNetwork) {
      try {
        main()
      } catch (e) {
        console.log(token)
        console.log(account.address)
        console.log(e)
      }
    }
  }, [account.address, token, goodNetwork])

  return (
    <ERC721Context.Provider value={{ token, userColor }}>
      {children}
    </ERC721Context.Provider>
  )
}

export default ERC721Provider
