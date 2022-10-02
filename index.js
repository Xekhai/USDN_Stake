const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

const algosdk = require("algosdk");
const secretKey = "";
const sender = "";

const enc = new TextEncoder();

const algodToken = "";
const algodServer = "https://node.algoexplorerapi.io";
const algodPort = "";
let algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

async function Pay(address, amount, assetID) {
  // Construct the transaction
  let params = await algodClient.getTransactionParams().do();
  // comment out the next two lines to use suggested fee
  // params.fee = algosdk.ALGORAND_MIN_TX_FEE;
  // params.flatFee = true;

  const note = enc.encode(
    "USDN: Let's be your Gateway to  Algorand Shitcoins; usdznutz.xyz"
  );
  console.log(address);
  let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
    sender,
    address,
    undefined,
    undefined,
    amount,
    note,
    assetID,
    params
  );

  // Sign the transaction
  let signedTxn = txn.signTxn(algosdk.mnemonicToSecretKey(secretKey).sk);
  let txId = txn.txID().toString();
  //console.log("Signed transaction with txID: %s", txId);
  try {
    algodClient.sendRawTransaction(signedTxn).do();
  } catch (error) {
    () => {
      console.log("Error with Address: " + address + ": " + error);
    };
  }
}

function checkOptIN(address, amount, assetID) {
  axios
    .get("https://algoindexer.algoexplorerapi.io/v2/accounts/" + address)
    .then((response) => {
      let optedAddress = [].concat(response.data.account.assets);
      //console.log(optedAddress)

      var foundValue = optedAddress.filter(
        (obj) => obj["asset-id"] === assetID
      );

      //console.log(foundValue);

      if (foundValue.length == 0) {
        console.log("skipped; Not Opted In.");
      } else {
        Pay(address, amount, assetID);
        console.log("not skipped");
      }
      return optedAddress;
    })
    .catch((error) => {
      console.log(error);
    });
}

app.get("/", (req, res) => {
  axios
    .get(
      "https://algoindexer.algoexplorerapi.io/v2/assets/812158311/balances?currency-greater-than=100000"
    )
    .then((response) => {
      let rewardsAddresses = [].concat(response.data.balances);

      let sum = 0;

      for (let index = 0; index < rewardsAddresses.length; index++) {
        if (
          rewardsAddresses[index].address ==
          "CMPNIK3MJGM3OORGWQ45JDR4N4LGKCOJK45XLXK2VQ26GBQSEUPOPLEZYQ"
        ) {
          continue;
        }
        sum = sum + rewardsAddresses[index].amount;
      }

      console.log(sum);

      for (let index = 0; index < rewardsAddresses.length; index++) {
        if (
          rewardsAddresses[index].address ==
          "CMPNIK3MJGM3OORGWQ45JDR4N4LGKCOJK45XLXK2VQ26GBQSEUPOPLEZYQ"
        ) {
          continue;
        }

        let rewards;
        //usDeezNutzPay
        rewards = Math.floor(
          ((rewardsAddresses[index].amount / sum) * 38000000) / 365
        );
        checkOptIN(
          rewardsAddresses[index].address.toString(),
          rewards,
          812158311
        );
        console.log(rewardsAddresses[index].address + " : " + rewards);
        //roobiesPay
        rewards = Math.floor(
          ((rewardsAddresses[index].amount / sum) * 5050680850000) / 365
        );
        checkOptIN(
          rewardsAddresses[index].address.toString(),
          rewards,
          790704501
        );
        console.log(rewardsAddresses[index].address + " : " + rewards);
        //moistGranniesPay
        rewards = Math.floor(
          ((rewardsAddresses[index].amount / sum) * 55359761) / 365
        );
        checkOptIN(
          rewardsAddresses[index].address.toString(),
          rewards,
          756578163
        );
        console.log(rewardsAddresses[index].address + " : " + rewards);
        //jimCoinPay
        rewards = Math.floor(
          ((rewardsAddresses[index].amount / sum) * 140000) / 365
        );
        checkOptIN(
          rewardsAddresses[index].address.toString(),
          rewards,
          511028589
        );
        console.log(rewardsAddresses[index].address + " : " + rewards);
        //ruggiesPay
        rewards = Math.floor(
          ((rewardsAddresses[index].amount / sum) * 141232609718549) / 365
        );
        checkOptIN(
          rewardsAddresses[index].address.toString(),
          rewards,
          775399960
        );
        console.log(rewardsAddresses[index].address + " : " + rewards);
        //buttCoinPay
        rewards = Math.floor(
          ((rewardsAddresses[index].amount / sum) * 46281) / 365
        );
        checkOptIN(
          rewardsAddresses[index].address.toString(),
          rewards,
          753137719
        );
        console.log(rewardsAddresses[index].address + " : " + rewards);
        //theMexicanNationalPesos
        rewards = Math.floor(
          ((rewardsAddresses[index].amount / sum) * 11613596) / 365
        );
        checkOptIN(
          rewardsAddresses[index].address.toString(),
          rewards,
          776678944
        );
        console.log(rewardsAddresses[index].address + " : " + rewards);
      }
      res.send(response.data.balances);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
