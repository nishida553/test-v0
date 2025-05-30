"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Download, Search, Plus, Edit, Trash2, Upload, History } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data
const products = [
  {
    id: "1",
    code: "PRD-001",
    name: "プレミアムオイルA",
    unitPrice: 25.5,
    effectiveDate: "2024-01-01",
    version: 1,
    status: "有効",
  },
  {
    id: "2",
    code: "PRD-002",
    name: "スタンダードオイルB",
    unitPrice: 18.75,
    effectiveDate: "2024-01-01",
    version: 1,
    status: "有効",
  },
  {
    id: "3",
    code: "PRD-003",
    name: "エコノミーオイルC",
    unitPrice: 12.25,
    effectiveDate: "2024-01-01",
    version: 2,
    status: "有効",
  },
]

export default function ProductMasterPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    unitPrice: "",
    effectiveDate: "",
  })

  const filteredProducts = products.filter(
    (product) =>
      product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreate = () => {
    toast({
      title: "商品が作成されました",
      description: "新しい商品が正常に追加されました",
    })
    setIsCreateDialogOpen(false)
    setFormData({ code: "", name: "", unitPrice: "", effectiveDate: "" })
  }

  const handleEdit = (product: any) => {
    setSelectedProduct(product)
    setFormData({
      code: product.code,
      name: product.name,
      unitPrice: product.unitPrice.toString(),
      effectiveDate: product.effectiveDate,
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdate = () => {
    toast({
      title: "商品が更新されました",
      description: "商品情報が正常に更新されました",
    })
    setIsEditDialogOpen(false)
    setSelectedProduct(null)
  }

  const handleDelete = (product: any) => {
    if (confirm("Are you sure you want to delete this product?")) {
      toast({
        title: "商品が削除されました",
        description: "商品が正常に削除されました",
      })
    }
  }

  const exportCSV = () => {
    toast({
      title: "出力を開始しました",
      description: "CSVファイルを生成中です",
    })
  }

  const importCSV = () => {
    toast({
      title: "取込を開始しました",
      description: "CSVファイルを処理中です",
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">商品マスタ</h1>
          <p className="text-muted-foreground">商品コード、名称、価格を管理</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportCSV} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            CSV出力
          </Button>
          <Button onClick={importCSV} variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            CSV取込
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                商品追加
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>新規商品作成</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">商品コード</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData((prev) => ({ ...prev, code: e.target.value }))}
                    placeholder="商品コードを入力"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">商品名</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="商品名を入力"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unitPrice">単価</Label>
                  <Input
                    id="unitPrice"
                    type="number"
                    step="0.01"
                    value={formData.unitPrice}
                    onChange={(e) => setFormData((prev) => ({ ...prev, unitPrice: e.target.value }))}
                    placeholder="単価を入力"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="effectiveDate">有効開始日</Label>
                  <Input
                    id="effectiveDate"
                    type="date"
                    value={formData.effectiveDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, effectiveDate: e.target.value }))}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleCreate}>商品作成</Button>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    キャンセル
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>商品</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="商品を検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>商品コード</TableHead>
                <TableHead>商品名</TableHead>
                <TableHead>単価</TableHead>
                <TableHead>有効開始日</TableHead>
                <TableHead>バージョン</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.code}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.unitPrice}</TableCell>
                  <TableCell>{product.effectiveDate}</TableCell>
                  <TableCell>v{product.version}</TableCell>
                  <TableCell>
                    <Badge variant={product.status === "有効" ? "default" : "secondary"}>{product.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(product)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(product)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <History className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>商品編集</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="editCode">商品コード</Label>
              <Input
                id="editCode"
                value={formData.code}
                onChange={(e) => setFormData((prev) => ({ ...prev, code: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editName">商品名</Label>
              <Input
                id="editName"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editUnitPrice">単価</Label>
              <Input
                id="editUnitPrice"
                type="number"
                step="0.01"
                value={formData.unitPrice}
                onChange={(e) => setFormData((prev) => ({ ...prev, unitPrice: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editEffectiveDate">有効開始日</Label>
              <Input
                id="editEffectiveDate"
                type="date"
                value={formData.effectiveDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, effectiveDate: e.target.value }))}
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={handleUpdate}>商品更新</Button>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                キャンセル
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
