'use client'
import { InputPesquisa } from "@/components/InputPesquisa";
import { ItemPerfume } from "@/components/ItemPerfumes";
import { PerfumeI } from "@/utils/types/perfumes";
import { useEffect, useState } from "react";

export default function Home() {
  const [perfumes, setPerfumes] = useState<PerfumeI[]>([]);

  useEffect(() => {
    async function getDados() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/perfumes`);
        if (!response.ok) {
          throw new Error("Erro ao buscar dados");
        }
        const dados = await response.json();
        setPerfumes(dados);
      } catch (error) {
        console.error(error);
      }
    }
    getDados();
  }, []);

  const listaPerfumes = perfumes.map((perfume) => (
    <ItemPerfume data={perfume} key={perfume.id} />
  ));

  return (
    <>
      <InputPesquisa setPerfumes={setPerfumes} />
      <div className="mx-auto max-w-screen-xl">
        <h1 className="mt-2 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-800 md:text-5xl lg:text-6xl dark:text-gray-800">
          Perfumes <span className="underline underline-offset-3 decoration-8 decoration-fuchsia-900 dark:decoration-fuchsia-800">em destaque</span>
        </h1>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
          {listaPerfumes}
        </section>
      </div>
    </>
  );
}
