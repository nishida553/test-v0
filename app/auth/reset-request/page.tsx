"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export default function ResetRequestPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Mock password reset request
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
    }, 1000)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>リセットリンクを送信しました</CardTitle>
            <CardDescription>パスワードリセットの手順についてメールをご確認ください</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertDescription>
                そのメールアドレスのアカウントが存在する場合、まもなくパスワードリセットリンクが送信されます。
              </AlertDescription>
            </Alert>
            <div className="mt-4 text-center">
              <Link href="/auth/login" className="text-sm text-blue-600 hover:underline">
                ログインに戻る
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>パスワードリセット</CardTitle>
          <CardDescription>パスワードリセットリンクを受信するメールアドレスを入力してください</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "送信中..." : "リセットリンクを送信"}
            </Button>

            <div className="text-center">
              <Link href="/auth/login" className="text-sm text-blue-600 hover:underline">
                ログインに戻る
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
