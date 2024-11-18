import { type MetaFunction } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { useState } from "react";
import { ClientOnly } from "remix-utils/client-only";
import { callAdmins } from "~/.server/discord";
import { CallButton } from "~/components/call-button.client";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [lastPushed, setLastPushed] = useState<Date>();
  const fetcher = useFetcher();

  return (
    <div className="flex h-screen items-center justify-center text-7xl">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading font-bold">
            ご用件のある方は下のボタンでお呼び出しください
          </h1>
        </header>
        <nav className="flex flex-col items-center justify-center gap-4">
          <ClientOnly>
            {() => (
              <CallButton
                last={lastPushed}
                onCall={() => {
                  setLastPushed(new Date());
                  fetcher.submit("call", { method: "post" });
                }}
              />
            )}
          </ClientOnly>
        </nav>
      </div>
    </div>
  );
}

export async function action() {
  callAdmins();
  return null;
}
