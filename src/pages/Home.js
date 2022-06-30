import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import Background from "../components/Background"
import Header from "../components/Header"
import Standards from "../components/Standards"
import Technos from "../components/Technos"
import Vision from "../components/Vision"
import { useLang } from "../hooks/useLang"
import { ReactComponent as france } from "../assets/france.svg"
import { ReactComponent as uk } from "../assets/united-kingdom.svg"
import Footer from "../components/Footer"
import { useState } from "react"

const modalbody_fr = (
  <ModalBody>
    <Text color="gray.500">
      Cette définition est donnée dans la documentation du <b>protocole RGB</b>
    </Text>
    <Text textAlign="justify" my="20" fontSize="xl" lineHeight="10">
      Afin de comprendre le concept d'un contrat intelligent, il faut changer
      d'état d'esprit - de penser à l'informatique, à la blockchain et aux
      transactions pour se souvenir du fonctionnement du monde physique, des
      personnes qui interagissent et se prouvent quelque chose les unes aux
      autres. <b>Imaginez qu'il n'y a pas d'ordinateurs</b>, qu'ils n'existent
      pas. Après avoir conçu l'interaction entre les humains et la façon dont
      ils peuvent prouver quelque chose dans des environnements sans confiance
      ou anonymes, la question de la numériser en concevant des protocoles qui
      peuvent l'adapter au monde informatique et à Internet devient simplement
      une question d'application. Vous devez d'abord faire les choses,
      c'est-à-dire concevoir la théorie des jeux entre humains et seulement
      ensuite consacrer du temps à envisager les possibilités de l'informatique
      pour la faire fonctionner sous forme numérique. [...]
    </Text>
    <Text textAlign="justify" my="20" fontSize="xl" lineHeight="10">
      Alors, qu'est-ce qu'un contrat intelligent dans cette perspective ? Le
      contrat intelligent est le moyen de faire respecter un certain accord
      entre les humains sans une agence centralisée externe (militaire,
      gouvernement, tribunal, etc.). Disons que vous n'avez pas de contrat
      physique et que les parties prenantes sont anonymes, ce qui signifie que
      vous ne pouvez pas utiliser la force physique pour les obliger à respecter
      l'accord. Si, dans ces conditions, il existe des incitations économiques à
      faire en sorte que l'accord se réalise sans appliquer aucune application
      physique, <b>alors ceci est un contrat intelligent</b>. Comme vous pouvez
      le voir, cela n'a rien à voir avec l'informatique en soi. L'informatique
      peut aider à résoudre la partie cryptographique de la situation, peut
      rendre le travail sur Internet plus efficace et ne nécessitant pas de
      présence physique, mais elle ne peut pas résoudre les problèmes de théorie
      des jeux. Pour cela, vous devez d'abord utiliser l'économie. Et si vous
      analysez les contrats intelligents de ce point de vue, vous comprendrez
      que vous devez distinguer beaucoup de choses, par exemple les droits de
      propriété (propriété de différents actifs définis dans ce contrat) des
      états du contrat (sous quelles conditions le contrat existe actuellement,
      comme chaque contrat entre humains définit certaines, appelons-les,
      machines à états). Ainsi on peut dire que le contrat définit un algorithme
      événement-conséquence « si ceci arrive alors cela arrive ». Et bien sûr,
      chacun de ces algorithmes doit également suivre certaines règles de
      vérification. [...]
    </Text>
    <Text my="5" as="b">
      Source :{" "}
      <Link
        fontWeight="normal"
        href="https://www.rgbfaq.com/rgb-smart-contracts/what-is-a-smart-contract"
        isExternal
      >
        https://www.rgbfaq.com/rgb-smart-contracts/what-is-a-smart-contract
      </Link>
    </Text>
  </ModalBody>
)

