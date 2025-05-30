"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function ShippingInstructionRegistrationPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    orderNumber: "",
    shipmentDate: "",
    shipmentTime: "午前",
    truckNumber: "",
    carrier: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.orderNumber || !formData.shipmentDate || !formData.truckNumber || !formData.carrier) {
      toast({
        title: "入力エラー",
        description: "必須項目をすべて入力してください",
        variant: "destructive",
      })
      return
    }

    // Mock shipping instruction creation
    toast({
      title: "配送指示が作成されました",
      description: "配送指示が正常に登録されました",
    })

    router.push("/shipping/instructions")
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">配送指示登録</h1>
        <p className="text-muted-foreground">新しい配送指示を作成</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>配送指示詳細</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="orderNumber">受注番号 *</Label>
                <Select
                  value={formData.orderNumber}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, orderNumber: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="受注番号を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-001">2024-001 (ABC商事)</SelectItem>
                    <SelectItem value="2024-002">2024-002 (XYZ株式会社)</SelectItem>
                    <SelectItem value="2024-003">2024-003 (DEF工業)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shipmentDate">出荷日 *</Label>
                <Input
                  id="shipmentDate"
                  type="date"
                  value={formData.shipmentDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, shipmentDate: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shipmentTime">出荷時間 *</Label>
                <RadioGroup
                  value={formData.shipmentTime}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, shipmentTime: value }))}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="午前" id="morning" />
                    <Label htmlFor="morning">午前</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="午後" id="afternoon" />
                    <Label htmlFor="afternoon">午後</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="truckNumber">トラック番号 *</Label>
                <Input
                  id="truckNumber"
                  value={formData.truckNumber}
                  onChange={(e) => setFormData((prev) => ({ ...prev, truckNumber: e.target.value }))}
                  placeholder="トラック番号を入力"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="carrier">運送会社 *</Label>
                <Select
                  value={formData.carrier}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, carrier: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="運送会社を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="運送会社1">運送会社1</SelectItem>
                    <SelectItem value="運送会社2">運送会社2</SelectItem>
                    <SelectItem value="運送会社3">運送会社3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">備考</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="追加の備考を入力"
                rows={3}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit">配送指示登録</Button>
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
