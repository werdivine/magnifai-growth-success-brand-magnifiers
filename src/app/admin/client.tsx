'use client'

import { Puck } from '@measured/puck'
import { config } from '@/lib/puck-config'
import '@measured/puck/puck.css'

export default function ClientEditor({ initialData }: { initialData: any }) {
    return (
        <Puck
            config={config}
            data={initialData}
            onPublish={async (data) => {
                await fetch('/api/puck/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                })
            }}
        />
    )
}
