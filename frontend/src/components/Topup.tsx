import { useState } from "react";
import {
  prepareTransaction,
  sendTransaction,
  toWei,
  waitForReceipt,
} from "thirdweb";
import { hederaTestnetConfig } from "@/utils/chains";
import { client } from "@/lib/thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { hackathon_supabase } from "@/lib/supabase";

function TopUp() {
  const account = useActiveAccount();
  const [top_up_modal_open, set_top_up_modal_open] = useState(false);
  const [top_up_amount, set_top_up_amount] = useState(0);
  const Handle_top_up = async () => {
    if (!account) return;
    if (top_up_amount <= 0) return;

    const transaction = prepareTransaction({
      to: "0x00000000000000000000000000000000006d4002",
      value: toWei(top_up_amount.toString()),
      chain: {
        rpc: hederaTestnetConfig.rpcUrls.default.http[0],
        id: hederaTestnetConfig.id,
      },
      client,
    });
    const tx = await sendTransaction({
      account,
      transaction,
    });
    const receipt = await waitForReceipt({
      transactionHash: tx.transactionHash,
      client: tx.client,
      chain: tx.chain,
    });
    if (receipt) {
      check_if_auth_and_update(top_up_amount);
    }
  };

  const check_if_auth_and_update = async (credit: number) => {
    if (!account) return;
    const {
      data: { user },
      error,
    } = await hackathon_supabase.auth.getUser();
    if (user) {
      console.log(user);
      const { data: existingProfile } = await hackathon_supabase
        .from("user_top_up")
        .select("id")
        .eq("id", user.id)
        .single();

      if (existingProfile) {
        updateCredit(user);
      } else {
        console.log("🆕 You need to sign up");
      }
    } else {
      const { data, error } = await hackathon_supabase.auth.signInWithWeb3({
        chain: "ethereum",
      });
      if (error) {
        return;
      }
      console.log(data);
      // create a profile row for them

      const { data: InsertData, error: InsertError } = await hackathon_supabase
        .from("user_top_up")
        .insert({
          id: data.user.id,
          wallet_address: account.address,
          credits: 0,
        });
      if (InsertError) {
        console.log(InsertError);
        return;
      }
      updateCredit(data.user);
    }
  };

  const updateCredit = async (user: { id: string }) => {
    const { data: selectData, error: selectError } = await hackathon_supabase
      .from("user_top_up")
      .select("*")
      .eq("id", user.id)
      .single(); // important: ensures it returns one object, not an array

    if (selectError) console.error(selectError);
    else console.log("User profile:", selectData);
    console.log("👋 Returning user");
    const userCredit = selectData.credits;
    console.log(userCredit);
    const updateAmount = userCredit + top_up_amount;
    const { data: updateData, error: updateError } = await hackathon_supabase
      .from("user_top_up")
      .update({ credits: updateAmount }) // fields you want to change
      .eq("id", user.id); // which row(s) to update
    if (updateError) console.error(updateError);
    else set_top_up_amount(0);
  };
  return (
    <>
      <div>
        <button
          className="border border-white rounded-[7px] px-5 py-4 "
          onClick={() => {
            set_top_up_modal_open(true);
          }}
        >
          TOP UP
        </button>
      </div>
      {top_up_modal_open && (
        <div>
          <div className="bg-[#191919] p-10 w-[30%] h-[50%] flex flex-col absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 rounded-[8px]">
            <div className="flex justify-end mb-5">
              <button
                className=""
                onClick={() => {
                  set_top_up_modal_open(false);
                }}
              >
                X
              </button>
            </div>
            <div className="flex flex-col gap-10 justify-between">
              <input
                className="border border-white h-10 rounded-[6px] p-4"
                type="text"
                placeholder="Amount to top up"
                onChange={(e) => {
                  set_top_up_amount(Number(e.target.value));
                }}
              />
              <div className="flex justify-between m-5">
                <h2>Amount</h2>
                <h2>$0</h2>
              </div>
            </div>
            <button
              onClick={Handle_top_up}
              className="border border-white rounded-[7px] px-5 py-4 "
            >
              Top Up
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default TopUp;
