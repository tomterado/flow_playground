import path from "path";
import * as types from "@onflow/types";
import {
  init,
  sendTransaction,
  deployContractByName,
  getTransactionCode,
} from "flow-js-testing/dist";
import { getScriptCode } from "flow-js-testing/dist/utils/file";
import { executeScript } from "flow-js-testing/dist/utils/interaction";
import { getContractAddress } from "flow-js-testing/dist/utils/contract";
import { getAccountAddress } from "flow-js-testing/dist/utils/create-account";

const basePath = path.resolve(__dirname, "../cadence");

beforeAll(() => {
  init(basePath);
});

describe("Replicate Playground Accounts", () => {
  test("Create Accounts", async () => {
    // Playground project support 4 accounts, but nothing stops you from creating more by following the example laid out below
    const Alice = await getAccountAddress("Alice");
    const Bob = await getAccountAddress("Bob");
    const Charlie = await getAccountAddress("Charlie");
    const Dave = await getAccountAddress("Dave");

    console.log(
      "Four Playground accounts were created with following addresses"
    );
    console.log("Alice:", Alice);
    console.log("Bob:", Bob);
    console.log("Charlie:", Charlie);
    console.log("Dave:", Dave);
  });
});

describe("Deployment", () => {
  test("Deploy FungibleToken contract", async () => {
    const name = "FungibleToken";
    const to = await getAccountAddress("Alice");

    let result;
    try {
      result = await deployContractByName({
        name,
        to,
      });
    } catch (e) {
      console.log(e);
    }

    expect(result.errorMessage).toBe("");
  });

  test("Deploy NonFungibleToken contract", async () => {
    const name = "NonFungibleToken";
    const to = await getAccountAddress("Bob");

    let result;
    try {
      result = await deployContractByName({
        name,
        to,
      });
    } catch (e) {
      console.log(e);
    }

    expect(result.errorMessage).toBe("");
  });

  test("Deploy Marketplace contract", async () => {
    const name = "Marketplace";
    const to = await getAccountAddress("Charlie");

    // Generate addressMap from import statements
    const FungibleToken = await getContractAddress("FungibleToken");
    const NonFungibleToken = await getContractAddress("NonFungibleToken");

    const addressMap = {
      FungibleToken,
      NonFungibleToken,
    };

    let result;
    try {
      result = await deployContractByName({
        name,
        to,
        addressMap,
      });
    } catch (e) {
      console.log(e);
    }

    expect(result.errorMessage).toBe("");
  });

  test("Deploy HelloWorld contract", async () => {
    const name = "HelloWorld";
    const to = await getAccountAddress("Dave");

    let result;
    try {
      result = await deployContractByName({
        name,
        to,
      });
    } catch (e) {
      console.log(e);
    }

    expect(result.errorMessage).toBe("");
  });
});

describe("Transactions", () => {
  test("test transaction template Transaction 1", async () => {
    const name = "Transaction 1";

    // Import participating accounts
    const Alice = await getAccountAddress("Alice");

    // Set transaction signers
    const signers = [Alice];

    // Generate addressMap from import statements
    const FungibleToken = await getContractAddress("FungibleToken");
    const NonFungibleToken = await getContractAddress("NonFungibleToken");
    const Marketplace = await getContractAddress("Marketplace");

    const addressMap = {
      FungibleToken,
      NonFungibleToken,
      Marketplace,
    };

    let code = await getTransactionCode({
      name,
      addressMap,
    });

    let txResult;
    try {
      txResult = await sendTransaction({
        code,
        signers,
      });
    } catch (e) {
      console.log(e);
    }

    expect(txResult.errorMessage).toBe("");
  });

  test("test transaction template Transaction 2", async () => {
    const name = "Transaction 2";

    // Import participating accounts
    const Alice = await getAccountAddress("Alice");

    // Set transaction signers
    const signers = [Alice];

    // Generate addressMap from import statements
    const FungibleToken = await getContractAddress("FungibleToken");
    const NonFungibleToken = await getContractAddress("NonFungibleToken");
    const Marketplace = await getContractAddress("Marketplace");

    const addressMap = {
      FungibleToken,
      NonFungibleToken,
      Marketplace,
    };

    let code = await getTransactionCode({
      name,
      addressMap,
    });

    // pass corrected addressed to getAccount calls
    code = code.replace(/(?:getAccount\(\s*)(0x.*)(?:\s*\))/g, (_, match) => {
      const accounts = {
        "0x01": Alice,
      };
      const name = accounts[match];
      return `getAccount(${name})`;
    });

    let txResult;
    try {
      txResult = await sendTransaction({
        code,
        signers,
      });
    } catch (e) {
      console.log(e);
    }

    expect(txResult.errorMessage).toBe("");
  });

  test("test transaction template Transaction 3", async () => {
    const name = "Transaction 3";

    // Import participating accounts
    const Alice = await getAccountAddress("Alice");

    // Set transaction signers
    const signers = [Alice];

    // Generate addressMap from import statements
    const FungibleToken = await getContractAddress("FungibleToken");
    const NonFungibleToken = await getContractAddress("NonFungibleToken");

    const addressMap = {
      FungibleToken,
      NonFungibleToken,
    };

    let code = await getTransactionCode({
      name,
      addressMap,
    });

    let txResult;
    try {
      txResult = await sendTransaction({
        code,
        signers,
      });
    } catch (e) {
      console.log(e);
    }

    expect(txResult.errorMessage).toBe("");
  });

  test("test transaction template Transaction 4", async () => {
    const name = "Transaction 4";

    // Import participating accounts
    const Alice = await getAccountAddress("Alice");

    // Set transaction signers
    const signers = [Alice];

    // Generate addressMap from import statements
    const FungibleToken = await getContractAddress("FungibleToken");
    const NonFungibleToken = await getContractAddress("NonFungibleToken");

    const addressMap = {
      FungibleToken,
      NonFungibleToken,
    };

    let code = await getTransactionCode({
      name,
      addressMap,
    });

    // pass corrected addressed to getAccount calls
    code = code.replace(/(?:getAccount\(\s*)(0x.*)(?:\s*\))/g, (_, match) => {
      const accounts = {
        "0x01": Alice,
      };
      const name = accounts[match];
      return `getAccount(${name})`;
    });

    let txResult;
    try {
      txResult = await sendTransaction({
        code,
        signers,
      });
    } catch (e) {
      console.log(e);
    }

    expect(txResult.errorMessage).toBe("");
  });

  test("test transaction template Transaction 5", async () => {
    const name = "Transaction 5";

    // Import participating accounts
    const Bob = await getAccountAddress("Bob");

    // Set transaction signers
    const signers = [Bob];

    // Generate addressMap from import statements
    const FungibleToken = await getContractAddress("FungibleToken");
    const NonFungibleToken = await getContractAddress("NonFungibleToken");

    const addressMap = {
      FungibleToken,
      NonFungibleToken,
    };

    let code = await getTransactionCode({
      name,
      addressMap,
    });

    // pass corrected addressed to getAccount calls
    code = code.replace(/(?:getAccount\(\s*)(0x.*)(?:\s*\))/g, (_, match) => {
      const accounts = {
        "0x02": Bob,
      };
      const name = accounts[match];
      return `getAccount(${name})`;
    });

    let txResult;
    try {
      txResult = await sendTransaction({
        code,
        signers,
      });
    } catch (e) {
      console.log(e);
    }

    expect(txResult.errorMessage).toBe("");
  });
});

