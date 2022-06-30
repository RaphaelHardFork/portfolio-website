import {
  Box,
  Container,
  Flex,
  Link,
  Text,
  Image,
  Tooltip,
  useClipboard,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from "@chakra-ui/react"

import { EmailIcon } from "@chakra-ui/icons"
import { FaLinkedin, FaGithub } from "react-icons/fa"
import { AiFillMessage } from "react-icons/ai"
import { useLang } from "../hooks/useLang"

const Footer = () => {
  const { lang } = useLang()
  const { hasCopied, onCopy } = useClipboard("raphael.pellet@protonmail.com")

  return (
    <Flex minW="100%" mt="auto" zIndex={10} bg="blackAlpha.800">
      <Container
        d="flex"
        justifyContent="space-between"
        p="5"
        maxW="container.xl"
      >
        <Box>
          <Text color="white" textAlign="center" fontWeight="bold">
            @Raphaël Pellet
          </Text>
        </Box>
        <Box>
          <Text textAlign="center" fontWeight="bold" color="white">
            {lang === "fr" ? "Créer à l'aide de " : "Made with "}
            <Link
              _hover={{ color: "corail.500" }}
              href="https://chakra-ui.com/"
            >
              ChakraUI
            </Link>
          </Text>
        </Box>
        <Box>
          <Flex alignItems="center" gap="5">
            <Link isExternal href="https://github.com/RaphaelHardFork">
              <Image
                w="2rem"
                h="2rem"
                color="white"
                _hover={{ color: "corail.500" }}
                transition="0.4s"
                as={FaGithub}
              />
            </Link>
            <Link
              isExternal
              href="https://www.linkedin.com/in/rapha%C3%ABl-pellet-blockchain/"
            >
              <Image
                w="2rem"
                h="2rem"
                color="white"
                _hover={{ color: "corail.500" }}
                transition="0.4s"
                as={FaLinkedin}
              />
            </Link>
            <Tooltip
              label={hasCopied ? "Copied" : "raphael.pellet@protonmail.com"}
              aria-label="A tooltip"
              closeOnClick={false}
            >
              <Link>
                <Image
                  w="2rem"
                  h="2rem"
                  color="white"
                  _hover={{ color: "corail.500" }}
                  transition="0.4s"
                  as={EmailIcon}
                  onClick={onCopy}
                />
              </Link>
            </Tooltip>
            <Popover>
              <PopoverTrigger pointerEvents="fill">
                <Link>
                  <Image
                    w="2rem"
                    h="2rem"
                    color="white"
                    _hover={{ color: "corail.500" }}
                    transition="0.4s"
                    as={AiFillMessage}
                  />
                </Link>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverBody fontWeight="bold" fontSize="xl">
                  <Text my="5">
                    Telegram:{" "}
                    <Link isExternal href="https://t.me/Raphael_Pellet">
                      @Raphael_Pellet
                    </Link>
                  </Text>
                  <Text my="5">Discord: ᖇᗩᑭᕼ丅ᗝᑎǤ#8885</Text>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>
        </Box>
      </Container>
    </Flex>
  )
}

export default Footer
