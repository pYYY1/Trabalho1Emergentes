import { MarcaI } from "./marcas";

export interface PerfumeI {
  id: number;
  nome: string;
  preco: number;
  foto: string;
  descricao?: string; 
  destaque: boolean;
  createdAt: Date;
  updatedAt: Date;
  marca: MarcaI;
  marcaId: number;
}
