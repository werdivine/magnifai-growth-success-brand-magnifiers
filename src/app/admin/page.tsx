import ClientEditor from './client'
import fs from 'fs'
import path from 'path'

export default async function AdminPage() {
    const DATA_FILE = path.join(process.cwd(), 'src/content/puck-data.json')
    let initialData = { content: [], root: {} }

    try {
        if (fs.existsSync(DATA_FILE)) {
            const fileContent = fs.readFileSync(DATA_FILE, 'utf-8')
            initialData = JSON.parse(fileContent)
        }
    } catch (e) {
        console.error('Failed to load local data', e)
    }

    return <ClientEditor initialData={initialData} />
}

