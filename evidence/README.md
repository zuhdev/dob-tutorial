# Campaign evidence

These files document the Create a DOB tutorial from environment setup through local OffCKB minting and browser verification. The 12 PNG screenshots are stored exactly as supplied, in chronological order.

## Fast reviewer path

1. See the [DOB transaction hash returned by the app](tutorial-run/Screenshot%202026-08-24%20133311.png).
2. See the [`image/jpeg` Spore content read back](tutorial-run/Screenshot%202026-08-24%20133348.png).
3. See the [picture rendered in the browser](tutorial-run/Screenshot%202026-08-24%20133448.png).
4. Read [`REFLECTION.md`](../REFLECTION.md) for the debugging story and DOB/NFT comparison.

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

## What this evidence proves

- OffCKB installation and a running local devnet.
- A funded local account and its lock script.
- Tutorial installation, including the warnings encountered.
- Recovery from a local port conflict.
- Image selection and local Spore creation.
- Transaction hash returned after creation.
- `image/jpeg` data read back and rendered in the browser.

## Remaining campaign evidence

The current screenshots are a local/devnet proof set. They do **not** prove a CKB testnet mint or a public deployment. Before final campaign submission, add a separate `testnet/` directory containing:

1. the funded disposable testnet address, with no private key visible;
2. the app running with `NETWORK=testnet`;
3. the resulting transaction hash and output index;
4. the committed transaction in Pudge Explorer;
5. the content rendered back from that testnet cell;
6. the public deployed app URL visible in the browser.

Then replace the pending testnet row in the root README with the actual explorer and deployment links.

## Sensitive evidence warning

Some original screenshots display a disposable OffCKB tutorial private key. The files are retained unchanged as requested, but the corresponding account must be treated as permanently compromised and must never hold valuable testnet or mainnet assets.
