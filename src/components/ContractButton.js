import { Button, Link, Text, useToast } from "@chakra-ui/react"
import { useState } from "react"

const ContractButton = ({ isDisabled, contractFunc, children }) => {
  const [status, setStatus] = useState("")
  const toast = useToast()

  async function contractCall() {
    try {
      setStatus("Waiting for confirmation")
      const tx = await contractFunc()
      setStatus("Pending")
      await tx.wait()
      setStatus("Success")
      toast({
        title: "Transaction success",
        description: (
          <>
            <Text isTruncated>Hash: {tx.hash})</Text>
            <Link
              isExternal
              href={`https://rinkeby.etherscan.io/tx/${tx.hash}`}
            >
              See on Etherscan
            </Link>
          </>
        ),
        status: "success",
        duration: 10000,
        isClosable: true,
      })
    } catch (e) {
      let errorMessage
      console.log(e.code)
      console.log(e.message)

      // Error management need to be improved (add wallet connect & read-only contract)
      switch (e.code) {
        case "UNPREDICTABLE_GAS_LIMIT":
          errorMessage = e.error.message
          break
        case 4001:
          errorMessage = e.message
          break
        case "INVALID_ARGUMENT":
          errorMessage = "Wrong argument: " + e.message
          break
        case "UNSUPPORTED_OPERATION":
          errorMessage = "Wrong setup: " + e.message
          break

        case "INSUFFICIENT_FUNDS":
          errorMessage = "Insufficient funds: " + e.error.message
          break

        case "CALL_EXCEPTION":
          errorMessage = "Wrong network (certainly): " + e.message
          break
        default:
          errorMessage = "unknown error"
          break
      }
      setStatus("Failed")
      toast({
        title: "Transaction failed",
        description: errorMessage,
        status: "error",
        duration: 7000,
        isClosable: true,
      })
    }
  }

  return (
    <Button
      colorScheme="duck"
      isLoading={status === "Waiting for confirmation" || status === "Pending"}
      loadingText={status}
      disabled={
        isDisabled ||
        status === "Waiting for confirmation" ||
        status === "Pending"
      }
      onClick={contractCall}
    >
      {children}
    </Button>
  )
}

export default ContractButton
