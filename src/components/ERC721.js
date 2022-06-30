import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react"
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { useEVM } from "react-ethers"
import ContractButton from "./ContractButton"

const ERC721 = ({ contract, userInfo }) => {
  const { account, network } = useEVM()
  const [receiver, setReceiver] = useState("")
  const [totalSupply, setTotalSupply] = useState(0)
  const [value, setValue] = useState(0.00005)

  useEffect(() => {
    const main = async () => {
      if (contract) {
        const mints = await contract.queryFilter(
          contract.filters.Transfer(ethers.constants.AddressZero, null, null)
        )
        setTotalSupply(() => mints.length)
      }
    }
    main()

    return () => setTotalSupply(0)
  }, [contract])

  return (
    <>
      <Text>
        Contract Info:{" "}
        <Link href={`${network.explorerUrl + contract.address}`} isExternal>
          {contract.address}
        </Link>
      </Text>

      <Flex
        mx="auto"
        justifyContent="space-around"
        flexDirection="column"
        p="10"
      >
        <Heading fontSize="6xl" fontFamily="console" mb="5" textAlign="center">
          Colored Token (COLOR)
        </Heading>
        <Text mb="5" textAlign="center">
          These tokens are ERC721 (NFT), there are 16,777,215 units, this figure
          corresponds to the existing color number (0xFFFFFF). Each address
          (wallet) can only hold one of these tokens. So you have to part with
          it to get a new one.
        </Text>
        <Text textAlign="center" fontWeight="bold" mb="20">
          Available tokens: {16777215 - totalSupply} / 16777215
        </Text>

        <Heading fontFamily="mono" mb="5">
          Your token:
        </Heading>
        {userInfo.haveColor ? (
          <Text fontSize="lg" fontWeight="bold" mb="20">
            Your color is the{" "}
            <Text as="span" color={userInfo.color}>
              {userInfo.color.toUpperCase()}
            </Text>
          </Text>
        ) : (
          <Text fontSize="lg" fontWeight="bold" mb="20">
            You don't have any color, buy one in the shop.
          </Text>
        )}

        {/* BURN */}
        <Heading fontFamily="mono" mb="5">
          Burn your color (minimum cost: 0.00005 ETH)
        </Heading>
        <FormControl mb="4">
          <FormLabel>Value to send</FormLabel>
          <Flex>
            <Input
              onChange={(e) => setValue(e.target.value)}
              value={value}
              bg="white"
              type="number"
              step="0.0005"
              min="0.00005"
              me="5"
              maxW="50%"
            />
            <ContractButton
              contractFunc={() =>
                contract.burnColor(userInfo.color.replace("#", "0x"), {
                  value: ethers.utils.parseEther(value),
                })
              }
              isDisabled={!userInfo.haveColor}
            >
              Burn your token
            </ContractButton>
          </Flex>
        </FormControl>

        {/* TRANSFER */}
        <Heading fontFamily="monospace" mb="5">
          Transfer your token
        </Heading>
        <FormControl mb="4">
          <FormLabel>Destination address</FormLabel>
          <Flex>
            <Input
              onChange={(e) => setReceiver(e.target.value)}
              placeholder="0x0000..."
              value={receiver}
              bg="white"
              me="5"
              maxW="50%"
            />
            <ContractButton
              contractFunc={() =>
                contract["safeTransferFrom(address,address,uint256)"](
                  account.address,
                  receiver,
                  userInfo.color.replace("#", "0x")
                )
              }
              isDisabled={receiver.length !== 42 || !userInfo.haveColor}
            >
              Transfer your token
            </ContractButton>
          </Flex>
        </FormControl>
      </Flex>
    </>
  )
}
export default ERC721
