import SummaryWorkspace from "@/components/summary-workspace";
import UserLayout from "@/components/user_layout";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const guest =
    typeof params?.guest === "string" ? params.guest : undefined;
  const isGuest = guest === "true";

  return (
    <UserLayout guest={guest}>
      <div className="mb-7 sm:mb-9">
        <p className="eyebrow">Summary workspace</p>
        <h1 className="mt-3 font-serif text-[36px] leading-[1.05] tracking-[-0.02em] text-ink sm:text-[44px]">
          Summarize text
        </h1>
        <p className="mt-3.5 max-w-[62ch] text-[14.5px] leading-relaxed text-ink-soft">
          Condense long text into a clear summary that keeps the essential
          facts — in the tone and style you choose.
        </p>
      </div>

      {isGuest && (
        <div className="mb-6 flex flex-col gap-3 border-y border-line py-3.5 text-[13px] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-ink-soft">
            You&apos;re working as a guest. One summary can be created per
            visitor.
          </p>
          <p className="text-ink-muted">
            <Link href="/login" className="link-underline text-ink">
              Sign in
            </Link>{" "}
            to keep a history.
          </p>
        </div>
      )}

      <SummaryWorkspace guest={guest} />
    </UserLayout>
  );
}
