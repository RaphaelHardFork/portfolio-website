import { Box, Heading, Text } from "@chakra-ui/react"
import { useEVM } from "react-ethers"
import { Route, Routes } from "react-router-dom"
import { useERC20 } from "../hooks/useERC20"

import { useERC721 } from "../hooks/useERC721"
import Dashboard from "./Dashboard"
import ERC20 from "./ERC20"
import ERC721 from "./ERC721"
import Shop from "./Shop"
import { useERC1155 } from "../hooks/useERC1155"
import contracts from "../contexts/contracts.json"
import { selectContract } from "../pages/Console"
import ERC1155 from "./ERC1155"
import NetworkSwitch from "./NetworkSwitch"

const Screen = () => {
  const { network, connectionType, account, haveWebExtension } = useEVM()
  const { token, userColor } = useERC721()
  const { token: erc20, userInfo } = useERC20()
  const { cards, inventory } = useERC1155()

  return (
    <Box
      p="5"
      boxShadow={
        connectionType === "not initialized"
          ? "none"
          : "4px 6px 10px gray inset"
      }
      width="75%"
      bg={connectionType === "not initialized" ? "black" : "gray.100"}
      zIndex={connectionType === "not initialized" ? 5 : 1}
      transition="1s"
    >
      {connectionType === "not initialized" ? (
        haveWebExtension ? (
          <Heading
            fontFamily="mono"
            my="10"
            textAlign="center"
            color="gray.100"
          >
            Start the console!
          </Heading>
        ) : (
          <>
            {/* NO EXTENSION / NOT LAUNCHED */}
            <Heading
              fontFamily="mono"
              my="10"
              textAlign="center"
              color="gray.100"
            >
              Install a web extension to inject the web3
            </Heading>
            <Text textAlign="center" color="gray.100">
              Like Metamask, Brave (in-browser), XDEFI
            </Text>
          </>
        )
      ) : (
        <>
          {network.name !== "Ethereum Rinkeby testnet" &&
          network.name !== "Ethereum Ropsten testnet" ? (
            <>
              <Heading fontFamily="mono" my="10" textAlign="center">
                You are connected on {network.name}
              </Heading>
              <Heading fontFamily="mono" mt="10" textAlign="center">
                Change the network to continue
              </Heading>
              <NetworkSwitch />
            </>
          ) : !account.isLogged ? (
            <>
              <Heading fontFamily="mono" my="10" textAlign="center">
                You are connected on {network.name}
              </Heading>
              <Heading fontFamily="mono" mt="10" textAlign="center">
                Log into the dApp to continue (there is no "read-only" mode)
              </Heading>
            </>
          ) : (
            <>
              {" "}
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route
                  path="erc20"
                  element={
                    erc20 ? (
                      <ERC20 balance={userInfo.balance} token={erc20} />
                    ) : (
                      "Waiting for ERC20 contract"
                    )
                  }
                />
                <Route
                  path="shop"
                  element={
                    network.chainId ? (
                      <Shop
                        contract={selectContract(
                          contracts,
                          network.chainId,
                          "Shop"
                        )}
                        erc20={erc20}
                        erc20Info={userInfo}
                        userColor={userColor}
                        cards={cards}
                        inventory={inventory}
                      />
                    ) : (
                      ""
                    )
                  }
                />
                <Route
                  path="erc721"
                  element={<ERC721 contract={token} userInfo={userColor} />}
                />
                <Route
                  path="erc1155"
                  element={<ERC1155 contract={cards} inventory={inventory} />}
                />
              </Routes>
              <Text
                bottom="1rem"
                right="1rem"
                position="absolute"
                ms="auto"
                mt="auto"
                fontWeight="bold"
              >
                {network.blockHeight}
              </Text>
            </>
          )}
        </>
      )}
    </Box>
  )
}

export default Screen
