'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/app/components/ui/button'
import { Textarea } from '@/app/components/ui/textarea'
import { Input } from '@/app/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert'
import { pasteAPI } from '@/app/lib/api'

export default function Home() {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [ttlSeconds, setTtlSeconds] = useState('')
  const [maxViews, setMaxViews] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [createdUrl, setCreatedUrl] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)

    try {
      const result = await pasteAPI.createPaste(
        content,
        ttlSeconds,
        maxViews
      )

      if (result.success) {
        setSuccess(true)
        setCreatedUrl(result.data.url)
        setContent('')
        setTtlSeconds('')
        setMaxViews('')

        setTimeout(() => {
          router.push(`/p/${result.data.id}`)
        }, 2000)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
            Pastebin Lite
          </h1>
          <p className="text-lg text-slate-600">Share your code snippets and text instantly</p>
        </div>

        {/* Main Card */}
        <Card className="shadow-2xl">
          <CardHeader className="border-b border-slate-200">
            <CardTitle>Create a New Paste</CardTitle>
            <CardDescription>
              Share text with optional expiry and view limits
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Content Textarea */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Paste Content *
                </label>
                <Textarea
                  placeholder="Enter your text here... (markdown, code, etc.)"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  disabled={loading}
                  className="font-mono"
                />
                <p className="text-xs text-slate-500">
                  {content.length} characters
                </p>
              </div>

              {/* TTL Input */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                  Expiry (seconds)
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 3600 (1 hour)"
                    value={ttlSeconds}
                    onChange={(e) => setTtlSeconds(e.target.value)}
                    disabled={loading}
                    min="1"
                  />
                  <p className="text-xs text-slate-500">
                    Leave empty for no expiry
                  </p>
                </div>

                {/* Max Views Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Max Views
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 5"
                    value={maxViews}
                    onChange={(e) => setMaxViews(e.target.value)}
                    disabled={loading}
                    min="1"
                  />
                  <p className="text-xs text-slate-500">
                    Leave empty for unlimited
                  </p>
                </div>
              </div>

              {/* Error Alert */}
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertTitle className="text-red-800">Error</AlertTitle>
                  <AlertDescription className="text-red-700">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Success Alert */}
              {success && (
                <Alert className="border-green-200 bg-green-50">
                  <AlertTitle className="text-green-800">✓ Success!</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Your paste has been created! Redirecting...
                    <br />
                    <a
                      href={createdUrl}
                      className="font-semibold underline hover:no-underline"
                    >
                      {createdUrl}
                    </a>
                  </AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={loading || !content.trim()}
                  className="flex-1"
                  size="lg"
                >
                  {loading ? 'Creating...' : 'Create Paste'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}