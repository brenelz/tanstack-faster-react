import { json } from "@tanstack/react-start"
import { createServerFileRoute } from "@tanstack/react-start/server"
import { useState } from "react"

export const ServerRoute = createServerFileRoute().methods({
    POST: async ({ request }) => {
        const body = await request.json()
        return new Response(JSON.stringify({ message: `Hello, ${body.name}!` }))
    },
})

export const Route = createFileRoute({
    component: HelloComponent,
})

function HelloComponent() {
    const [reply, setReply] = useState('')

    return (
        <div>
            <button
                onClick={() => {
                    ServerRoute.methods
                        .post({
                            body: JSON.stringify({ name: 'John' }),
                        })
                        .then((res) => res.json())
                        .then((data) => setReply(data.message))
                }}
            >
                Say Hello
            </button>
        </div>
    )
}