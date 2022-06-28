import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Spacer,
  Text,
  Tooltip,
} from "@chakra-ui/react"
import { ethers } from "ethers"
import { useState } from "react"
import { useEffect } from "react"
import { useEVM } from "react-ethers"
import ContractButton from "./ContractButton"

function findSymbol(index) {
  if (index >= 53) {
    return " "
  } else if (index >= 40) {
    return "♦️"
  } else if (index >= 27) {
    return "♣️"
  } else if (index >= 14) {
    return "♥️"
  } else {
    return "♠️"
  }
}

function indexToValue(index) {
  const number = "A23456789".split("").concat("10,J,Q,K, ".split(","))
  const stock = index + 1
  let card = { color: "", text: "" }
  if ([53, 54, 107, 108].includes(stock)) {
    card.color = "#000000"
    card.text = "🤡"
  } else if (stock < 55) {
    const symbol = findSymbol(stock)
    if (symbol === "♠️" || symbol === "♣️") {
      card.color = "#000000"
    } else {
      card.color = "#D7443E"
    }
    card.text = `${number[(stock - 1) % 13] + symbol}`
  } else {
    const symbol = findSymbol(stock - 54)
    if (symbol === "♠️" || symbol === "♣️") {
      card.color = "#8C8C8C"
    } else {
      card.color = "#F0C300"
    }
    card.text = `${number[(stock - 55) % 13] + symbol}`
  }

  return card
}

function convertTable(transferList) {
  const output = { ids: [], amounts: [] }

  for (const item of transferList) {
    const index = output.ids.findIndex((i) => i === item)
    if (index !== -1) {
      output.amounts[index]++
    } else {
      output.ids.push(item)
      output.amounts.push(1)
    }
  }

  return output
}

