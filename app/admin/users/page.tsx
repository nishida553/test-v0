"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, Search, Plus, Edit, Trash2, Key } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data
const users = [
  {
    id: "1",
    userId: "admin001",
    email: "admin@company.com",
    name: "管理者ユーザー",
    role: "Administrator",
    isAdmin: true,
    status: "有効",
    lastLogin: "2024-01-20 09:30",
  },
  {
    id: "2",
    userId: "user001",
    email: "user1@company.com",
    name: "一般ユーザー",
    role: "User",
    isAdmin: false,
    status: "有効",
    lastLogin: "2024-01-19 14:15",
  },
  {
    id: "3",
    userId: "user002",
    email: "user2@company.com",
    name: "別のユーザー",
    role: "User",
    isAdmin: false,
    status: "無効",
    lastLogin: "2024-01-15 11:20",
  },
]

export default function UserManagementPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    userId: "",
    email: "",
    name: "",
    role: "",
    isAdmin: false,
    password: "",
  })

  const filteredUsers = users.filter(
    (user) =>
      user.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreate = () => {
    toast({
      title: "ユーザーが作成されました",
      description: "新しいユーザーアカウントが正常に作成されました",
    })
    setIsCreateDialogOpen(false)
    setFormData({ userId: "", email: "", name: "", role: "", isAdmin: false, password: "" })
  }

  const handleEdit = (user: any) => {
    setSelectedUser(user)
    setFormData({
      userId: user.userId,
      email: user.email,
      name: user.name,
      role: user.role,
      isAdmin: user.isAdmin,
      password: "",
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdate = () => {
    toast({
      title: "ユーザーが更新されました",
      description: "ユーザー情報が正常に更新されました",
    })
    setIsEditDialogOpen(false)
    setSelectedUser(null)
  }

  const handleDelete = (user: any) => {
    if (confirm("Are you sure you want to delete this user?")) {
      toast({
        title: "ユーザーが削除されました",
        description: "ユーザーアカウントが正常に削除されました",
      })
    }
  }

  const handlePasswordReset = (user: any) => {
    if (confirm(`Reset password for ${user.name}?`)) {
      toast({
        title: "パスワードリセット",
        description: "ユーザーにパスワードリセットメールが送信されました",
      })
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">ユーザー管理</h1>
          <p className="text-muted-foreground">ユーザーアカウントと権限を管理</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            CSV出力
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                ユーザー追加
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>新規ユーザー作成</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="userId">ユーザーID</Label>
                  <Input
                    id="userId"
                    value={formData.userId}
                    onChange={(e) => setFormData((prev) => ({ ...prev, userId: e.target.value }))}
                    placeholder="ユーザーIDを入力"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="メールアドレスを入力"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">氏名</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="氏名を入力"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">役割</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="役割を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Administrator">管理者</SelectItem>
                      <SelectItem value="Manager">マネージャー</SelectItem>
                      <SelectItem value="User">ユーザー</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">パスワード</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    placeholder="パスワードを入力"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isAdmin"
                    checked={formData.isAdmin}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isAdmin: checked as boolean }))}
                  />
                  <Label htmlFor="isAdmin">管理者権限</Label>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleCreate}>ユーザー作成</Button>
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
            <CardTitle>ユーザー</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ユーザーを検索..."
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
                <TableHead>ユーザーID</TableHead>
                <TableHead>メールアドレス</TableHead>
                <TableHead>氏名</TableHead>
                <TableHead>役割</TableHead>
                <TableHead>管理者</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>最終ログイン</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.userId}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.isAdmin && <Badge>管理者</Badge>}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === "有効" ? "default" : "secondary"}>{user.status}</Badge>
                  </TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(user)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handlePasswordReset(user)}>
                        <Key className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(user)}>
                        <Trash2 className="h-4 w-4" />
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
            <DialogTitle>ユーザー編集</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="editUserId">ユーザーID</Label>
              <Input
                id="editUserId"
                value={formData.userId}
                onChange={(e) => setFormData((prev) => ({ ...prev, userId: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editEmail">メールアドレス</Label>
              <Input
                id="editEmail"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editName">氏名</Label>
              <Input
                id="editName"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editRole">役割</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Administrator">管理者</SelectItem>
                  <SelectItem value="Manager">マネージャー</SelectItem>
                  <SelectItem value="User">ユーザー</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="editIsAdmin"
                checked={formData.isAdmin}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isAdmin: checked as boolean }))}
              />
              <Label htmlFor="editIsAdmin">管理者権限</Label>
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={handleUpdate}>ユーザー更新</Button>
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
