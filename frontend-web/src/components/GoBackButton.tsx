"use client";

import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();

  return (
    <button id="goBackBtn" title="Zurück zur vorherigen Seite" onClick={() => router.back()}>
      &#x2190;
    </button>
  );
}
