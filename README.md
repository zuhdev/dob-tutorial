# Create a DOB — Nervos CKB campaign submission

This repository documents my completion of the Nervos **Create a DOB** tutorial with OffCKB and Spore-SDK. The app takes an image, stores its MIME type and bytes in a Spore cell, reads that cell back by transaction outpoint, and reconstructs the picture in the browser.

![Final local DOB render](evidence/tutorial-run/Screenshot%202026-08-24%20133448.png)

## Campaign checklist

| Requirement | Current proof |
| --- | --- |
| Run OffCKB locally | [OffCKB node and RPC screenshot](evidence/tutorial-run/Screenshot%202026-08-24%20121235.png) |
| Deploy an on-chain picture with Spore-SDK | [DOB transaction returned by the local tutorial](evidence/tutorial-run/Screenshot%202026-08-24%20133311.png) |
| Render the picture from the digital object | [Retrieved `image/jpeg` content](evidence/tutorial-run/Screenshot%202026-08-24%20133348.png) and [final browser render](evidence/tutorial-run/Screenshot%202026-08-24%20133448.png) |
| Deploy the app and mint on CKB testnet | **Pending final testnet run and public deployment** |
| Share a reflection | [What I learned about DOBs, NFTs, and debugging](REFLECTION.md) |

The first three technical stages are proven by the original chronological screenshots. I have deliberately left the testnet item marked pending until this repository has a real public URL and a transaction created from my own testnet account.

## Quick review links

Open these links directly on GitHub:

- [Evidence index](https://github.com/zuhdev/dob-tutorial/blob/main/evidence/README.md)
- [Step 3 — OffCKB running](https://github.com/zuhdev/dob-tutorial/blob/main/evidence/tutorial-run/Screenshot%202026-08-24%20121235.png)
- [Step 7 — Parcel port recovery](https://github.com/zuhdev/dob-tutorial/blob/main/evidence/tutorial-run/Screenshot%202026-08-24%20122911.png)
- [Step 10 — DOB transaction hash](https://github.com/zuhdev/dob-tutorial/blob/main/evidence/tutorial-run/Screenshot%202026-08-24%20133311.png)
- [Step 11 — Spore content retrieved](https://github.com/zuhdev/dob-tutorial/blob/main/evidence/tutorial-run/Screenshot%202026-08-24%20133348.png)
- [Step 12 — Picture rendered from DOB](https://github.com/zuhdev/dob-tutorial/blob/main/evidence/tutorial-run/Screenshot%202026-08-24%20133448.png)
- [Full screenshot folder](https://github.com/zuhdev/dob-tutorial/tree/main/evidence/tutorial-run)
- [Reflection](https://github.com/zuhdev/dob-tutorial/blob/main/REFLECTION.md)
- [App source](https://github.com/zuhdev/dob-tutorial/blob/main/index.tsx)
- [Validation workflow](https://github.com/zuhdev/dob-tutorial/blob/main/.github/workflows/validate.yml)

The testnet mint and public deployment links will be added here after that run is completed with my own disposable testnet account.

## What the app proves

The image shown at the end is not a local file preview. After minting, the app uses the transaction hash and output index to query the live CKB cell, decodes the Spore data, converts the returned bytes into a browser `Blob`, and renders that result.

```text
local image bytes
       |
       v
Spore-SDK transaction -> CKB Spore cell
                               |
                               v
                    query live cell by outpoint
                               |
                               v
                 unpack bytes -> Blob -> image
```

The app supports both networks through `NETWORK`:

- `devnet` uses the OffCKB RPC proxy at `http://localhost:28114` and the exported local scripts.
- `testnet` uses the public CKB testnet client and the predefined Spore testnet configuration.

## Evidence

All 12 screenshots supplied for the campaign are stored unchanged in [`evidence/tutorial-run`](evidence/tutorial-run). The complete step-by-step index is in [`evidence/README.md`](evidence/README.md), and [`SHA256SUMS.txt`](evidence/tutorial-run/SHA256SUMS.txt) records their exact hashes.

The evidence intentionally includes the recoverable problems encountered along the way:

- npm installation warnings and audit findings;
- a Parcel default-port collision, followed by a successful alternate port;
- dependency and browser-RPC compatibility debugging described in the reflection.

## Run locally

Requirements: Node.js 20, npm, and [OffCKB](https://docs.nervos.org/docs/getting-started/quick-start).

```powershell
git clone https://github.com/zuhdev/dob-tutorial.git
Set-Location '.\dob-tutorial'
npm ci
```

Start the OffCKB tutorial flow in two terminals:

```powershell
# Terminal 1
offckb node
```

```powershell
# Terminal 2
$env:NETWORK = 'devnet'
npm start
```

Use only the disposable local account printed by `offckb accounts`. Select an image, click **Create DOB**, wait for the transaction hash, and then click **Check Spore Content** to render the bytes retrieved from the cell.

## Final testnet run

Before submitting the campaign, complete these remaining steps with a new disposable testnet account whose private key is never shown in a screenshot:

1. Fund the account from an official CKB testnet faucet.
2. Run `$env:NETWORK = 'testnet'; npm start`.
3. Mint the image and record the transaction hash and output index.
4. Confirm the transaction in the Pudge testnet explorer.
5. Click **Check Spore Content** and capture the browser rendering.
6. Run `$env:NETWORK = 'testnet'; npm run build` and deploy `dist/` to a static host.
7. Add the public URL, explorer URL, and final screenshots to this README and `evidence/README.md`.

Do not claim completion until those real proof links are present.

## Validate

```powershell
npm ci
npm run lint
$env:NETWORK = 'testnet'
npm run build
```

The same checks run automatically through [`.github/workflows/validate.yml`](.github/workflows/validate.yml).

## Security

The key field is runtime-only and no private key is committed in the source. Several original screenshots display a disposable OffCKB devnet key, so that local account must be considered permanently compromised. Never fund it on testnet or mainnet.

Campaign resources: [OffCKB Quick Start](https://docs.nervos.org/docs/getting-started/quick-start) and [Create a DOB](https://docs.nervos.org/docs/dapp/create-dob).
