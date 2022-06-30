import { Box, Divider, Heading, Link, Text } from "@chakra-ui/react"
import { useLang } from "../hooks/useLang"

const link = {
  ideasoft: (
    <Link _hover={{ color: "#FF7F50" }} href="https://ideasoft.io/">
      IdeaSoft
    </Link>
  ),
  sigma: (
    <Link _hover={{ color: "#FF7F50" }} href="https://sigma.software/ ">
      Sigma Software
    </Link>
  ),
  alyra: (
    <Link _hover={{ color: "#FF7F50" }} href="https://alyra.fr/">
      Alyra
    </Link>
  ),
}

const Background = () => {
  const { lang } = useLang()

  return (
    <>
      <Heading
        fontSize="7xl"
        fontFamily="title"
        color="#FF7F50"
        mt="10rem"
        as="h1"
      >
        {lang === "fr" ? "Mon parcours" : "My background"}
      </Heading>
      <Divider
        my="3"
        width="75%"
        size="50%"
        borderColor="#FF7F50"
        borderBottomWidth="0.125rem"
      />

      {/* IDEASOFT */}
      <Heading fontFamily="title" mt="6" as="h2">
        {lang === "fr"
          ? "Développeur Solidity chez "
          : "Solidity developer at "}
        {link.ideasoft}
      </Heading>
      <Box fontSize="xl" lineHeight="8">
        {lang === "fr" ? (
          <>
            <Text mt="4">
              J’ai travaillé pendant 6 mois chez Ideasoft en tant que
              développeur Solidity. IdeaSoft est une entreprise ukrainienne de
              plus de 150 employés basée (avant la guerre) à Kharkiv. Elle est
              devenu membre du groupe {link.sigma} en 2021
            </Text>
            <Text mt="4">
              Durant cette expérience j’ai été affecté à plusieurs projets sur
              les thématiques de la DeFi (finance décentralisée, plus
              précisément sur l’assurance décentralisée), les noms de domaines
              décentralisés ainsi que sur les NFT (jetons non fongibles).
            </Text>
            <Text mt="4">
              Le département blockchain était composé d’une équipe de 10
              personnes où nous faisons régulièrement des sessions
              d’apprentissage et d’entraide sur Solidity, l’EVM et un peu sur le
              front-end.
            </Text>
          </>
        ) : (
          <>
            <Text>
              I worked for 6 months at Ideasoft as a Solidity developer.
              IdeaSoft is a Ukrainian company with more than 150 employees based
              (before the war) in Kharkiv. It became a member of the{" "}
              {link.sigma} group in 2021.
            </Text>
            <Text mt="4">
              During this experience I was assigned to several projects
              regarding DeFi (decentralized finance, more specifically on
              decentralized insurance), domain names decentralized as well as on
              NFTs (non-fungible tokens).
            </Text>
            <Text mt="4">
              The blockchain department consisted of a team of 10 people where
              we regularly did learning and collaboration sessions on Solidity,
              the EVM and a little on the front end.
            </Text>
          </>
        )}
      </Box>

      {/* ALYRA */}
      <Heading fontFamily="title" mt="6" as="h2">
        {lang === "fr" ? "Apprenant à l’école " : "Student at "}
        {link.alyra}
      </Heading>
      <Box fontSize="xl" lineHeight="8">
        {lang === "fr" ? (
          <>
            <Text mt="4">
              J’ai eu la chance de participer à la dernière session de
              reconversion professionnelle proposée par l’école d’une durée de 6
              mois. Grâce aux trois encadrants, très compétant dans leurs
              domaines respectifs, j’ai pu apprendre le code avec seulement une
              lointaine expérience sur R.
            </Text>
            <Text mt="4">
              Pendant cette formation, j’ai appris la culture du Web et les
              pratiques de travail dans ce domaine (méthode Agile & SCRUM). Nous
              avons pratiqué les bases du développement Web avec HTML, CSS et
              JavaScript ainsi que l’utilisation de GitHub pour les projets
              collaboratifs ou personnel.
            </Text>
            <Text mt="4">
              Avec cette base, nous avons pu explorer des frameworks pour le
              développement front-end avec ReactJS, Bootstrap et Chakra UI.
              Ainsi que le développement back-end avec Node.js et une légère
              initiation à Express.js pour créer des serveurs.
            </Text>
            <Text mt="4">
              Ensuite, nous avons attaqué notre apprentissage sur la blockchain
              par un peu de culture de cet écosystème (Satoshi Nakamoto,
              Bitcoin, Ethereum et son fonctionnement, …). Nous avons eu
              beaucoup de temps de cours sur Solidity et les bonnes pratiques de
              ce langage (notamment l’utilisation d’OpenZeppelin). Dans un
              premier temps, nous utilisions Remix pour écrire et déployer nos
              smart contracts. Et ensuite nous sommes aller plus loin avec
              Hardhat, un outil de développement Ethereum. Avec Hardhat nous
              avons appris à écrire, à l’aide des librairies Waffle et
              Ethers.js, des tests unitaires sur les smart contracts et des
              scripts de déploiement et post-déploiement sur différents réseaux
              EVM.
            </Text>
            <Text mt="4">
              Mis ensemble ces savoirs nous ont permit de présenter un projet
              full-stack en fin de formation, une dApp avec un front-end réalisé
              avec ReactJS relié un back-end sur Ethereum (testnet).
            </Text>
            <Text mt="4">
              En parallèle, la promotion a eu l’occasion de présenter des
              veilles technologiques sur un large panel de sujets.
            </Text>
          </>
        ) : (
          <>
            <Text mt="4">
              I had the chance to participate in the last career change path
              offered by the school for a period of 6 months. Thanks to the
              three very competent supervisors in their respective fields, I was
              able to learn the code with only a distant experience on <b>R</b>.
            </Text>
            <Text mt="4">
              During this training, I learned the culture of the Web and the
              working practices in this field (Agile & SCRUM method). We
              practiced the basics of web development with HTML, CSS and
              JavaScript as well as using GitHub for collaborative or personal
              projects.
            </Text>
            <Text mt="4">
              From this base, we were able to explore frameworks for front-end
              development with ReactJS, Bootstrap and Chakra UI. As well as
              back-end development with Node.js and a slight introduction to
              Express.js to create servers.
            </Text>
            <Text mt="4">
              Then, we began our learning on blockchain by the culture of this
              ecosystem (Satoshi Nakamoto, Bitcoin, Ethereum and its operation,
              …). We spent a lot of time on Solidity and the good practices of
              this language (in particular the use of OpenZeppelin). At first,
              we used Remix to write and deploy our smart contracts. Then we
              went further with Hardhat, an Ethereum development tool. With
              Hardhat we learned to write, using the Waffle and Ethers.js
              libraries, unit tests on smart contracts and deployment and
              post-deployment scripts on different EVM networks.
            </Text>
            <Text mt="4">
              These knowledges put together allowed us to present a full-stack
              project at the end of the training, a dApp with a front-end made
              with ReactJS linked to a back-end on Ethereum (testnet).
            </Text>
            <Text mt="4">
              At the same time, we had the opportunity to present technology
              intelligences on a wide range of subjects.
            </Text>
          </>
        )}
      </Box>

      {lang === "fr" ? (
        <Text mt="10" fontSize="lg" color="#FF7F50">
          <i>Avant le code ma spécialité était la biologie.</i>
        </Text>
      ) : (
        <Text mt="10" fontSize="lg" color="#FF7F50">
          <i>Before the code my specialty was biology.</i>
        </Text>
      )}

      {/* DOCTORAT */}
      {lang === "fr" ? (
        <>
          <Heading fontFamily="title" mt="6" as="h2">
            Doctorant à l'
            <Link
              _hover={{ color: "#FF7F50" }}
              href="https://www.univ-gustave-eiffel.fr/ "
            >
              université Paris-Est
            </Link>
          </Heading>
          <Text mt="4" fontSize="xl" lineHeight="8">
            J’ai été pendant 18 mois en préparation d’un doctorat en Science des
            matériaux à l’IFSTTAR (Institut Français des Sciences et
            Technologies des Transports, de l’Aménagement et des Réseaux)
            maintenant{" "}
            <Link
              _hover={{ color: "#FF7F50" }}
              href="https://www.univ-gustave-eiffel.fr/"
            >
              université Gustave Eiffel
            </Link>
            . Mon sujet de thèse était porté sur la fabrication du béton de
            chanvre, un matériau isolant, plus précisément mon but était
            d’identifier les molécules à l’origine d’un retard de prise du
            ciment une fois mélangé aux copeaux de chanvre.
          </Text>
          <Heading fontFamily="title" mt="6" as="h2">
            Licence et Master à l’
            <Link
              _hover={{ color: "#FF7F50" }}
              href="https://www.univ-lyon1.fr/"
            >
              université Claude Bernard Lyon I
            </Link>
          </Heading>
          <Text mt="4" fontSize="xl" lineHeight="8">
            Mon parcours licence était porté sur l’écologie au sens large, où
            j’ai étudié les mécanismes de l’évolution, l’étude de la
            biodiversité, les méthodes de bio-statistiques (là où j’ai fait mes
            premiers pas avec R), la dynamiques des populations, l’écologie à
            toute les échelles (de l’individu à la biosphère). En master je me
            suis spécialisé sur l’étude des végétaux, avec deux axes de
            compétences : la biochimie (identification des molécules, et
            connaissances des voies métaboliques) et la génétique (étude des
            réseaux de gènes, méthodes de génie génétique, …).
          </Text>
        </>
      ) : (
        <>
          <Heading mt="6" as="h2">
            PhD student at{" "}
            <Link
              _hover={{ color: "#FF7F50" }}
              href="https://www.univ-gustave-eiffel.fr/ "
            >
              Paris-Est university
            </Link>
          </Heading>
          <Text mt="4" fontSize="xl" lineHeight="8">
            I was for 18 months in preparation for a PhD in materials science at
            IFSTTAR (French Institute of Science and Technology for Transport,
            Development and Networks) now{" "}
            <Link
              _hover={{ color: "#FF7F50" }}
              href="https://www.univ-gustave-eiffel.fr/"
            >
              Gustave Eiffel university.
            </Link>
            My thesis subject was focused on the manufacture of hemp concrete,
            an insulating material, more precisely my goal was to identify the
            molecules at the origin of a delay in taking the cement once mixed
            with hemp shavings.
          </Text>
          <Heading mt="6" as="h2">
            Bachelor and Master's degree at{" "}
            <Link
              _hover={{ color: "#FF7F50" }}
              href="https://www.univ-lyon1.fr/"
            >
              Claude Bernard Lyon I university
            </Link>
          </Heading>
          <Text mt="4" fontSize="xl" lineHeight="8">
            My bachelor's degree was focused on ecology in the broad sense,
            where I studied the mechanisms of evolution, the study of
            biodiversity, bio-statistics methods (where I took my first steps
            with R ), population dynamics, ecology at all scales (from the
            individual to the biosphere). In my master's degree, I specialized
            in the study of plants, with two areas of expertise: biochemistry
            (identification of molecules, and knowledge of metabolic pathways)
            and genetics (study of gene networks, genetic engineering methods,
            etc.).
          </Text>
        </>
      )}
    </>
  )
}

export default Background
