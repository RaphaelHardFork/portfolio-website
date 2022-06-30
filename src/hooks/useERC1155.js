import { useContext } from "react"
import { ERC1155Context } from "../contexts/ERC1155Context"

export const useERC1155 = () => {
  const { cards, inventory } = useContext(ERC1155Context)
  if (cards === undefined) {
    throw new Error(
      `It seems that you are trying to use useERC1155 outside of its provider, OR you are on the wrong network`
    )
  }

  return { cards, inventory }
}
