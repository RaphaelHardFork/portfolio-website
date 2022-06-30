import { Flex, Heading, Link, Text } from "@chakra-ui/react"

import { useEVM } from "react-ethers"
import NetworkSwitch from "./NetworkSwitch"

const Dashboard = () => {
  const { network, account } = useEVM()

  return (
    <>
      <Flex
        mx="auto"
        justifyContent="space-around"
        flexDirection="column"
        p="10"
      >
        <Heading fontSize="6xl" fontFamily="console" mb="5" textAlign="center">
          Dashboard
        </Heading>
        <Text mb="4" fontSize="2xl" fontFamily="mono">
          {network.name}
        </Text>
        <Text mb="6" fontSize="2xl" fontFamily="mono">
          Account:{" "}
          <Link href={`${network.explorerUrl + account.address}`} isExternal>
            {account.address}
          </Link>
        </Text>
      </Flex>
      <NetworkSwitch />
    </>
  )
}

export default Dashboard
