import { ethers } from "ethers"
import { createContext, useEffect, useState } from "react"
import { useContract, useEVM } from "react-ethers"

export const ERC20Context = createContext(null)

const ERC20Provider = ({ children, contract, shopAddr,goodNetwork }) => {
  const { account } = useEVM()
  const token = useContract(contract.address, contract.abi)

  const [userInfo, setUserInfo] = useState({ balance: 0, shopAllowance: 0 })

  useEffect(() => {
    const main = async () => {
      if (token && account.isLogged && goodNetwork) {
        try {
          const rawBalance = await token.balanceOf(account.address)
          const shopAllowance = await token.allowance(account.address, shopAddr)
          setUserInfo({
            balance: Number(ethers.utils.formatEther(rawBalance)),
            shopAllowance: Number(ethers.utils.formatEther(shopAllowance)),
          })
        } catch (e) {
          console.log(token.address)
          console.log(account.address)
          console.log(e)
        }
      }
    }
    main()
  }, [token, account.address, account.isLogged, shopAddr,goodNetwork])

  return (
    <ERC20Context.Provider value={{ token, userInfo }}>
      {children}
    </ERC20Context.Provider>
  )
}

export default ERC20Provider
