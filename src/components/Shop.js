import {
  Box,
  Flex,
  FormLabel,
  Heading,
  Input,
  Link,
  Select,
  Text,
} from "@chakra-ui/react"
import { ethers } from "ethers"
import { useState } from "react"
import { useContract, useEVM } from "react-ethers"
import { useUserName } from "../hooks/useUserName"
import ContractButton from "./ContractButton"

const Shop = ({ contract, userColor, erc20, erc20Info, inventory }) => {
  const { network } = useEVM()
  const shop = useContract(contract.address, contract.abi)
  const { userName, surname: _surname } = useUserName()

  const [color, setColor] = useState("#000000")
  const [surname, setSurname] = useState(_surname)
  const [available, setAvailable] = useState("")
  const [booster, setBooster] = useState(0)

  return shop ? (
    <>
      {/* CONTRACT INFO */}
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <Text>
            Contract Info:{" "}
            <Link href={`${network.explorerUrl + shop.address}`} isExternal>
              {shop.address}
            </Link>
          </Text>
          <Text>The shop can spend {erc20Info.shopAllowance} of your FT.</Text>
        </Box>
        <ContractButton
          contractFunc={() =>
            erc20.approve(shop.address, ethers.utils.parseEther("50"))
          }
        >
          Allow shop to spend for 50 FT
        </ContractButton>
      </Flex>

      <Flex
        mx="auto"
        justifyContent="space-around"
        flexDirection="column"
        p="10"
        textAlign="center"
      >
        <Heading fontSize="6xl" fontFamily="console">
          Welcome to the shop
        </Heading>
        <Text>You can buy several type of tokens</Text>

        {/* COULEUR */}
        <Flex textAlign="start" flexDirection="column" mt="10">
          <Text>
            Choose and mint your unique color among the 16,777,215 colors
            available ! Issues an ERC721 (NFT), you can own only one by wallet.
            Transfer it if you want another one or you can burn it by donate
            some value to the contract.
          </Text>
          <Flex alignItems="center" my="5">
            <FormLabel me="20">
              {userColor.haveColor ? (
                <Text color="red.400">You already have a color.</Text>
              ) : (
                <Text>Choose a color (cost: 12 FT)</Text>
              )}
              <Input
                disabled={userColor.haveColor}
                maxW="5rem"
                onChange={(e) => {
                  setColor(e.target.value)
                }}
                type="color"
                value={color}
              />
            </FormLabel>
            <ContractButton
              contractFunc={() => shop.buyColor(color.replace("#", "0x"))}
              isDisabled={userColor.haveColor}
            >
              Mint the {color}
            </ContractButton>
          </Flex>
        </Flex>

        {/* NAMES */}
        <Flex textAlign="start" flexDirection="column" mt="10">
          <Text>
            Change your name an the console (this contract do not issue any
            tokens).
          </Text>
          <Flex alignItems="center" my="5">
            <FormLabel me="20">
              {!surname ? (
                <Text>Enter a name (cost: 4 FT)</Text>
              ) : (
                <Text>Change your name (cost: 4 FT)</Text>
              )}

              <Input
                onBlur={async () => {
                  const name = await userName.resolveName(surname)
                  setAvailable(name)
                }}
                maxW="10rem"
                onChange={(e) => {
                  setSurname(e.target.value)
                }}
                bg="white"
                type="text"
                value={surname}
                placeholder="Entrer un nom"
              />
            </FormLabel>
            <ContractButton
              contractFunc={() => shop.buyName(surname)}
              isDisabled={
                !surname || available !== ethers.constants.AddressZero
              }
            >
              Save "{surname}"
            </ContractButton>
            <Text ms="5">
              {!surname
                ? ""
                : available === ethers.constants.AddressZero
                ? "Name available"
                : `Owned by ${available}`}
            </Text>
          </Flex>
        </Flex>

        {/* CARDS */}
        <Flex textAlign="start" flexDirection="column" mt="10">
          <Text>
            Buy a card booster, these boosters contain 5 cards, some of which
            are rare. The booster must be burned by the shop to redeem your
            cards.
          </Text>
          <Flex my="5" flexDirection="column">
            <Flex alignItems="center">
              <Text me="5">Buy a booster (cost: 8 FT)</Text>
              <ContractButton contractFunc={() => shop.buyBooster()}>
                Grab a booster
              </ContractButton>
            </Flex>
            <Text color="gray" me="5">
              You have {inventory.boosters.amount.length} booster(s)
            </Text>
          </Flex>
          <Flex my="5" alignItems="center">
            <FormLabel d="flex" flexDirection="column" me="20">
              Enter the number of your booster to open.
              <Select
                placeholder={
                  !inventory.boosters.amount.length
                    ? "No booster to open"
                    : "Select booster ID"
                }
                bg="white"
                disabled={!inventory.boosters.amount.length}
                onChange={(e) => {
                  setBooster(e.target.value)
                }}
              >
                {inventory.boosters.amount.map((booster) => {
                  return (
                    <option key={booster} value={booster}>
                      {booster}
                    </option>
                  )
                })}
              </Select>
            </FormLabel>
            <ContractButton
              isDisabled={!inventory.boosters.amount.length}
              contractFunc={() => shop.openBooster(booster)}
            >
              Open the #{booster} booster
            </ContractButton>
          </Flex>
        </Flex>
      </Flex>
    </>
  ) : (
    "Loading..."
  )
}
export default Shop