const ERC1155 = ({ contract, inventory }) => {
  const { network, account } = useEVM()
  const [distribution, setDistribution] = useState({
    remainingBooster: 1998,
    cards: [],
  })

  const [toTransfer, setToTransfer] = useState([])
  const [inTransfer, setInTransfer] = useState(false)
  const [receiver, setReceiver] = useState("")

  useEffect(() => {
    const main = async () => {
      if (contract) {
        const remainingBooster = (await contract.remainingBooster()).toNumber()

        const cardsRequest = []
        for (let i = 1; i <= 108; i++) {
          cardsRequest.push(contract.totalSupply(i))
        }
        const cards = (await Promise.all(cardsRequest)).map((supply) =>
          supply.toNumber()
        )

        setDistribution({ remainingBooster, cards })
      }
    }

    main()
    indexToValue()
  }, [contract])

  return (
    <>
      {/* CONTRACT INFO */}
      <Text>
        Contract Info:
        <Link href={`${network.explorerUrl + contract.address}`} isExternal>
          {contract.address}
        </Link>
      </Text>

      {/* HEADER */}
      <Flex
        mx="auto"
        justifyContent="space-around"
        flexDirection="column"
        p="10"
      >
        <Heading fontSize="6xl" fontFamily="console" mb="5" textAlign="center">
          Useless Playing cards (CARDS)
        </Heading>
        <Text mb="20" textAlign="center">
          Voici la collection "Useless (so far) Playing cards". Cette collection
          est constituée de 9990 cartes à jouer dont 9720 (54x180) sont d'une
          rareté commune et 270 (54x5) sont rare. La collection est également
          consituée de boosters (1998) de 5 cartes pour la distribution.
        </Text>

        <Heading fontFamily="mono" mb="5">
          Distribution :
        </Heading>
        {!distribution.cards.length ? (
          "Loading..."
        ) : (
          <>
            <Text>Boosters : {distribution.remainingBooster} / 1998</Text>

            <Flex justifyContent="space-between" my="5" flexWrap="wrap" gap="5">
              {distribution.cards.map((card, index) => {
                return (
                  <Tooltip
                    key={index}
                    label={`${card}/${index < 55 ? "180" : "5"}`}
                    bg={
                      card
                        ? "amber.900"
                        : index < 55
                        ? card === 180
                          ? "duck.500"
                          : ""
                        : card === 5
                        ? "duck.500"
                        : ""
                    }
                  >
                    <Box
                      shadow="md"
                      borderRadius="5"
                      cursor="default"
                      p="3"
                      color={indexToValue(index).color}
                      bg={card ? "white" : "white.400"}
                    >
                      {indexToValue(index).text}
                    </Box>
                  </Tooltip>
                )
              })}
              <Spacer />
            </Flex>
          </>
        )}

        {/* INVENTORY */}
        <Heading fontFamily="mono" mt="5">
          Inventaire :
        </Heading>
        {/* CARDS */}
        <Flex
          alignItems="center"
          justifyContent="space-between"
          my="5"
          flexWrap="wrap"
          gap="5"
        >
          <Heading fontFamily="mono" fontSize="2xl">
            Cartes :
          </Heading>
          {inventory.cards.map((card) => {
            return (
              <Tooltip label={card.amount} key={card.id}>
                <Box
                  cursor={
                    inTransfer
                      ? toTransfer.filter((elem) => elem === card.id).length >=
                        card.amount
                        ? "no-drop"
                        : "pointer"
                      : "default"
                  }
                  bg={
                    toTransfer.filter((elem) => elem === card.id).length >=
                    card.amount
                      ? "gray.400"
                      : "white"
                  }
                  shadow="md"
                  borderRadius="5"
                  onClick={() => {
                    setToTransfer((t) => {
                      if (!inTransfer) return t
                      if (
                        toTransfer.filter((elem) => elem === card.id).length >=
                        card.amount
                      )
                        return t
                      return [...t, card.id]
                    })
                  }}
                  p="3"
                  color={indexToValue(card.id - 1).color}
                >
                  {indexToValue(card.id - 1).text}
                </Box>
              </Tooltip>
            )
          })}
          <Spacer />
        </Flex>

        {/* BOOSTER */}
        <Flex
          alignItems="center"
          justifyContent="space-between"
          my="5"
          flexWrap="wrap"
          gap="5"
        >
          <Heading fontFamily="mono" fontSize="2xl">
            Boosters :
          </Heading>
          {inventory.boosters.amount.map((booster) => {
            return (
              <Tooltip key={booster} label={booster}>
                <Box
                  cursor={
                    inTransfer
                      ? toTransfer.filter((elem) => elem === booster).length >=
                        1
                        ? "no-drop"
                        : "pointer"
                      : "default"
                  }
                  minH="3rem"
                  minW="2.5rem"
                  shadow="md"
                  onClick={() => {
                    setToTransfer((t) => {
                      if (!inTransfer) return t
                      if (
                        toTransfer.filter((elem) => elem === booster).length >=
                        1
                      )
                        return t
                      return [...t, booster]
                    })
                  }}
                  borderRadius="5"
                  p="3"
                  bg="duck.500"
                ></Box>
              </Tooltip>
            )
          })}
          {inventory.boosters.opened.map((opened) => {
            return (
              <Tooltip label={opened} key={opened}>
                <Box
                  minH="3rem"
                  minW="2.5rem"
                  shadow="md"
                  opacity="0.4"
                  bg="duck.50"
                  borderRadius="5"
                  p="3"
                ></Box>
              </Tooltip>
            )
          })}
          <Spacer />
        </Flex>

        {/* TRANSFER */}
        <Button
          mt="10"
          onClick={() =>
            setInTransfer((a) => {
              setToTransfer([])
              return !a
            })
          }
          colorScheme={inTransfer ? "corail" : "duck"}
        >
          {inTransfer ? "Annuler le transfer" : "Transférer des cartes"}
        </Button>
        {!inTransfer ? (
          ""
        ) : (
          <>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              my="5"
              flexWrap="wrap"
              gap="5"
            >
              <Heading fontFamily="mono" fontSize="2xl" mt="5">
                A transférer :
              </Heading>
              {toTransfer.map((item, index) => {
                return (
                  <Tooltip key={index}>
                    <Box
                      cursor="pointer"
                      minH="3rem"
                      minW="2.5rem"
                      shadow="md"
                      borderRadius="5"
                      onClick={() =>
                        setToTransfer((p) => p.filter((elem) => elem !== item))
                      }
                      p="3"
                      color={indexToValue(item - 1).color}
                      bg={item > 10000 ? "duck.500" : "white"}
                    >
                      {item > 10000 ? "" : indexToValue(item - 1).text}
                    </Box>
                  </Tooltip>
                )
              })}
              <Spacer />
            </Flex>
          </>
        )}

        {/* INPUT FOR TRANSFER */}
        {!inTransfer ? (
          ""
        ) : (
          <>
            <FormControl my="5">
              <FormLabel>Adresse de réception :</FormLabel>
              <Input
                onChange={(e) => setReceiver(e.target.value)}
                bg="white"
                placeholder="0x0000..."
              />
            </FormControl>
            <ContractButton
              contractFunc={() =>
                contract.safeBatchTransferFrom(
                  account.address,
                  receiver,
                  convertTable(toTransfer).ids,
                  convertTable(toTransfer).amounts,
                  ethers.utils.id("")
                )
              }
              isDisabled={receiver.length !== 42 || toTransfer.length === 0}
            >
              Transférer
            </ContractButton>
          </>
        )}
      </Flex>
    </>
  )
}

export default ERC1155
