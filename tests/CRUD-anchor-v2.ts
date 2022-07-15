import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { assert } from "chai";
import { CrudAnchorV2 } from "../target/types/crud_anchor_v2";

const { SystemProgram } = anchor.web3;

describe("CRUD-anchor-v2", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.CrudAnchorV2 as Program<CrudAnchorV2>;
  const baseAccount = anchor.web3.Keypair.generate();

  it("Is initialized!", async () => {
    await program.methods
      .initialize("Hello World")
      .accounts({
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([baseAccount])
      .rpc();

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );

    assert.ok(account.data == "Hello World");
  });

  it("Is Updated!", async () => {
    await program.methods
      .update("Hello World 2")
      .accounts({ baseAccount: baseAccount.publicKey })
      .rpc();

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    assert.ok(account.data == "Hello World 2");
    assert.ok(account.dataList.length == 2);
  });
});
