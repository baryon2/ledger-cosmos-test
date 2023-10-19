import React, { useState } from "react";
import "./App.css";
import { CosmosApp } from "@zondax/ledger-cosmos-js";
import Transport from "@ledgerhq/hw-transport-webusb";

async function getAddressAndPubKey(path, hrp) {
  const transport = await Transport.create();
  const cosmosApp = new CosmosApp(transport);
  const response = await cosmosApp.getAddressAndPubKey(path, hrp);
  return response;
}

function App() {
  const [evmResponse, setEvmResponse] = useState(null);
  const [cosmosResponse, setCosmosResponse] = useState(null);
  return (
    <div className="App">
      <button
        onClick={async () => {
          const res = await getAddressAndPubKey([44, 60, 0, 0, 0], "evmos");
          setEvmResponse(res);
        }}
      >
        Get Evm Address
      </button>
      {evmResponse && (
        <div className="response">
          <pre>{JSON.stringify(evmResponse, null, 2)}</pre>
        </div>
      )}

      <button
        onClick={async () => {
          const res = await getAddressAndPubKey([44, 118, 0, 0, 0], "cosmos");
          setCosmosResponse(res);
        }}
      >
        Get Cosmos Address
      </button>
      {cosmosResponse && (
        <div className="response">
          <pre>{JSON.stringify(cosmosResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
