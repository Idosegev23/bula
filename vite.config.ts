import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

// תוסף קטן שמקבל POST של hotspots ושומר ל-src/components/UI/HotspotEditor/hotspots.json
function hotspotSaver() {
  return {
    name: 'hotspot-saver',
    configureServer(server: any) {
      server.middlewares.use('/__save-hotspots', (req: any, res: any, next: any) => {
        if (req.method === 'OPTIONS') {
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
          res.setHeader('Access-Control-Allow-Headers', 'content-type')
          res.statusCode = 204
          res.end()
          return
        }
        if (req.method !== 'POST') {
          next()
          return
        }
        let body = ''
        req.on('data', (chunk: Buffer) => {
          body += chunk.toString('utf8')
        })
        req.on('end', () => {
          try {
            const data = JSON.parse(body)
            const mode = data?.mode === 'mobile' ? 'mobile' : 'desktop'
            const filename = mode === 'mobile' ? 'hotspots-mobile.json' : 'hotspots.json'
            const target = path.resolve(process.cwd(), `src/components/UI/HotspotEditor/${filename}`)
            fs.writeFileSync(target, body)
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            res.end(JSON.stringify({ ok: true, path: target, mode }))
          } catch (err) {
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 400
            res.end(JSON.stringify({ ok: false, error: String(err) }))
          }
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), hotspotSaver()],
})
