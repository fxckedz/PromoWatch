import { PlatformCredentialsRepository } from "../repository/PlatformCredentialsRepository.js"
import { MeliService } from "../service/MeliService.js"

async function init(){
  const tgCode = process.argv[2]

  if (!tgCode) {
    console.error("❌ Erro: Você deve passar o 'TG-CODE' como argumento.")
    console.log("Exemplo: npx tsx scripts/init-meli.ts TG-65ef...")
    process.exit(1)
  }

  const repository = new PlatformCredentialsRepository()
  const service = new MeliService(repository)

  try {
    // 2. Chama o método que faz o Axios + Upsert no banco
    const credential = await service.initializeCredentials(tgCode)

    console.log("✅ Credenciais configuradas com sucesso no banco de dados!")
    console.log(`ID da Credencial: ${credential.id}`)
    console.log(`Plataforma: ${credential.platform}`)
    console.log(`Expira em: ${credential.expiresAt?.toLocaleString("pt-BR")}`)

    process.exit(0)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    process.exit(1)
  }
}

init()
