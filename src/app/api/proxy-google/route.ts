import { NextResponse } from 'next/server'

const TARGET = 'https://script.google.com/macros/s/AKfycbzp4EN_1707c-yJ9D1U7l8CaA0Najb7yFSB5EE0A3AiFd0jHK9jvXHgKjUrPxuLV0fw/exec'

async function forward(req: Request) {
  const url = new URL(req.url)

  // Preserve incoming querystring
  const query = url.search

  const headers: Record<string, string> = {}
  const incomingContentType = req.headers.get('content-type')
  if (incomingContentType) headers['content-type'] = incomingContentType

  const init: RequestInit = {
    method: req.method,
    headers,
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = await req.text()
  }

  const resp = await fetch(TARGET + query, init)

  const arrayBuf = await resp.arrayBuffer()

  const response = new NextResponse(Buffer.from(arrayBuf), {
    status: resp.status,
    headers: {
      'Content-Type': resp.headers.get('content-type') || 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })

  return response
}

export async function OPTIONS(req: Request) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

export async function GET(req: Request) {
  return forward(req)
}

export async function POST(req: Request) {
  return forward(req)
}
