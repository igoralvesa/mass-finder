import { ReactNode } from "react";
import { Button } from "./ui/button";
import { LucideIcon } from "lucide-react";

interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface SidebarLayoutProps {
  items: SidebarItem[];
  activeItem: string;
  onItemClick: (id: string) => void;
  children: ReactNode;
}

export function SidebarLayout({ items, activeItem, onItemClick, children }: SidebarLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card/30 backdrop-blur-sm">
        <nav className="p-4 space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start gap-2 ${
                  isActive ? "bg-primary shadow-sm" : "hover:bg-accent/50"
                }`}
                onClick={() => onItemClick(item.id)}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}