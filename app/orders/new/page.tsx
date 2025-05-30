"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function OrderRegistrationPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    specialStore: "",
    customer: "",
    oilBusinessOffice: "",
    quantity: "",
    deliveryDate: "",
    deliveryTimeAM: false,
    deliveryTimePM: false,
    transportCompany: "",
    remarks: "",
  })

  const handleQuantityChange = (value: string) => {
    // Convert full-width numbers to half-width
    const halfWidth = value.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0))
    setFormData((prev) => ({ ...prev, quantity: halfWidth }))
  }

  const calculateFreight = () => {
    // Simple freight calculation
    const qty = Number.parseInt(formData.quantity) || 0
    return qty * 10 // $10 per unit
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.specialStore || !formData.oilBusinessOffice || !formData.quantity) {
      toast({
        title: "入力エラー",
        description: "必須項目をすべて入力してください",
        variant: "destructive",
      })
      return
    }

    if (!formData.deliveryTimeAM && !formData.deliveryTimePM) {
      toast({
        title: "入力エラー",
        description: "配送時間を少なくとも1つ選択してください",
        variant: "destructive",
      })
      return
    }

    // Mock order creation
    toast({
      title: "受注が作成されました",
      description: "受注が正常に登録されました",
    })

    router.push("/orders")
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">受注登録</h1>
        <p className="text-muted-foreground">新しい受注を作成</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>受注詳細</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="specialStore">特約店 *</Label>
                <Select
                  value={formData.specialStore}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, specialStore: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="特約店を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="store-a">店舗A</SelectItem>
                    <SelectItem value="store-b">店舗B</SelectItem>
                    <SelectItem value="store-c">店舗C</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customer">顧客</Label>
                <Select
                  value={formData.customer}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, customer: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="顧客を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="abc-corp">ABC株式会社</SelectItem>
                    <SelectItem value="xyz-ltd">XYZ有限会社</SelectItem>
                    <SelectItem value="def-inc">DEFインダストリー</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="oilBusinessOffice">石油営業所 *</Label>
                <Select
                  value={formData.oilBusinessOffice}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, oilBusinessOffice: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="営業所を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="office-1">営業所1</SelectItem>
                    <SelectItem value="office-2">営業所2</SelectItem>
                    <SelectItem value="office-3">営業所3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">数量 *</Label>
                <Input
                  id="quantity"
                  type="text"
                  value={formData.quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  placeholder="数量を入力"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deliveryDate">希望配送日 *</Label>
                <Input
                  id="deliveryDate"
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, deliveryDate: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label>配送時間 *</Label>
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="am"
                      checked={formData.deliveryTimeAM}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, deliveryTimeAM: checked as boolean }))
                      }
                    />
                    <Label htmlFor="am">AM</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pm"
                      checked={formData.deliveryTimePM}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, deliveryTimePM: checked as boolean }))
                      }
                    />
                    <Label htmlFor="pm">PM</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transportCompany">運送会社</Label>
                <Select
                  value={formData.transportCompany}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, transportCompany: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="運送会社を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="carrier-1">運送会社1</SelectItem>
                    <SelectItem value="carrier-2">運送会社2</SelectItem>
                    <SelectItem value="carrier-3">運送会社3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>配送料見積</Label>
                <div className="p-2 bg-gray-50 rounded">${calculateFreight()}</div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="remarks">備考</Label>
              <Textarea
                id="remarks"
                value={formData.remarks}
                onChange={(e) => setFormData((prev) => ({ ...prev, remarks: e.target.value }))}
                placeholder="追加の備考を入力"
                rows={3}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit">受注登録</Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                キャンセル
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
