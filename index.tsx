import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  capacityOf,
  generateAccountFromPrivateKey,
  createSporeDOB,
  showSporeContent,
  shannonToCKB,
} from "./lib";
import { hexStringToUint8Array } from "./helper";
import { RawSporeData } from "@spore-sdk/core";
import { Script } from "@ckb-ccc/core";

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(<App />);

export function App() {
  const [privKey, setPrivKey] = useState("");
  const [fromAddr, setFromAddr] = useState("");
  const [fromLock, setFromLock] = useState<Script>();
  const [balance, setBalance] = useState("0");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<Uint8Array | null>(null);

  const [txHash, setTxHash] = useState<string>();
  const [outputIndex, setOutputIndex] = useState<number>();
  const [rawSporeData, setRawSporeData] = useState<RawSporeData>();
  const [imageURL, setImageURL] = useState<string>();
  const [status, setStatus] = useState<string>();

  useEffect(() => {
    const updateFromInfo = async () => {
      try {
        const { lockScript, address } = await generateAccountFromPrivateKey(privKey);
        const capacity = await capacityOf(address);
        setFromAddr(address);
        setFromLock(lockScript);
        setBalance(shannonToCKB(capacity).toString());
        setStatus(undefined);
      } catch (error) {
        console.error("Account lookup failed", error);
        setFromAddr("");
        setFromLock(undefined);
        setBalance("0");
        setStatus("Unable to read this account. Check the key and network/RPC settings.");
      }
    };

    if (privKey) updateFromInfo();
    else {
      setFromAddr("");
      setFromLock(undefined);
      setBalance("0");
    }
  }, [privKey]);

  const onInputPrivKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    const priv = e.target.value;
    const privateKeyRegex = /^0x[0-9a-fA-F]{64}$/;

    if (privateKeyRegex.test(priv)) {
      setPrivKey(priv);
      setStatus(undefined);
    } else {
      setPrivKey("");
      setStatus("Invalid private key: enter 0x followed by exactly 64 hexadecimal characters.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (!files[0].type.startsWith("image/")) {
        setSelectedFile(null);
        setFileContent(null);
        setStatus("Please select an image file.");
        return;
      }
      setSelectedFile(files[0]);

      const reader = new FileReader();
      reader.onload = () => {
        // Access the file content here
        const content = reader.result;
        if (content && content instanceof ArrayBuffer) {
          const uint8Array = new Uint8Array(content);
          setFileContent(uint8Array);
          setStatus("Image loaded. Create the DOB when the account has enough capacity.");
        }
      };

      // Read the file as ArrayBuffer
      reader.readAsArrayBuffer(files[0]);
    }
  };

  const createSpore = async () => {
    if (!fileContent) return;
    try {
      setStatus("Creating the Spore transaction…");
      const { txHash, outputIndex } = await createSporeDOB(
        privKey,
        fileContent,
        selectedFile?.type || "application/octet-stream"
      );
      setTxHash(txHash);
      setOutputIndex(outputIndex);
      setStatus("DOB created. Read the Spore content to verify it.");
    } catch (error) {
      console.error("DOB creation failed", error);
      setStatus("DOB creation failed. Check account capacity, network, and OffCKB/testnet status.");
    }
  };

  const renderSpore = async () => {
    if (!txHash || outputIndex == null) return;
    try {
      setStatus("Reading the live Spore cell…");
      const res = await showSporeContent(txHash, outputIndex);
      if (!res) {
        setStatus("The Spore cell is not available yet. Wait for the transaction and retry.");
        return;
      }
      setRawSporeData(res);

      const buffer = hexStringToUint8Array(res.content.toString().slice(2));
      const blob = new Blob([new Uint8Array(buffer)], { type: res.contentType });
      setImageURL((previousUrl) => {
        if (previousUrl) URL.revokeObjectURL(previousUrl);
        return URL.createObjectURL(blob);
      });
      setStatus("Spore content loaded and rendered from the live cell data.");
    } catch (error) {
      console.error("Spore content lookup failed", error);
      setStatus("Unable to read the Spore cell. Wait for confirmation and retry.");
    }
  };

  const enabled = +balance > 0 && !!fileContent;
  const enabledRead = !!txHash && outputIndex != null;

  return (
    <div>
      <h1>Create on-chain digital objects</h1>
      <label htmlFor="private-key">Private Key: </label>&nbsp;
      <input
        id="private-key"
        type="password"
        value={privKey}
        placeholder="0x… (local devnet/testnet key)"
        autoComplete="off"
        onChange={onInputPrivKey}
      />
      <p><small>Use a disposable OffCKB/testnet key. Never commit or share private keys.</small></p>
      {status && <p role="status"><small>{status}</small></p>}
      <ul>
        <li>CKB Address: {fromAddr}</li>
        <li>
          Current lock script:
          <pre>{JSON.stringify(fromLock, null, 2)}</pre>
        </li>

        <li>Total capacity: {balance} CKB</li>
      </ul>
      <small>Tx fee: 0.001 CKB</small>
      <br />
      <br />
      <div>
        <h4>Upload DOB Image File</h4>
        <input type="file" onChange={handleFileChange} />
        {selectedFile && (
          <div>
            <p>File Size: {selectedFile.size} bytes</p>
          </div>
        )}
      </div>
      <br />
      <br />
      <button disabled={!enabled} onClick={createSpore}>
        Create DOB
      </button>
      <hr />
      {txHash && (
        <p>
          Transaction hash: <code>{txHash}</code>
          {outputIndex != null && <> · output index: <code>{outputIndex}</code></>}
        </p>
      )}
      <button disabled={!enabledRead} onClick={renderSpore}>
        Check Spore Content
      </button>
      {rawSporeData && (
        <div>
          <p>contentType: {rawSporeData.contentType}</p>
        </div>
      )}
      {imageURL && <img src={imageURL} alt="Picture rendered from the Spore cell data" />}
    </div>
  );
}
