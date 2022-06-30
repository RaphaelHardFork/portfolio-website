import { Box, Link, Spacer } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"

const modules = [
  { path: "", display: "Dashboard" },
  { path: "erc20", display: "ERC20" },
  { path: "shop", display: "Shop" },
  { path: "erc721", display: "ERC721" },
  { path: "erc1155", display: "ERC1155" },
]

const Menu = () => {
  return (
    <Box d="flex" flexDirection="column" width="25%">
      {modules.map((elem) => {
        return (
          <Link
            textAlign="center"
            _hover={{ textDecoration: "none" }}
            minW="100%"
            key={elem.path}
            to={elem.path}
            as={RouterLink}
          >
            <Box
              transition="0.1s"
              mx="auto"
              py="3"
              _hover={{ bg: "duck.50", color: "white" }}
            >
              {elem.display}
            </Box>
          </Link>
        )
      })}
      <Spacer />
      <Link
        textAlign="center"
        _hover={{ textDecoration: "none" }}
        minW="100%"
        to="/"
        as={RouterLink}
        mx="auto"
      >
        <Box
          py="3"
          transition="0.1s"
          mx="auto"
          _hover={{ bg: "corail.500", color: "white" }}
        >
          Quit console
        </Box>
      </Link>
    </Box>
  )
}

export default Menu
