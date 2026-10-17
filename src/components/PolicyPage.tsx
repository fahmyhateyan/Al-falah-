import type { ReactNode } from "react";
import { DraftNotice } from "./Blocks";

export function PolicyPage({ title, intro, approved, children }: { title: string; intro: string; approved: boolean; children: ReactNode }) {
  return (
    <>
      <section className="bg-ivory-100">
        <div className="container-page py-14 sm:py-20">
          <p className="eyebrow">Policies</p>
          <h1 className="h-display max-w-3xl">{title}</h1>
          <p className="lead mt-6 max-w-2xl">{intro}</p>
        </div>
      </section>
      <section className="bg-white py-14 sm:py-20">
        <div className="container-page">
          {!approved && (
            <DraftNotice>
              This page sets out the structure of our policy and the principles we follow. The final wording is being reviewed and has not yet
              been approved. Please <a href="/contact" className="underline">contact us</a> with any questions.
            </DraftNotice>
          )}
          <div className="prose-site">{children}</div>
        </div>
      </section>
    </>
  );
}
