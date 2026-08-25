# Campaign evidence

These files document the Create a DOB tutorial from environment setup through local OffCKB minting and browser verification. The 12 PNG screenshots are stored exactly as supplied, in chronological order.

## Fast reviewer path

1. See the [DOB transaction hash returned by the app](tutorial-run/Screenshot%202026-08-24%20133311.png).
2. See the [`image/jpeg` Spore content read back](tutorial-run/Screenshot%202026-08-24%20133348.png).
3. See the [picture rendered in the browser](tutorial-run/Screenshot%202026-08-24%20133448.png).
4. See the [fresh testnet transaction in Pudge](https://pudge.explorer.nervos.org/transaction/0x7c6928426eb6d5573c3654897994de8e12225fcb94fe8235e7f98e7c91253c97).
5. See the [fresh testnet live-cell render](testnet-dob-render.png) and [explorer capture](testnet-transaction-explorer.png).
6. Read [`REFLECTION.md`](../REFLECTION.md) for the debugging story and DOB/NFT comparison.

## Original tutorial run

| Step | Original file | Demonstrates |
| ---: | --- | --- |
| 1 | [`Screenshot 2026-08-24 120924.png`](tutorial-run/Screenshot%202026-08-24%20120924.png) | Node, npm, and Git environment checks |
| 2 | [`Screenshot 2026-08-24 121113.png`](tutorial-run/Screenshot%202026-08-24%20121113.png) | OffCKB CLI installation, including recoverable npm warnings |
| 3 | [`Screenshot 2026-08-24 121235.png`](tutorial-run/Screenshot%202026-08-24%20121235.png) | OffCKB devnet node and RPC proxy running |
| 4 | [`Screenshot 2026-08-24 121353.png`](tutorial-run/Screenshot%202026-08-24%20121353.png) | OffCKB account, address, and lock script |
| 5 | [`Screenshot 2026-08-24 121633.png`](tutorial-run/Screenshot%202026-08-24%20121633.png) | Nervos docs repository cloned and tutorial directory opened |
| 6 | [`Screenshot 2026-08-24 121831.png`](tutorial-run/Screenshot%202026-08-24%20121831.png) | Dependencies installed and audit output encountered |
| 7 | [`Screenshot 2026-08-24 122911.png`](tutorial-run/Screenshot%202026-08-24%20122911.png) | Parcel recovered from a port collision by selecting port 58845 |
| 8 | [`Screenshot 2026-08-24 123603.png`](tutorial-run/Screenshot%202026-08-24%20123603.png) | DOB app loaded before choosing an image |
| 9 | [`Screenshot 2026-08-24 124345.png`](tutorial-run/Screenshot%202026-08-24%20124345.png) | Image selected and ready for minting |
| 10 | [`Screenshot 2026-08-24 133311.png`](tutorial-run/Screenshot%202026-08-24%20133311.png) | DOB transaction created and transaction hash returned |
| 11 | [`Screenshot 2026-08-24 133348.png`](tutorial-run/Screenshot%202026-08-24%20133348.png) | Spore content retrieved with `image/jpeg` content type |
| 12 | [`Screenshot 2026-08-24 133448.png`](tutorial-run/Screenshot%202026-08-24%20133448.png) | Final picture reconstructed and rendered from the DOB content |

The integrity manifest is [`tutorial-run/SHA256SUMS.txt`](tutorial-run/SHA256SUMS.txt). All 12 entries were verified against the copied files during repository preparation.

The fresh captures are verified by [`testnet-SHA256SUMS.txt`](testnet-SHA256SUMS.txt).

## Transaction proof

The local tutorial returned transaction hash `0x7678ce441d722bcd13d0f0622d7542b521c9a29647a72afec5fc97919ba468a6`. [Open the screenshot that shows the hash](https://github.com/zuhdev/dob-tutorial/blob/main/evidence/tutorial-run/Screenshot%202026-08-24%20133311.png). It was created on the OffCKB devnet and cannot be opened in the public Pudge testnet explorer.

The fresh testnet run used a disposable signer and returned transaction `0x7c6928426eb6d5573c3654897994de8e12225fcb94fe8235e7f98e7c91253c97` at output index `0`. It is [committed in Pudge Explorer](https://pudge.explorer.nervos.org/transaction/0x7c6928426eb6d5573c3654897994de8e12225fcb94fe8235e7f98e7c91253c97), and the app [read the live cell and rendered its `image/png` bytes](testnet-dob-render.png). The explorer proof is also preserved as [a screenshot](testnet-transaction-explorer.png).

The testnet payload is 42,531 bytes. Its SHA-256 is `b6d61a0a7ae18ce202c37ab7f8d0b113471b38a8e8c3b839767aebd1715b02bb`, matching the uploaded source file exactly.

## What this evidence proves

- OffCKB installation and a running local devnet.
- A funded local account and its lock script.
- Tutorial installation, including the warnings encountered.
- Recovery from a local port conflict.
- Image selection and local Spore creation.
- Transaction hash returned after creation.
- `image/jpeg` data read back and rendered in the browser.
- Fresh CKB testnet transaction with a public explorer link.
- `image/png` data read back from the committed testnet cell and rendered in the browser.

## Submission status

The evidence set now includes the original local tutorial, the fresh CKB testnet mint, the committed public explorer record, and the image rendered from the live testnet cell. No private key is visible in the fresh testnet captures.

## Sensitive evidence warning

Some original screenshots display a disposable OffCKB tutorial private key. The files are retained unchanged as requested, but the corresponding account must be treated as permanently compromised and must never hold valuable testnet or mainnet assets.
