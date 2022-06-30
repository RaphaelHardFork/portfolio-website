import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react"
import { FaPowerOff } from "react-icons/fa"
import { useState } from "react"
import { useEVM } from "react-ethers"
import { useERC20 } from "../hooks/useERC20"
import { useERC721 } from "../hooks/useERC721"
import { useUserName } from "../hooks/useUserName"

function networkName(name) {
  switch (name) {
    case "Ethereum Ropsten testnet":
      return "pink.200"
    case "Ethereum Rinkeby testnet":
      return "amber.200"
    case "Polygon mainnet":
      return "purple.200"
    default:
      return "gray.200"
  }
}

const Launcher = () => {
  const { methods, account, connectionType, network, haveWebExtension } =
    useEVM()
  const { userColor } = useERC721()
  const { userInfo } = useERC20()
  const { surname } = useUserName()
  const [showName, setShowName] = useState(false)

  return (
    <Box shadow="lg" zIndex="2">
      <Flex alignItems="center" justifyContent="space-between" px="5" py="10">
        <Heading fontFamily="console" fontSize="7xl">
          Console
        </Heading>
        {connectionType === "not initialized" ? (
          <Button
            size="lg"
            colorScheme={haveWebExtension ? "duck" : "corail"}
            disabled={!haveWebExtension}
            onClick={() => methods.launchConnection("injected")}
            leftIcon={<FaPowerOff />}
          >
            <Text ms="3">Start console</Text>
          </Button>
        ) : account.isLogged ? (
          <>
            <Spacer />
            <Badge
              bg={networkName(network.name)}
              fontSize="lg"
              borderRadius="10"
              p="3"
              me="4"
            >
              {network.name}
            </Badge>
            <Badge bg="ecru.800" fontSize="lg" borderRadius="10" p="3" me="4">
              {userInfo.balance} FT (credits)
            </Badge>
            <Button
              size="lg"
              bgColor={userColor.haveColor ? userColor.color : ""}
              onClick={() => setShowName((p) => !p)}
            >
              {!showName ? account.address : surname ? surname : "No user name"}
            </Button>
          </>
        ) : (
          <Button
            size="lg"
            colorScheme="duck"
            onClick={() => methods.loginToInjected()}
          >
            Login
          </Button>
        )}
      </Flex>
    </Box>
  )
}

export default Launcher
