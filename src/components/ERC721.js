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
        Contract Info:
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
          Ces jetons sont des ERC721 (NFT), il en existe 16 777 215 unité, ce
          chiffre correspond au nombre de couleur existante (0xFFFFFF). Chaque
          adresse (wallet) ne peut détenir qu'un seul de ces jetons. Vous devez
          donc vous en séparer pour en avoir un nouveau.
        </Text>
        <Text textAlign="center" fontWeight="bold" mb="20">
          Nombre de jetons disponible : {16777215 - totalSupply} / 16777215
        </Text>

        <Heading fontFamily="mono" mb="5">
          Votre token :
        </Heading>
        {userInfo.haveColor ? (
          <Text fontSize="lg" fontWeight="bold" mb="20">
            Votre couleur est le{" "}
            <Text as="span" color={userInfo.color}>
              {userInfo.color.toUpperCase()}
            </Text>
          </Text>
        ) : (
          <Text fontSize="lg" fontWeight="bold" mb="20">
            Vous n'avez pas de couleur, achetez en une dans le magasin
          </Text>
        )}

        {/* BURN */}
        <Heading fontFamily="mono" mb="5">
          Brûler votre couleur
        </Heading>
        <FormControl mb="4">
          <FormLabel>Montant associé (min 0.00005 ETH)</FormLabel>
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
          Transférer votre couleur
        </Heading>
        <FormControl mb="4">
          <FormLabel>Adresse de reception</FormLabel>
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
