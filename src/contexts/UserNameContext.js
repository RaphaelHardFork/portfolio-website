import { createContext, useEffect, useState } from "react"
import { useContract, useEVM } from "react-ethers"

export const UserNameContext = createContext(null)

const UserNameProvider = ({ children, contract, goodNetwork }) => {
  const userName = useContract(contract.address, contract.abi)
  const { account } = useEVM()
  const [surname, setSurname] = useState("")

  useEffect(() => {
    const main = async () => {
      if (userName && account.isLogged && goodNetwork) {
        try {
          const walletName = await userName.getName(account.address)
          setSurname(walletName)
        } catch (e) {
          console.log(userName)
          console.log(account.address)
          console.log(e)
        }
      }
    }
    main()

    return () => setSurname("")
  }, [userName, account.address, account.isLogged, goodNetwork])

  return (
    <UserNameContext.Provider value={{ userName, surname }}>
      {children}
    </UserNameContext.Provider>
  )
}

export default UserNameProvider
