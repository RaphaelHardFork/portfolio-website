import { Box, Button, Select, Text } from "@chakra-ui/react"
import { useState } from "react"
import { useEVM } from "react-ethers"

const NetworkSwitch = () => {
  const { network, methods } = useEVM()
  const [destination, setDestination] = useState(4)

  return (
    <Box p="10">
      <Text mb="4" fontSize="2xl" fontFamily="mono">
        Change network
      </Text>
      <Select
        my="4"
        bg="white"
        maxW="25%"
        colorScheme="duck"
        fontSize="xl"
        placeholder="Choose a network"
        onChange={(e) => setDestination(e.target.value)}
      >
        <option disabled={network.chainId === 4} value="4">
          Rinkeby
        </option>
        <option disabled={network.chainId === 3} value="3">
          Ropsten
        </option>
        <option disabled={true} value="1">
          Aurora
        </option>
        <option disabled={network.chainId === 137} value="89">
          Polygon
        </option>
      </Select>
      <Button
        onClick={() => methods.switchNetwork(destination)}
        colorScheme="duck"
      >
        Change network
      </Button>
    </Box>
  )
}

export default NetworkSwitch
