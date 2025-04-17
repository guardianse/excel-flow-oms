
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Bell, ChevronDown, HelpCircle, LayoutDashboard, LogOut, Settings, User } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Header() {
  const location = useLocation();
  
  // Map routes to titles
  const getPageTitle = (path: string) => {
    const routes: Record<string, string> = {
      '/': 'Dashboard',
      '/inbound': 'Inbound Management',
      '/outbound': 'Outbound Management',
      '/reports': 'Reports & Analytics',
      '/users': 'User Management',
      '/settings': 'System Settings',
      '/login': 'Login',
    };
    
    return routes[path] || 'Excel-Flow OMS';
  };

  return (
    <header className="border-b bg-background h-16 px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <h1 className="text-xl font-semibold">{getPageTitle(location.pathname)}</h1>
        {location.pathname === "/" && (
          <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary hover:bg-primary/20 hidden md:flex">
            Beta
          </Badge>
        )}
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        {/* Help */}
        <Button variant="ghost" size="icon" className="hidden md:flex">
          <HelpCircle className="h-5 w-5 text-muted-foreground" />
        </Button>
        
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                2
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              <Badge variant="outline" className="font-normal">2 new</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                <div className="flex items-start gap-2 w-full">
                  <div className="rounded-full bg-red-100 p-1.5 mt-0.5">
                    <Settings className="h-3.5 w-3.5 text-red-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-sm">Low Stock Alert</p>
                    <p className="text-xs text-muted-foreground">SKU-1001 is below threshold (5 remaining)</p>
                    <p className="text-xs text-muted-foreground/60">10 minutes ago</p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                <div className="flex items-start gap-2 w-full">
                  <div className="rounded-full bg-green-100 p-1.5 mt-0.5">
                    <LayoutDashboard className="h-3.5 w-3.5 text-green-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-sm">Upload Successful</p>
                    <p className="text-xs text-muted-foreground">inbound-vendor-a-20250415.xlsx processed</p>
                    <p className="text-xs text-muted-foreground/60">25 minutes ago</p>
                  </div>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-sm font-medium text-center cursor-pointer">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="pl-2 pr-0 gap-2 flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatar-placeholder.png" />
                <AvatarFallback>WA</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-left hidden md:flex">
                <span className="text-sm font-medium">Warehouse Admin</span>
                <span className="text-xs text-muted-foreground">admin@example.com</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
