import { NextResponse } from 'next/server'
import { createClient } from '@/lib/prismic'

export async function POST(request: Request) {
    try {
        const data = await request.json()

        // TODO: Add authentication check here
        // const password = request.headers.get('authorization')
        // if (password !== process.env.PUCK_ADMIN_PASSWORD) {
        //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        // }

        // TODO: Save to Prismic
        // For now, just acknowledge receipt
        console.log('Puck data received:', data)

        return NextResponse.json({ success: true, message: 'Data saved successfully' })
    } catch (error) {
        console.error('Error saving Puck data:', error)
        return NextResponse.json(
            { error: 'Failed to save data' },
            { status: 500 }
        )
    }
}

export async function GET(request: Request) {
    try {
        // TODO: Load from Prismic
        // For now, return empty data
        return NextResponse.json({
            content: [],
            root: {},
        })
    } catch (error) {
        console.error('Error loading Puck data:', error)
        return NextResponse.json(
            { error: 'Failed to load data' },
            { status: 500 }
        )
    }
}
