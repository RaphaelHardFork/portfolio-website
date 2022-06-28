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
            Contract Info:
            <Link href={`${network.explorerUrl + shop.address}`} isExternal>
              {shop.address}
            </Link>
          </Text>
          <Text>
            Le magasin peut utiliser {erc20Info.shopAllowance} de vos FT
          </Text>
        </Box>
        <ContractButton
          contractFunc={() =>
            erc20.approve(shop.address, ethers.utils.parseEther("50"))
          }
        >
          Authorisez le magasin pour 50 FT
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
          Bienvenue au magasin
        </Heading>
        <Text>Vous pouvez acheter plusieurs tokens</Text>

        {/* COULEUR */}
        <Flex textAlign="start" flexDirection="column" mt="10">
          <Text>
            Offrez-vous une couleur unique parmi les 16 777 215 de couleur
            disponible ! Emet un ERC721 (NFT), vous ne pouvez en posseder qu'un
            seul par wallet. Transferez-le si vous en voulez une autre.
          </Text>
          <Flex alignItems="center" my="5">
            <FormLabel me="20">
              {userColor.haveColor ? (
                <Text color="red.400">Vous avez déjà une couleur</Text>
              ) : (
                <Text>Choisissez une couleur (cout : 12 FT)</Text>
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
              Minter le {color}
            </ContractButton>
          </Flex>
        </Flex>

        {/* NAMES */}
        <Flex textAlign="start" flexDirection="column" mt="10">
          <Text>
            Changer votre nom sur la console (ce contrat n'emet aucun jeton).
          </Text>
          <Flex alignItems="center" my="5">
            <FormLabel me="20">
              {!surname ? (
                <Text>Entrer un nom (cout : 4 FT)</Text>
              ) : (
                <Text>Changer de nom (cout : 4 FT)</Text>
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
              Enregistrer "{surname}"
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
            Achetez un booster de cartes, le booster doit être ensuite échanger
            pour recevoir les cartes
          </Text>
          <Flex my="5" flexDirection="column">
            <Flex alignItems="center">
              <Text me="5">Acheter un booster (coût : 8 FT)</Text>
              <ContractButton contractFunc={() => shop.buyBooster()}>
                Get a booster
              </ContractButton>
            </Flex>
            <Text color="gray" me="5">
              Vous avez {inventory.boosters.amount.length} booster(s)
            </Text>
          </Flex>
          <Flex my="5" alignItems="center">
            <FormLabel d="flex" flexDirection="column" me="20">
              Entrez le numéro de votre booster
              <Select
                placeholder="Sélectionnez l'ID du booster"
                bg="white"
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
            <ContractButton contractFunc={() => shop.openBooster(booster)}>
              Open your booster the #{booster} booster
            </ContractButton>
          </Flex>
        </Flex>
      </Flex>
    </>
  ) : (
    "Loading"
  )
}
export default Shop
