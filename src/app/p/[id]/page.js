'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { use } from 'react'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert'
import { pasteAPI } from '@/app/lib/api'

export default function ViewPaste({ params }) {
  const { id } = use(params)
  const [paste, setPaste] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchPaste = async () => {
      setLoading(true)
      setError('')

      try {
        const result = await pasteAPI.getPaste(id)

        if (result.success) {
          setPaste(result.data)
        } else {
          if (result.status === 404) {
            setError('Paste not found or has expired')
          } else {
            setError(result.error || 'Failed to fetch paste')
          }
        }
      } catch (err) {
        setError('An unexpected error occurred')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPaste()
    }
  }, [id])

  const handleCopy = async () => {
    if (paste?.content) {
      try {
        await navigator.clipboard.writeText(paste.content)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }
  }

  const handleDownload = () => {
    if (paste?.content) {
      const element = document.createElement('a')
      element.setAttribute(
        'href',
        'data:text/plain;charset=utf-8,' + encodeURIComponent(paste.content)
      )
      element.setAttribute('download', `paste-${id}.txt`)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <span className="text-slate-700">Loading paste...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <Card className="bg-white shadow-2xl">
            <CardHeader className="border-b border-slate-200">
              <CardTitle className="text-red-600">❌ Error</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <Alert className="border-red-200 bg-red-50">
                <AlertTitle className="text-red-800">Paste Not Found</AlertTitle>
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>

              <Link href="/">
                <Button className="w-full" size="lg">
                  ← Create New Paste
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
            📝 Pastebin Lite
          </h1>
          <p className="text-slate-600">
            Paste ID: <code className="bg-slate-200 px-2 py-1 rounded text-sm">{id}</code>
          </p>
        </div>

        {/* Main Card */}
        <Card className="bg-white shadow-2xl">
          <CardHeader className="border-b border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Paste Content</CardTitle>
                <CardDescription>
                  {paste?.expires_at && (
                    <span>Expires: {new Date(paste.expires_at).toLocaleString()}</span>
                  )}
                  {paste?.remaining_views !== null && paste?.remaining_views !== undefined && (
                    <span className="ml-4">Remaining views: {paste.remaining_views}</span>
                  )}
                </CardDescription>
              </div>
              <Link href="/">
                <Button variant="outline" size="sm">
                  + New Paste
                </Button>
              </Link>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            {paste && (
              <div className="space-y-4">
                {/* Content Display */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
                  <pre className="p-4 overflow-x-auto font-mono text-sm text-slate-800 whitespace-pre-wrap break-words max-h-96 overflow-y-auto">
                    {paste.content}
                  </pre>
                </div>

                {/* Warning if views are limited */}
                {paste.remaining_views !== null && paste.remaining_views <= 3 && (
                  <Alert className="border-yellow-200 bg-yellow-50">
                    <AlertTitle className="text-yellow-800">Limited Views</AlertTitle>
                    <AlertDescription className="text-yellow-700">
                      This paste will expire after {paste.remaining_views} more {paste.remaining_views === 1 ? 'view' : 'views'}.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 flex-wrap">
                  <Button
                    onClick={handleCopy}
                    variant="default"
                    className="flex-1 min-w-[150px]"
                  >
                    {copied ? '✓ Copied!' : 'Copy Content'}
                  </Button>
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    className="flex-1 min-w-[150px]"
                  >
                    Download
                  </Button>
                </div>

                {/* Share Section */}
                <div className="mt-6 pt-6 border-t border-slate-200 space-y-2">
                  <p className="text-sm font-medium text-slate-700">Share This Paste</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={`${typeof window !== 'undefined' ? window.location.origin : ''}/p/${id}`}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono bg-slate-50"
                    />
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(`${typeof window !== 'undefined' ? window.location.origin : ''}/p/${id}`)
                        setCopied(true)
                        setTimeout(() => setCopied(false), 2000)
                      }}
                      size="sm"
                    >
                      {copied ? '✓' : 'Copy'}
                    </Button>
                  </div>
                </div>

                {/* Metadata */}
                <div className="mt-6 pt-6 border-t border-slate-200 space-y-1">
                  <p className="text-xs text-slate-500">Content is safely displayed (no script execution)</p>
                  <p className="text-xs text-slate-500">Paste will be automatically deleted after expiry or view limit</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}