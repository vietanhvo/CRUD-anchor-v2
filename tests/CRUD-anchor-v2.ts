import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { CrudAnchorV2 } from "../target/types/crud_anchor_v2";

describe("CRUD-anchor-v2", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.CrudAnchorV2 as Program<CrudAnchorV2>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
