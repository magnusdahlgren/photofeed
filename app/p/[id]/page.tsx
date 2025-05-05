import PhotoDetail from "@/components/PhotoDetail";

interface Params {
  readonly params: { readonly id: string };
}

export default function PhotoPage({ params }: Params) {
  return (
    <main>
      <PhotoDetail id={params.id} />
    </main>
  );
}
