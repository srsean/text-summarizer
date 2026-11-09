import React from "react";
import Wordmark from "./wordmark";

const AuthShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-dvh bg-paper lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
      <aside className="hidden border-r border-line bg-paper-deep px-12 py-12 lg:flex lg:flex-col lg:justify-between">
        <Wordmark />

        <div className="max-w-[420px]">
          <p className="eyebrow">Focused reading, condensed</p>
          <p className="mt-6 font-serif text-[44px] leading-[1.08] tracking-[-0.02em] text-ink">
            Keep the meaning.
            <br />
            Lose the noise.
          </p>
          <p className="mt-6 max-w-[36ch] text-[13.5px] leading-relaxed text-ink-soft">
            Condense articles, reports, and notes into clear summaries you can
            read, revisit, and use.
          </p>
        </div>

        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
          A quieter way to read
        </p>
      </aside>

      <main className="flex min-h-dvh flex-col px-5 py-7 sm:px-8 lg:px-14 lg:py-12">
        <div className="lg:hidden">
          <Wordmark />
        </div>

        <div className="mx-auto flex w-full max-w-[390px] flex-1 flex-col justify-center py-12 lg:py-0">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthShell;
