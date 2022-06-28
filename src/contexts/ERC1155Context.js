import { ethers } from "ethers"
import { createContext, useEffect, useState } from "react"
import { useContract, useEVM } from "react-ethers"

export const ERC1155Context = createContext(null)

const ERC1155Provider = ({ children, contract }) => {
  const cards = useContract(contract.address, contract.abi)
  const { account } = useEVM()
  const [inventory, setInventory] = useState({
    boosters: { amount: [], opened: [] },
    cards: [],
  })

  useEffect(() => {
    const main = async () => {
      // get events
      const singleEntry = await cards.queryFilter(
        cards.filters.TransferSingle(null, null, account.address)
      )
      const batchEntry = await cards.queryFilter(
        cards.filters.TransferBatch(null, null, account.address)
      )
      const singleExit = await cards.queryFilter(
        cards.filters.TransferSingle(null, account.address, null)
      )
      const batchExit = await cards.queryFilter(
        cards.filters.TransferBatch(null, account.address, null)
      )

      // get all id entries
      const ids = []

      for (const entry of singleEntry) {
        ids.push(entry.args.id.toNumber())
      }
      for (const entry of batchEntry) {
        for (const id of entry.args.ids) {
          ids.push(id.toNumber())
        }
      }

      // get full inventory
      let inventory = { boosters: { amount: [], opened: [] }, cards: [] }

      for (const id of ids) {
        if (id > 10000) {
          inventory.boosters.amount.push(id)
        } else {
          const index = inventory.cards.findIndex((card) => card.id === id)
          if (index !== -1) {
            inventory.cards[index].amount++
          } else {
            inventory.cards.push({ id, amount: 1 })
          }
        }
      }
      // sort and filter opened booster
      const exitIds = []
      for (const exit of singleExit) {
        if (exit.args.id > 10000) {
          if (exit.args.to === ethers.constants.AddressZero) {
            inventory.boosters.opened.push(exit.args.id.toNumber())
          }
          inventory.boosters.amount = inventory.boosters.amount.filter(
            (id) => id !== exit.args.id.toNumber()
          )
        } else {
          exitIds.push(exit.args.id.toNumber())
        }
      }
      for (const exit of batchExit) {
        for (const id of exit.args.ids) {
          exitIds.push(id.toNumber())
        }
      }

      for (const id of exitIds) {
        if (id > 10000) {
          inventory.boosters.amount = inventory.boosters.amount.filter(
            (elem) => elem !== id
          )
        } else {
          const index = inventory.cards.findIndex((elem) => elem.id === id)
          if (index !== -1) {
            if (inventory.cards[index].amount === 1) {
              inventory.cards = inventory.cards.filter((card) => card.id !== id)
            } else {
              inventory.cards[index].amount--
            }
          }
        }
      }

      // store
      setInventory(inventory) // check that!
    }
    if (cards) {
      main()
    }
  }, [cards, account.address])

  return (
    <ERC1155Context.Provider value={{ cards, inventory }}>
      {children}
    </ERC1155Context.Provider>
  )
}

export default ERC1155Provider
