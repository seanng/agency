import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Agency Template App'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          backgroundImage: 'linear-gradient(45deg, #f0f9ff 0%, #e0f2fe 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '20px',
              maxWidth: '900px',
              lineHeight: 1.2,
            }}
          >
            Agency Template App
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#6b7280',
              maxWidth: '800px',
              lineHeight: 1.4,
            }}
          >
            NextJS template with TypeScript, Tailwind CSS, Next Intl, and Payload CMS
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '40px',
            fontSize: 16,
            color: '#9ca3af',
          }}
        >
          Agency
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}