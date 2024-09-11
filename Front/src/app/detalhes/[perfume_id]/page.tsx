"use client"
import { PerfumeI } from "@/utils/types/perfumes"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Detalhes() {
  const params = useParams()
  const [perfume, setPerfume] = useState<PerfumeI>()

  useEffect(() => {
    async function getDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/perfumes/${params.perfume_id}`)
      const dados = await response.json()
      console.log(dados)
      setPerfume(dados)
    }
    getDados()
  }, [params.perfume_id])

  return (
    <section>
      <h1 className="ms-48 mt-10 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-800 md:text-5xl lg:text-6xl dark:text-gray-900">
        Detalhes do:{" "}
        <span className="underline underline-offset-3 decoration-8 decoration-orange-400 dark:decoration-fuchsia-800">
          {perfume?.nome}
        </span>
      </h1>

      <div className="flex flex-col mt-10 mx-auto items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img
          className="object-cover w-1/2 rounded-t-lg h-64 md:h-1/3 md:w-1/3 md:rounded-none md:rounded-s-lg"
          src={perfume?.foto}
          alt={`Imagem do perfume ${perfume?.nome}`}
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{perfume?.nome}</h5>
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Preço R$:
            {Number(perfume?.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
          </h5>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            {perfume?.descricao || "Sem descrição"}
          </p>
        </div>
      </div>
    </section>
  )
}
