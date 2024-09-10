import express from 'express'
import marcasRoutes from './routes/marcas'
import perfumesRoutes from './routes/perfumes'  
import cors from 'cors'

const app = express()
const port = 3004

app.use(express.json())
app.use(cors())

app.use("/marcas", marcasRoutes)
app.use("/perfumes", perfumesRoutes)  

app.get('/', (req, res) => {
  res.send('API: Sistema de Revenda de Perfumes')  
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})
