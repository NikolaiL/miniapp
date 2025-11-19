// Reference the example args file: https://github.com/scaffold-eth/create-eth-extensions/blob/example/extension/packages/nextjs/app/page.tsx.args.mjs
// Reference the template file that will use this file: https://github.com/scaffold-eth/create-eth/blob/main/templates/base/packages/nextjs/app/page.tsx.template.mjs

export const fullContentOverride = `
"use client";

import { CSSProperties, useState } from "react";
import { EtherInput } from "@scaffold-ui/components";
import type { NextPage } from "next";
import { parseEther } from "viem";
import { GreetingHistory } from "~~/components/GreetingHistory";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const [greeting, setGreeting] = useState("");
  const [premiumValue, setPremiumValue] = useState("");
  const { writeContractAsync: writeYourContractAsync, isMining } = useScaffoldWriteContract({
    contractName: "YourContract",
  });

  const handleSetGreeting = async () => {
    if (!greeting.trim()) {
      return;
    }

    try {
      await writeYourContractAsync({
        functionName: "setGreeting",
        args: [greeting],
        value: premiumValue ? parseEther(premiumValue) : undefined,
      });
      setGreeting("");
      setPremiumValue("");
    } catch (error) {
      console.error("Error setting greeting:", error);
    }
  };

  return (
    <>
      <div className="flex items-center flex-col grow pt-10">
        <div className="px-5 w-full sm:w-2xl">
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold text-center">New Greeting</h2>
              <input
                type="text"
                value={greeting}
                onChange={e => setGreeting(e.target.value)}
                placeholder="Enter greeting..."
                className="input input-bordered w-full text-4xl px-8 py-8 text-center font-bold"
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    handleSetGreeting();
                  }
                }}
              />
              <div className="flex flex-col gap-2 items-center">
                <label className="text-sm font-medium text-center">Premium (Optional)</label>
                  <EtherInput
                    defaultValue={premiumValue}
                    onValueChange={({ valueInEth }) => setPremiumValue(valueInEth)}
                  />
              </div>
            </div>
            <button
              className="btn btn-primary mt-2 btn-xl"
              onClick={handleSetGreeting}
              disabled={isMining || !greeting.trim()}
            >
              {isMining ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Setting...
                </>
              ) : (
                "Set Greeting"
              )}
            </button>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-4 text-center">Greeting History</h2>
            <GreetingHistory />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
`;
