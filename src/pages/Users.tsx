
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Edit, MoreHorizontal, Plus, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Warehouse Staff" | "Viewer";
  status: "Active" | "Inactive";
  lastLogin: string;
}

const initialUsers: User[] = [
  {
    id: "USR001",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2025-04-17 09:15",
  },
  {
    id: "USR002",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    role: "Warehouse Staff",
    status: "Active",
    lastLogin: "2025-04-16 14:22",
  },
  {
    id: "USR003",
    name: "Alex Wong",
    email: "alex.wong@example.com",
    role: "Warehouse Staff",
    status: "Inactive",
    lastLogin: "2025-04-10 11:05",
  },
  {
    id: "USR004",
    name: "Jessica Miller",
    email: "jessica.miller@example.com",
    role: "Viewer",
    status: "Active",
    lastLogin: "2025-04-15 16:48",
  },
  {
    id: "USR005",
    name: "David Thompson",
    email: "david.thompson@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2025-04-17 08:30",
  },
];

export default function Users() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<Partial<User>>({
    name: "",
    email: "",
    role: "Viewer",
    status: "Active",
  });
  const { toast } = useToast();

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) {
      toast({
        variant: "destructive",
        title: "Required fields missing",
        description: "Please fill in all required fields.",
      });
      return;
    }

    const newId = `USR${String(users.length + 1).padStart(3, "0")}`;
    const currentDate = new Date().toISOString().split("T")[0] + " " + new Date().toTimeString().split(" ")[0].substring(0, 5);
    
    const userToAdd: User = {
      id: newId,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role as "Admin" | "Warehouse Staff" | "Viewer",
      status: newUser.status as "Active" | "Inactive" || "Active",
      lastLogin: "Never",
    };

    setUsers([...users, userToAdd]);
    
    toast({
      title: "User added successfully",
      description: `${userToAdd.name} has been added as a ${userToAdd.role}.`,
    });
    
    setNewUser({
      name: "",
      email: "",
      role: "Viewer",
      status: "Active",
    });
    
    setIsAddUserOpen(false);
  };

  const handleEditUser = () => {
    if (!editingUser) return;
    
    const updatedUsers = users.map((user) =>
      user.id === editingUser.id ? editingUser : user
    );
    
    setUsers(updatedUsers);
    
    toast({
      title: "User updated successfully",
      description: `${editingUser.name}'s information has been updated.`,
    });
    
    setIsEditUserOpen(false);
    setEditingUser(null);
  };

  const handleStatusChange = (userId: string, status: "Active" | "Inactive") => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, status } : user
    );
    
    setUsers(updatedUsers);
    
    toast({
      title: `User ${status === "Active" ? "activated" : "deactivated"}`,
      description: `The user account has been ${status === "Active" ? "activated" : "deactivated"}.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user accounts and permissions
              </CardDescription>
            </div>
            <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Create a new user account and set appropriate permissions.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter full name"
                      value={newUser.name}
                      onChange={(e) =>
                        setNewUser({ ...newUser, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      value={newUser.email}
                      onChange={(e) =>
                        setNewUser({ ...newUser, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={newUser.role as string}
                      onValueChange={(value) =>
                        setNewUser({
                          ...newUser,
                          role: value as "Admin" | "Warehouse Staff" | "Viewer",
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Warehouse Staff">
                          Warehouse Staff
                        </SelectItem>
                        <SelectItem value="Viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={newUser.status === "Active"}
                        onCheckedChange={(checked) =>
                          setNewUser({
                            ...newUser,
                            status: checked ? "Active" : "Inactive",
                          })
                        }
                      />
                      <span>
                        {newUser.status === "Active" ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddUser}>Add User</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8 w-full md:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="border rounded-md overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              user.role === "Admin"
                                ? "bg-blue-500/15 text-blue-600 hover:bg-blue-500/20"
                                : user.role === "Warehouse Staff"
                                ? "bg-green-500/15 text-green-600 hover:bg-green-500/20"
                                : "bg-gray-500/15 text-gray-600 hover:bg-gray-500/20"
                            }
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              user.status === "Active"
                                ? "bg-green-500/15 text-green-600 hover:bg-green-500/20"
                                : "bg-red-500/15 text-red-600 hover:bg-red-500/20"
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell className="text-right">
                          <Dialog open={isEditUserOpen && editingUser?.id === user.id} onOpenChange={(open) => {
                            setIsEditUserOpen(open);
                            if (!open) setEditingUser(null);
                          }}>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DialogTrigger asChild>
                                  <DropdownMenuItem
                                    onClick={() => setEditingUser(user)}
                                  >
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                </DialogTrigger>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(
                                      user.id,
                                      user.status === "Active"
                                        ? "Inactive"
                                        : "Active"
                                    )
                                  }
                                >
                                  {user.status === "Active"
                                    ? "Deactivate"
                                    : "Activate"}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    toast({
                                      title: "Password reset link sent",
                                      description: `A reset link has been sent to ${user.email}.`,
                                    });
                                  }}
                                >
                                  Reset Password
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit User</DialogTitle>
                                <DialogDescription>
                                  Update user details and permissions.
                                </DialogDescription>
                              </DialogHeader>
                              {editingUser && (
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-name">Full Name</Label>
                                    <Input
                                      id="edit-name"
                                      placeholder="Enter full name"
                                      value={editingUser.name}
                                      onChange={(e) =>
                                        setEditingUser({
                                          ...editingUser,
                                          name: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-email">Email</Label>
                                    <Input
                                      id="edit-email"
                                      type="email"
                                      placeholder="email@example.com"
                                      value={editingUser.email}
                                      onChange={(e) =>
                                        setEditingUser({
                                          ...editingUser,
                                          email: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-role">Role</Label>
                                    <Select
                                      value={editingUser.role}
                                      onValueChange={(value) =>
                                        setEditingUser({
                                          ...editingUser,
                                          role: value as
                                            | "Admin"
                                            | "Warehouse Staff"
                                            | "Viewer",
                                        })
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select role" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Admin">Admin</SelectItem>
                                        <SelectItem value="Warehouse Staff">
                                          Warehouse Staff
                                        </SelectItem>
                                        <SelectItem value="Viewer">Viewer</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-status">Status</Label>
                                    <div className="flex items-center space-x-2">
                                      <Switch
                                        checked={editingUser.status === "Active"}
                                        onCheckedChange={(checked) =>
                                          setEditingUser({
                                            ...editingUser,
                                            status: checked ? "Active" : "Inactive",
                                          })
                                        }
                                      />
                                      <span>
                                        {editingUser.status === "Active"
                                          ? "Active"
                                          : "Inactive"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <DialogFooter>
                                <Button variant="outline" onClick={() => {
                                  setIsEditUserOpen(false);
                                  setEditingUser(null);
                                }}>
                                  Cancel
                                </Button>
                                <Button onClick={handleEditUser}>Save Changes</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No users found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
