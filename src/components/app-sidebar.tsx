"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"

import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react"

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"

export function AppSidebar() {
  const pathname = usePathname()

  // ✅ NAV CONFIG (same file)
  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Blogs",
      icon: FileText,
      children: [
        { title: "All Blogs", href: "/admin/blogs" },
        { title: "Create Blog", href: "/admin/blogs/create" },
        { title: "Categories", href: "/admin/categories" },
      ],
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  return (
    <Sidebar collapsible="icon">
      {/* HEADER */}
      <SidebarHeader>
        <div className="px-4 py-3 text-lg font-bold">
          Admin Panel
        </div>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>

          <SidebarMenu>
            {navItems.map((item) => {
              const isParentActive =
                item.children &&
                item.children.some((child) =>
                  pathname.startsWith(child.href)
                )

              // 🔹 SIMPLE ITEM
              if (!item.children) {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                    >
                      <Link href={item.href!}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              }

              // 🔹 DROPDOWN ITEM
              return (
                <Collapsible
                  key={item.title}
                  defaultOpen={isParentActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton isActive={isParentActive}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.children.map((sub) => (
                          <SidebarMenuSubItem key={sub.href}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={pathname === sub.href}
                            >
                              <Link href={sub.href}>
                                {sub.title}
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <LogOut className="size-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}