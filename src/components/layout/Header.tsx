
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { useLocation } from "react-router-dom";

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
    <header className="border-b bg-background h-16 px-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold">{getPageTitle(location.pathname)}</h1>
      
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
              2
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start">
              <span className="font-medium">Low Stock Alert</span>
              <span className="text-xs text-muted-foreground">SKU-1001 is below threshold</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start">
              <span className="font-medium">Upload Successful</span>
              <span className="text-xs text-muted-foreground">Inbound file processed</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarFallback>WA</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Warehouse Admin</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
