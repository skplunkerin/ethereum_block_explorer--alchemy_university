import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

import "./App.css";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [block, setBlock] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      // Sometimes React gets stuck calling these over and over, causing 429
      // errors; so only call them if they're undefined:
      if (blockNumber === undefined) {
        setBlockNumber(await alchemy.core.getBlockNumber());
        setBlock(await alchemy.core.getBlock(blockNumber));
      }
    }

    getBlockNumber();
  });

  // TODO: remove this once done rendering everything.
  if (block !== undefined) {
    console.log("===================");
    console.log("blockNumber:", blockNumber);
    console.log("block:", block);
    console.log("===================");
  }
  const todo = <b>(TODO: get actual value from block)</b>;
  return (
    <div className="App">
      <div>Block: #{blockNumber}</div>
      {block !== undefined && (
        /* TODO: add styling. */
        <table>
          <tbody>
            <tr>
              <td>Block Height:</td>
              <td>{block.number}</td>
            </tr>
            <tr>
              {/*
               * Theres no "status" field on blocks, what we're grabbing is the
               * latest block, so we can hard-code that status.
               * If we do more than grab the latest block, here's how to figure out
               * the status:
               * https://www.alchemy.com/overviews/ethereum-commitment-levels#how-are-safe-and-finalized-commitment-levels-determined-2
               */}
              <td>Status:</td>
              <td>Latest {todo}</td>
            </tr>
            <tr>
              <td>Timestamp:</td>
              <td>{new Date(block.timestamp * 1000).toLocaleString()}</td>
            </tr>
            {/* not sure how to get this info yet.
             *<tr>
             *  <td>Proposed On:</td>
             *  <td>Block proposed on slot 5551553, epoch 173486</td>
             *</tr>
             */}
            <tr>
              <td>Transactions:</td>
              <td>
                {block.transactions.length} transactions transactions in this
                block
              </td>
            </tr>
            <tr>
              <td>Fee Recipient (Miner):</td>
              <td>{block.miner}</td>
            </tr>
            <tr>
              <td>Block Reward:</td>
              <td>
                0.034458024864085584 Ether (0 + 0.338344721748476664 -
                0.30388669688439108) {todo}
              </td>
            </tr>
            <tr>
              <td>Total Difficulty:</td>
              {/*<td>58,750,003,716,598,352,816,469</td>*/}
              <td>{block._difficulty.toBigInt().toLocaleString("en-US")}</td>
            </tr>
            <tr>
              <td>Size:</td>
              <td>77,946 bytes {todo}</td>
            </tr>
            <tr>
              <td>Gas Used:</td>
              {/*<td>15,913,743 (53.05%) +6% Gas Target</td>*/}
              <td>{block.gasUsed.toBigInt().toLocaleString("en-US")}</td>
            </tr>
            <tr>
              <td>Gas Limit:</td>
              <td>{block.gasLimit.toBigInt().toLocaleString("en-US")}</td>
            </tr>
            <tr>
              <td>Base Fee Per Gas:</td>
              {/*<td>0.00000001909586556 Ether (19.09586556 Gwei)</td>*/}
              <td>{block.baseFeePerGas.toBigInt().toLocaleString("en-US")}</td>
            </tr>
            <tr>
              <td>Burnt Fees:</td>
              <td>🔥 0.30388669688439108 Ether {todo}</td>
            </tr>
            <tr>
              <td>Extra Data:</td>
              <td>(Hex:{block.extraData})</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
