import { useState } from "react";
import { prepareTransaction, sendTransaction, toWei } from "thirdweb";
import { hederaTestnetConfig } from "@/utils/chains";
import { client } from "@/lib/thirdweb";
import { useActiveAccount } from "thirdweb/react";

function TopUp() {
  const account = useActiveAccount();
  const [top_up_modal_open, set_top_up_modal_open] = useState(false);
  const [top_up_amount, set_top_up_amount] = useState(0);
  const Handle_top_up = async () => {
    if (!account) return;
    if (top_up_amount <= 0) return;
    const transaction = prepareTransaction({
      to: process.env.Top_UP_Wallet_Address,
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
