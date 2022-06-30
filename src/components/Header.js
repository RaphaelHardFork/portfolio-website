import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react"
import profilPicture from "../assets/profil-picture.png"
import { useLang } from "../hooks/useLang"

const Header = () => {
  const { lang } = useLang()

  return (
    <Box p="10">
      <Flex
        borderRadius="5"
        bg="ecru.600"
        shadow="lg"
        flexDirection={{ base: "column-reverse", md: "row" }}
        justifyContent="space-between"
      >
        <Box ps="5" display="flex">
          <Flex justifyContent="space-between" flexDirection="column">
            <Box>
              <Heading fontFamily="title" fontSize="6xl" as="h1" my="5">
                Raphaël Pellet
              </Heading>
              <Text as="i">
                {lang === "fr"
                  ? "Crois en l'intelligence et la (bio)diversité"
                  : "Believe in intelligence and (bio)diversity"}{" "}
              </Text>
            </Box>
            <Box>
              {lang === "fr" ? (
                <Text fontSize="xl" pb="4" display="block">
                  Développeur <i>Full stack</i> Ethereum
                </Text>
              ) : (
                <Text fontSize="xl" pb="4" display="block">
                  <i>Full stack</i> Ethereum developer
                </Text>
              )}
            </Box>
          </Flex>
        </Box>
        <Image
          borderRadius="5"
          width={{ base: "600px", md: "400px" }}
          src={profilPicture}
        />
      </Flex>
    </Box>
  )
}

export default Header
