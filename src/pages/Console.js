import { Box, Flex } from "@chakra-ui/react"

import Screen from "../components/Screen"
import ERC721Provider from "../contexts/ERC721Context"
import Launcher from "../components/Launcher"
import Menu from "../components/Menu"
import ERC20Provider from "../contexts/ERC20Context"
import UserNameProvider from "../contexts/UserNameContext"
import ERC1155Provider from "../contexts/ERC1155Context"
import { useEVM } from "react-ethers"
import contracts from "../contexts/contracts.json"

export function selectContract(contracts, chainId, contractName) {
  const { ropsten, rinkeby } = contracts
  switch (chainId) {
    case 3:
      return ropsten[contractName]
    case 4:
      return rinkeby[contractName]
    default:
      return rinkeby[contractName]
  }
}

const Console = () => {
  const { network } = useEVM()

  return (
    <>
      <UserNameProvider
        contract={selectContract(contracts, network.chainId, "UserName")}
      >
        <ERC1155Provider
          contract={selectContract(contracts, network.chainId, "Cards")}
        >
          <ERC721Provider
            contract={selectContract(
              contracts,
              network.chainId,
              "ColoredToken"
            )}
          >
            <ERC20Provider
              contract={selectContract(
                contracts,
                network.chainId,
                "FungibleToken"
              )}
              shopAddr={
                selectContract(contracts, network.chainId, "Shop").address
              }
            >
              <Box
                fontFamily="mono"
                fontSize="xl"
                minH="100vh"
                flexDirection="column"
                display="flex"
              >
                <Launcher />
                <Flex flexGrow="1">
                  <Menu />
                  <Screen />
                </Flex>
              </Box>
            </ERC20Provider>
          </ERC721Provider>
        </ERC1155Provider>
      </UserNameProvider>
    </>
  )
}

export default Console