describe("Scripts", () => {
  test("test script template Script 1", async () => {
    const name = "Script 1";

    // Import participating accounts
    const Alice = await getAccountAddress("Alice");
    const Bob = await getAccountAddress("Bob");

    // Generate addressMap from import statements
    const FungibleToken = await getContractAddress("FungibleToken");
    const NonFungibleToken = await getContractAddress("NonFungibleToken");

    const addressMap = {
      FungibleToken,
      NonFungibleToken,
    };

    let code = await getScriptCode({
      name,
      addressMap,
    });

    // pass corrected addressed to getAccount calls
    code = code.replace(/(?:getAccount\(\s*)(0x.*)(?:\s*\))/g, (_, match) => {
      const accounts = {
        "0x01": Alice,
        "0x02": Bob,
      };
      const name = accounts[match];
      return `getAccount(${name})`;
    });

    const result = await executeScript({
      code,
    });

    // Add your expectations here
    expect().toBe();
  });

  test("test script template Script 2", async () => {
    const name = "Script 2";

    // Import participating accounts
    const Alice = await getAccountAddress("Alice");

    // Generate addressMap from import statements
    const FungibleToken = await getContractAddress("FungibleToken");
    const NonFungibleToken = await getContractAddress("NonFungibleToken");
    const Marketplace = await getContractAddress("Marketplace");

    const addressMap = {
      FungibleToken,
      NonFungibleToken,
      Marketplace,
    };

    let code = await getScriptCode({
      name,
      addressMap,
    });

    // pass corrected addressed to getAccount calls
    code = code.replace(/(?:getAccount\(\s*)(0x.*)(?:\s*\))/g, (_, match) => {
      const accounts = {
        "0x01": Alice,
      };
      const name = accounts[match];
      return `getAccount(${name})`;
    });

    const result = await executeScript({
      code,
    });

    // Add your expectations here
    expect().toBe();
  });

  test("test script template Script 3", async () => {
    const name = "Script 3";

    // Import participating accounts
    const Alice = await getAccountAddress("Alice");
    const Bob = await getAccountAddress("Bob");

    // Generate addressMap from import statements
    const FungibleToken = await getContractAddress("FungibleToken");
    const NonFungibleToken = await getContractAddress("NonFungibleToken");
    const Marketplace = await getContractAddress("Marketplace");

    const addressMap = {
      FungibleToken,
      NonFungibleToken,
      Marketplace,
    };

    let code = await getScriptCode({
      name,
      addressMap,
    });

    // pass corrected addressed to getAccount calls
    code = code.replace(/(?:getAccount\(\s*)(0x.*)(?:\s*\))/g, (_, match) => {
      const accounts = {
        "0x01": Alice,
        "0x02": Bob,
      };
      const name = accounts[match];
      return `getAccount(${name})`;
    });

    const result = await executeScript({
      code,
    });

    // Add your expectations here
    expect().toBe();
  });
});