const modalbody_en = (
  <ModalBody>
    <Text color="gray.500">
      This definition is given in the <b>RGB protocol</b> documentation
    </Text>
    <Text textAlign="justify" my="20" fontSize="xl" lineHeight="10">
      In order to understand the concept of a smart contract one has to make a
      shift in their mindset - from thinking about Computer Science, blockchain,
      transactions to remembering how physical world works, about people
      interacting and proving something to each other.{" "}
      <b>Imagine that there are no computers</b>, they don't exist. After you
      design the interaction between humans and the way they can prove something
      in trustless or anonymous environments, the matter of digitalizing it by
      designing protocols that can fit it into computer and internet world
      becomes simply a question of application. You have to do first things
      first, meaning to design the game theory between humans and only then put
      time into contemplating computer science possibilities to make it work in
      digital form. [...]
    </Text>
    <Text textAlign="justify" my="20" fontSize="xl" lineHeight="10">
      So, what is a smart contract in this perspective? Smart contract is the
      way to enforce the fulfillment of a certain agreement between humans
      without an external centralized agency (military, government, court etc).
      Say, you don't have a physical contract and the parties of the agreement
      are anonymous, meaning you can't use physical force to make them follow
      the agreement. If in these conditions there are economical incentives to
      make the fulfillment of the agreement happen without applying any physical
      enforcement - <b>this is what a smart contract is</b>. As you can see, it
      has nothing to do with Computer Science per se. Computer Science can help
      to solve cryptographic part of the situation, can make it more efficient
      working over Internet and not requiring physical presence, but it can't
      solve the game theory problems. For that you need to use economics first.
      And if you analyse the smart contracts from that perspective, you will
      understand that you have to distinguish many things, for example ownership
      rights (ownership of different assets defined under that conctract) from
      the contract states (under which conditions the contract exists currently,
      as each contract between humans defines certain, let's call them, state
      machines). Thus we can say that the contract defines an event-consequence
      algorithm 'if this happens then that happens'. And of course, each of
      these algorithms also needs to follow certain verification rules. [...]
    </Text>
    <Text my="5" as="b">
      Source:{" "}
      <Link
        fontWeight="normal"
        href="https://www.rgbfaq.com/rgb-smart-contracts/what-is-a-smart-contract"
        isExternal
      >
        https://www.rgbfaq.com/rgb-smart-contracts/what-is-a-smart-contract
      </Link>
    </Text>
  </ModalBody>
)

const Home = () => {
  const { lang, setLang } = useLang()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [color, setColor] = useState("ecru.300")

  return (
    <>
      <Container maxW={"container.xl"}>
        <Header />
        <Flex>
          <Button
            mx="auto"
            borderRadius="200"
            h="5rem"
            colorScheme="amber"
            variant="outline"
            onClick={() => setLang((l) => (l === "fr" ? "en" : "fr"))}
          >
            <Image w="3rem" as={lang === "fr" ? uk : france} />
          </Button>
        </Flex>

        <Divider
          mx="auto"
          my="3"
          width="75%"
          size="50%"
          borderColor="#FF7F50"
          borderBottomWidth="0.125rem"
        />
        {/* SENTENCE */}
        {lang === "fr" ? (
          <>
            <Text fontWeight="bold" px="4rem" fontSize="2xl" textAlign="center">
              Je développe des{" "}
              <Text
                _hover={{ fontSize: "1.6rem" }}
                transition="ease-in-out 0.2s"
                cursor="pointer"
                onClick={onOpen}
                as="i"
                color="#FF7F50"
              >
                smart contracts
              </Text>{" "}
              avec le langage Solidity et les déploie sur la plupart des réseaux
              qui utilise l'EVM
            </Text>
          </>
        ) : (
          <>
            <Text fontWeight="bold" px="4rem" fontSize="2xl" textAlign="center">
              I code{" "}
              <Text
                _hover={{ fontSize: "1.6rem" }}
                transition="ease-in-out 0.2s"
                cursor="pointer"
                onClick={onOpen}
                as="i"
                color="#FF7F50"
              >
                smart contracts
              </Text>{" "}
              with the Solidity language and deploy them on most networks that
              use the EVM
            </Text>
          </>
        )}

        {/* SMART CONTRACT MODAL */}
        <Modal size="5xl" isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent
            bg={color}
            onMouseLeave={() => setColor("ecru.600")}
            onMouseEnter={() => setColor("ecru.300")}
            transition="ease-out 0.5s"
            borderRadius="20"
            border="solid 10px white"
            pb="10"
          >
            {lang === "fr" ? (
              <ModalHeader fontFamily="mono" fontSize="4xl">
                Définition d'un <i>smart contract</i> (ou contrat intelligent)
              </ModalHeader>
            ) : (
              <ModalHeader fontFamily="mono" fontSize="4xl">
                Smart contract definition
              </ModalHeader>
            )}
            {lang === "fr" ? modalbody_fr : modalbody_en}
          </ModalContent>
        </Modal>

        <Divider
          mx="auto"
          my="3"
          width="75%"
          size="50%"
          borderColor="#FF7F50"
          borderBottomWidth="0.125rem"
        />

        {/* BODY */}
        <Box p="10">
          <Technos />
          <Standards />
          <Background />
          <Vision />
        </Box>
      </Container>
      {/* FOOTER */}
      <Footer />{" "}
    </>
  )
}

export default Home
