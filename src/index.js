import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { EVMContext } from "react-ethers"
import { BrowserRouter as Router } from "react-router-dom"
import { styles } from "./theme/index"

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={extendTheme(styles)}>
      <EVMContext
        customNetworks={[
          {
            name: "Aurora Mainnet",
            chainId: 1313161554,
            blockHeight: 0,
            publicEndpoints: ["https://mainnet.aurora.dev"],
            explorerUrl: "https://aurorascan.dev/",
          },
          {
            name: "Aurora Testnet",
            chainId: 1313161555,
            blockHeight: 0,
            publicEndpoints: ["https://testnet.aurora.dev"],
            explorerUrl: "https://testnet.aurorascan.dev/",
          },
        ]}
      >
        <Router>
          <App />
        </Router>
      </EVMContext>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
