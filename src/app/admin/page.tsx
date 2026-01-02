'use client'

import { Puck } from '@measured/puck'
import { config } from '@/lib/puck-config'
import '@measured/puck/puck.css'

export default function AdminPage() {
    return (
        <div>
            <Puck
                config={config}
                data={{
                    content: [],
                    root: {},
                }}
                onPublish={async (data) => {
                    // Save to Prismic via API
                    await fetch('/api/puck/save', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data),
                    })
                }}
            />
        </div>
    )
}
