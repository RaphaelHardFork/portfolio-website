import { Box, Flex, Heading, Link, Spacer, Text } from "@chakra-ui/react"
import { useState } from "react"
import { useEffect } from "react"
import { useEVM } from "react-ethers"

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

const ERC1155 = ({ contract, inventory }) => {
  const { network } = useEVM()
  const [distribution, setDistribution] = useState({
    remainingBooster: 1998,
    cards: [],
  })

  useEffect(() => {
    const main = async () => {
      if (contract) {
        const remainingBooster = (await contract.remainingBooster()).toNumber()

        const cardsRequest = []
        for (let i = 1; i <= 108; i++) {
          cardsRequest.push(contract.totalSupply(i))
          // const supply = await contract.totalSupply(i)
          // cards.push(supply.toNumber())
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
                  <Box
                    shadow="md"
                    borderRadius="5"
                    p="3"
                    color={indexToValue(index).color}
                    bg={card ? "white" : "white.400"}
                    key={index}
                  >
                    {indexToValue(index).text}
                  </Box>
                )
              })}
              <Spacer />
            </Flex>
          </>
        )}
      </Flex>
    </>
  )
}

export default ERC1155
