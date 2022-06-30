import {
  Box,
  Divider,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react"
import { useLang } from "../hooks/useLang"

const Vision = () => {
  const { lang } = useLang()
  return (
    <>
      <Heading
        fontFamily="title"
        fontSize="7xl"
        mt="10rem"
        color="#FF7F50"
        as="h1"
      >
        {lang === "fr" ? "Ma vision" : "My vision"}
      </Heading>
      <Divider
        my="3"
        width="75%"
        size="50%"
        borderColor="#FF7F50"
        borderBottomWidth="0.125rem"
      />
      <Box mt="4" fontSize="xl" lineHeight="8">
        {lang === "fr" ? (
          <Text>
            On est tous attaché à notre morceau de vérité, laissez moi vous
            exposer le mien au travers de trois sujets :{" "}
            <b>l'économie circulaire, la connaissance et la liberté.</b>
          </Text>
        ) : (
          <Text>
            We are all attached to our piece of truth, let me tell you mine
            through three topics:{" "}
            <b>the circular economy, knowledge and freedom.</b>
          </Text>
        )}
      </Box>

      {/* CIRCULAR ECONOMY */}
      <Heading fontFamily="title" as="h2" mt="6">
        {lang === "fr" ? "L’économie circulaire" : "Circular economy"}
      </Heading>
      {lang === "fr" ? (
        <>
          <Text mt="4" fontSize="xl" lineHeight="8">
            Depuis la révolution industrielle, l’Humain a développé un modèle
            industriel linéaire et standardisé sur la plupart des filières (de
            l’alimentation à la haute technologie) où l'une des seules variables
            d’ajustements est les économies d’échelles (menées par la
            compétition) avec comme finalité une déflation des produits et
            services les plus mondialisés. Or ce modèle est en total
            contradiction avec le modèle qu’utilise la Nature, un modèle qui a
            bénéficié de 3.8 milliards d’années de recherche et développement,
            en voici quelques illustrations :
          </Text>
          <UnorderedList ps="3">
            <ListItem mb="3" fontSize="xl" lineHeight="8">
              <i>
                Les feuilles tombées des arbres sont les nutriments pour les
                êtres vivant du sol.
              </i>{" "}
              Dans la Nature tout processus est cyclique, les déchets des uns
              sont systématiquement les matières premières des autres.
            </ListItem>
            <ListItem mb="3" fontSize="xl" lineHeight="8">
              <i>
                Le thon à évoluer en organisant son réseau vasculaire de façon à
                conserver la chaleur au centre de son corps pour accroître sa
                vitesse.
              </i>{" "}
              La Nature se bat continuellement contre l'entropie, toute perte
              énergétique est minimisée.
            </ListItem>
            <ListItem mb="3" fontSize="xl" lineHeight="8">
              <i>
                Les plantes ne peuvent pas assimiler l'azote présent dans l'air,
                un problème surmonté chez certaines plantes (les légumineuses)
                par une association avec des bactéries pour fixer l'azote dans
                l'air.
              </i>{" "}
              Bien que la compétition et le parasitisme existent dans la Nature,
              le modèle largement retenu est la coopération.
            </ListItem>
            <ListItem mb="3" fontSize="xl" lineHeight="8">
              <i>
                L’ADN, avec sa machinerie, permet de stocker toute l’information
                nécessaire pour reproduire des êtres vivants semblables
                utilisant les mêmes stratégies que leurs ancêtres sans faire
                tourner un seul serveur.
              </i>{" "}
              La Nature est constituée de hautes technologies.
            </ListItem>
          </UnorderedList>
          <Text mt="4" fontSize="xl" lineHeight="8">
            L’économie circulaire est la porte d’entrée vers l’abondance
            (énergétique, alimentaire, …) et la Nature nous offre des outils,
            des savoirs, des compétences pour s’orienter vers ce modèle.
          </Text>

          <Text color="#FF7F50" fontSize="xl" display="block" mt="6" as="i">
            Alors pourquoi ignorer cela ? Pourquoi mépriser à ce point la Nature
            ?
          </Text>
        </>
      ) : (
        <>
          <Text mt="4" fontSize="xl" lineHeight="8">
            Since the industrial revolution, humans have developed a linear and
            standardized industrial model in most sectors (from food to high
            technology) where one of the only adjustment variables is economies
            of scale (driven by competition) with the aim of deflating the most
            globalized products and services. However, this model is in total
            contradiction with the model used by Nature, a model that has
            benefited from 3.8 billion years of research and development, here
            are some illustrations:
          </Text>
          <UnorderedList ps="3">
            <ListItem mb="3" fontSize="xl" lineHeight="8">
              <i>
                The leaves fallen from the trees are the nutrients for the
                living beings of the soil.
              </i>{" "}
              In Nature every process is cyclical, the waste of some is
              systematically the raw materials of others.
            </ListItem>
            <ListItem mb="3" fontSize="xl" lineHeight="8">
              <i>
                Tuna to evolve by organizing its vascular network in such a way
                as to retain heat in the center of its body to increase its
                speed.
              </i>{" "}
              Nature continually fights against entropy, any energy loss is
              minimized.
            </ListItem>
            <ListItem mb="3" fontSize="xl" lineHeight="8">
              <i>
                Plants cannot assimilate nitrogen from the air, a problem
                overcome in some plants (legumes) by association with bacteria
                to fix nitrogen in the air.
              </i>{" "}
              Although competition and parasitism exist in Nature, the widely
              accepted model is cooperation.
            </ListItem>
            <ListItem mb="3" fontSize="xl" lineHeight="8">
              <i>
                DNA, with its machinery, makes it possible to store all the
                information necessary to reproduce similar living beings using
                the same strategies as their ancestors without running any
                server.
              </i>{" "}
              Nature is made up of high technologies.
            </ListItem>
          </UnorderedList>
          <Text mt="4" fontSize="xl" lineHeight="8">
            The circular economy is the gateway to abundance (energy, food,
            etc.) and Nature offers us tools, knowledge and skills to move
            towards this model.
          </Text>

          <Text color="#FF7F50" fontSize="xl" display="block" mt="6" as="i">
            So why ignore this? Why despise Nature so much?
          </Text>
        </>
      )}

      {/* KNOWLEDGE */}
      <Heading fontFamily="title" as="h2" mt="6">
        {lang === "fr" ? "La connaissance" : "Knowledge"}
      </Heading>
      {lang === "fr" ? (
        <>
          <Text mt="4" fontSize="xl" lineHeight="8">
            La science est malheureusement parasitée par son système de
            publication, j'ai arrêté ma thèse en partie car les perspectives
            d’avenir d’un chercheur son lestées par ce lourd système qui n'a que
            très peu évolué malgré la transition numérique.
          </Text>
          <Text mt="4" fontSize="xl" lineHeight="8">
            Ceci est dû à son modèle économique qui est basé traditionnellement
            sur l’abonnement, payer pour lire des contenus scientifiques. Ce
            modèle est en transition vers le nouveau modèle de l’OpenAccess,
            payer pour publier. Je parle de parasitisme, car les laboratoires
            (financés par le public et/ou le privé) subissent une triple
            ponction de leur financement par le système de publication :
          </Text>
          <UnorderedList ps="3">
            <ListItem mb="3" fontSize="xl" lineHeight="8">
              Ils payent l'abonnement aux revues scientifiques que lisent les
              chercheurs pour créer et proposer de nouveaux énoncés
              scientifiques.
            </ListItem>
            <ListItem mb="3" fontSize="xl" lineHeight="8">
              Ils payent pour publier leurs résultats en accès libre dans ces
              revues. La carrière des chercheurs est très dépendante de leurs
              publications, notamment basée sur le prestige associé à certaines
              revues de grand nom.
            </ListItem>
            <ListItem mb="3" fontSize="xl" lineHeight="8">
              Les revues scientifiques recourent à la validation par les pairs
              (peer-reviewing) pour vérifier les résultats scientifiques avant
              publication. Ils invitent, sur la base du volontariat, les
              chercheurs experts dans un domaine pour fournir ce travail, une
              dépense de temps payée par les laboratoires non-négligeable.
            </ListItem>
          </UnorderedList>
          <Text mt="4" fontSize="xl" lineHeight="8">
            Aujourd’hui la quantité de connaissance scientifique augmente
            beaucoup plus vite que l’accès physique et intellectuel à celle-ci.
            Creusant ainsi l’écart entre le monde scientifique et celui du grand
            public, un écart qui devient problématique, car il participe à
            augmenter la défiance de la population envers la science.
          </Text>
          <Text mt="4" fontSize="xl" lineHeight="8">
            Or le temps et l’argent parasité par le système de publication
            scientifique seraient très précieux dans la transmission et la
            vulgarisation de ces savoirs (tant à l’échelle du chercheur que du
            laboratoire). Les efforts de vulgarisation ne sont que très peu
            considérés dans la carrière d’un chercheur ou bien l’attribution de
            financement pour le laboratoire.
          </Text>
          <Text color="#FF7F50" fontSize="xl" display="block" mt="6" as="i">
            Aurons-nous le courage de retirer ce parasite et investir
            intelligemment dans la production et le partage de connaissances ?
          </Text>
        </>
      ) : (
        <>
          <Text mt="4" fontSize="xl" lineHeight="8">
            Science is unfortunately parasitized by its publication system, I
            stopped my thesis in part because the future prospects of a
            researcher are weighed down by this cumbersome system which has
            changed very little despite the digital transition.
          </Text>
          <Text mt="4" fontSize="xl" lineHeight="8">
            This is due to its economic model which is traditionally based on
            subscription, paying to read scientific content. This model is in
            transition to a new model of OpenAccess, pay to publish. I refer to
            parasitism, because the laboratories (funded by public and/or
            private sector) suffer a triple puncture of their funding by the
            publication system:
          </Text>
          <UnorderedList ps="3">
            <ListItem mb="3" fontSize="xl" lineHeight="8">
              They pay for the subscription to scientific journals that
              researchers read to create and propose new scientific statements.
            </ListItem>
            <ListItem mb="3" fontSize="xl" lineHeight="8">
              They pay to publish their results in open access in these
              journals. The career of researchers is very dependent on their
              publications, in particular based on the prestige associated with
              certain big-name journals.
            </ListItem>
            <ListItem mb="3" fontSize="xl" lineHeight="8">
              Scientific journals use peer-reviewing to verify scientific
              results before publication. They invite, on a voluntary basis,
              researchers who are experts in a field to provide this work, a
              non-negligible expenditure of time paid by the laboratories.
            </ListItem>
          </UnorderedList>
          <Text mt="4" fontSize="xl" lineHeight="8">
            Today the amount of scientific knowledge is growing much faster than
            the physical and intellectual access to it. Thus widening the gap
            between the scientific world and the general public, a gap that
            becomes problematic, because it contributes to increasing the
            population's distrust of science.
          </Text>
          <Text mt="4" fontSize="xl" lineHeight="8">
            However, the time and money parasitized by the scientific
            publication system would be very valuable in the transmission and
            popularization of this knowledge (both at the level of the
            researcher and the laboratory). Outreach and popularization efforts
            are given very little consideration in a researcher's career or the
            allocation of laboratory funding.
          </Text>
          <Text color="#FF7F50" fontSize="xl" display="block" mt="6" as="i">
            Shall we have the courage to remove this parasite and invest smartly
            in the production and sharing of knowledge?
          </Text>
        </>
      )}

      {/* LIBERTY */}
      <Heading fontFamily="title" as="h2" mt="6">
        {lang === "fr" ? "La liberté" : "Liberty"}
      </Heading>
      {lang === "fr" ? (
        <>
          <Text mt="4" fontSize="xl" lineHeight="8">
            De Edward Snoden aux cypherpunks comme Satoshi Nakamoto, j’ai pris
            conscience du combat que mènent les défenseurs de la liberté, un
            combat dangereux mais essentiel pour ne pas tomber dans un scénario
            hollywoodien.
          </Text>
          <Text mt="4" fontSize="xl" lineHeight="8">
            La liberté des individus est fortement corrélée à la créativité,
            l’entraide, l’ouverture d’esprit, ainsi la liberté est un élément
            important d'un société productive et bien organisée. Ce constat m'a
            éclairé sur l'importance de l'anonymat dans une société : le partage
            d'idées, de passion, d'arts, ... se produisent d'une manière
            beaucoup spontannée sans crainte de jugement de la part des autres.
            Dans le même temps, cela réduit les potentiels effets de connivence,
            notamment dans les domaines où les cercles sont plus restreints,
            j'ai pour exemple le manque d'anonymat dans la validation par les
            pairs d'un article scientifique d'un domaine très spécifique en
            science.
          </Text>
          <Text mt="4" fontSize="xl" lineHeight="8">
            La crise sanitaire a malheureusement fait reculer la liberté des
            individus de manière plus ou moins violente selon les pays, et
            l’extrapolation de cette situation nous montre une société assez
            effrayante, où la plupart de nos traits personnels (santé,
            comportement, ethnie, …) seraient millimétrés et utilisés (en bien
            ou en mal). Or c'est la reproduction, le brassage génétique, le
            hasard, et la prise de risque qui ont permis à la Nature de survivre
            et s’adapter à son environnement. En essayant de contrôler le
            maximum de paramètres, l’humain pourrait rapidement se retrouver
            affaiblit face à un environnement changeant.
          </Text>
          <Text color="#FF7F50" fontSize="xl" display="block" mt="6" as="i">
            Qu'avons-nous à gagner à réduire les libertés ?
          </Text>
        </>
      ) : (
        <>
          <Text mt="4" fontSize="xl" lineHeight="8">
            From Edward Snoden to cypherpunks like Satoshi Nakamoto, I became
            aware of the fight that defenders of freedom lead, a dangerous but
            essential fight to avoid falling into a Hollywood scenario.
          </Text>
          <Text mt="4" fontSize="xl" lineHeight="8">
            The freedom of individuals is strongly correlated with creativity,
            mutual aid, open-mindedness, so freedom is an important element of a
            productive and well-organized society. This observation enlightened
            me on the importance of anonymity in society: the sharing of ideas,
            passion, arts, ... occurs in a very spontaneous way without fear of
            judgment of others. At the same time, this reduces the potential
            effects of collusion, especially in areas where circles are more
            restricted, for example the lack of anonymity in peer-reviewing of a
            scientific article in a very specific in science.
          </Text>
          <Text mt="4" fontSize="xl" lineHeight="8">
            Measures against global pandemic has unfortunately reduced the
            freedom of individuals in a more or less violent way depending on
            the country, and the extrapolation of this situation shows us a
            rather frightening society, where most of our personal traits
            (health, behavior, ethnicity,.. .) would be measured and used (for
            good or bad). However, it is reproduction, genetic mixing, chance,
            and risk-taking that have enabled Nature to survive and adapt to its
            environment. By trying to control the maximum of parameters, the
            human could quickly find himself weakened in the face of a changing
            environment.
          </Text>
          <Text color="#FF7F50" fontSize="xl" display="block" mt="6" as="i">
            What do we have to gain by reducing freedoms?
          </Text>
        </>
      )}
    </>
  )
}

export default Vision
