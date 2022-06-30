import { Box, Button, Flex, Heading, Image, Link, Text } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import oz from "../assets/openzeppelin.png"
import ozUp from "../assets/openzeppelin-up.png"
import erc20 from "../assets/ERC20.png"
import erc721 from "../assets/ERC721.png"
import erc1155 from "../assets/ERC1155.png"
import erc777 from "../assets/ERC777.png"
import erc2771 from "../assets/ERC2771.png"
import { useLang } from "../hooks/useLang"

const standards = [
  {
    img: oz,
    description: "Librairie de Ssart contracts",
    title: "OpenZeppelin",
  },
  {
    img: ozUp,
    description: "Librairie de smart contract améliorable (UUPS)",
    title: "OpenZeppelin Upgradeable",
  },
  {
    img: erc20,
    description: "Jeton fongible",
    title: "ERC20",
  },
  {
    img: erc777,
    description: "Jeton fongible avec opérateur",
    title: "ERC777",
  },
  { img: erc721, description: "Jeton non fongible", title: "ERC721" },
  {
    img: erc1155,
    description: "Jeton hybride (collections)",
    title: "ERC1155",
  },
  {
    img: erc2771,
    description: "Contrat transitaire pour les meta-transactions",
    title: "ERC2771",
  },
]

const Standards = () => {
  const { lang } = useLang()
  return (
    <>
      <Heading fontFamily="title" as="h1">
        {lang === "fr" ? "Standards utilisés :" : "Standards used:"}
      </Heading>

      <Flex my="5" flexWrap="wrap" gap="5">
        {standards.map((erc) => {
          return (
            <Box
              key={erc.description}
              d="flex"
              flexDirection="column"
              alignItems="center"
              borderRadius="5"
              shadow="md"
              p="5"
              w="12rem"
              transition="0.5s"
              _hover={{ bg: "#FF7F50" }}
            >
              <Image m="auto" src={erc.img} />
              <Text fontSize="md" fontFamily="monospace" mt="auto" as="b">
                {erc.title}
              </Text>
            </Box>
          )
        })}
      </Flex>
      <Button size="lg" fontFamily="monospace" colorScheme="corail">
        <Link as={RouterLink} to="console">
          {lang === "fr" ? "Essayer la console" : "Try the console"}
        </Link>
      </Button>
    </>
  )
}

export default Standards
