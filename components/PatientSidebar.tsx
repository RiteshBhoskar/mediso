"use client"

import {
  BadgeCheck,
  Bell,
  Calendar,
  ChevronRight,
  ChevronsUpDown,
  CreditCard,
  FileText,
  Heart,
  HeadphonesIcon,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  MessageSquare,
  MoreHorizontal,
  Pill,
  Send,
  Settings2,
  Share,
  Sparkles,
  Stethoscope,
  User,
  Users,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { signOut, useSession } from "next-auth/react"
import { useState } from "react"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "#",
        },
        {
          title: "Health Summary",
          url: "#",
        },
        {
          title: "Notifications",
          url: "#",
        },
      ],
    },
    {
      title: "Appointments",
      url: "#",
      icon: Calendar,
      items: [
        {
          title: "Upcoming",
          url: "#",
        },
        {
          title: "Book New",
          url: "#",
        },
        {
          title: "History",
          url: "#",
        },
      ],
    },
    {
      title: "Medical Records",
      url: "#",
      icon: FileText,
      items: [
        {
          title: "Test Results",
          url: "#",
        },
        {
          title: "Prescriptions",
          url: "#",
        },
        {
          title: "Immunizations",
          url: "#",
        },
        {
          title: "Allergies",
          url: "#",
        },
      ],
    },
    {
      title: "Messages",
      url: "#",
      icon: MessageSquare,
      items: [
        {
          title: "Inbox",
          url: "#",
        },
        {
          title: "Sent",
          url: "#",
        },
        {
          title: "Compose",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Profile",
          url: "#",
        },
        {
          title: "Preferences",
          url: "#",
        },
        {
          title: "Privacy",
          url: "#",
        },
        {
          title: "Notifications",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Help Center",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Contact Support",
      url: "#",
      icon: HeadphonesIcon,
    },
  ],
  quickAccess: [
    {
      name: "My Doctors",
      url: "#",
      icon: Stethoscope,
    },
    {
      name: "Medications",
      url: "#",
      icon: Pill,
    },
    {
      name: "Emergency Contacts",
      url: "#",
      icon: Users,
    },
  ],
}

interface ParentProps {
  Component: React.ComponentType;
}

export default function PatientSidebar({ Component } : ParentProps) {

  const {data: session , status } = useSession();
  const [ isSigningOut, setIsSigningOut ]= useState(false);
  async function handleSignout(){
      if(isSigningOut) return;
      setIsSigningOut(true);
      await signOut({callbackUrl: "/"});
      setIsSigningOut(false);
  }

  return (
    <>
    <SidebarProvider>
      <Sidebar variant="inset" className="fixed top-0 left-0 h-auto w-64 border-r bg-gray-50 shadow-lg z-10 mt-20">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white">
                    <Avatar>
                      <AvatarImage
                        src="/activity.png"
                        alt="heartbeat image" />
                    </Avatar>
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Patient Portal</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="relative">
          <SidebarGroup>
            <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                    {item.items?.length ? (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuAction className="data-[state=open]:rotate-90">
                            <ChevronRight />
                            <span className="sr-only">Toggle</span>
                          </SidebarMenuAction>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <a href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Quick Access</SidebarGroupLabel>
            <SidebarMenu>
              {data.quickAccess.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction showOnHover>
                        <MoreHorizontal />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-48"
                      side="bottom"
                      align="end"
                    >
                      <DropdownMenuItem>
                        <User className="text-muted-foreground" />
                        <span>View Details</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share className="text-muted-foreground" />
                        <span>Share</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Heart className="text-muted-foreground" />
                        <span>Add to Favorites</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <MoreHorizontal />
                  <span>More Options</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <SidebarMenu>
                {data.navSecondary.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild size="sm">
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                      src="/circle-user.png"
                       alt="User profile picture" />
                      <AvatarFallback className="rounded-lg">P</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {session?.user.name}
                      </span>
                      <span className="truncate text-xs">
                        {session?.user.email}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src="/circle-user.png"
                          alt="User profile picture" />
                        <AvatarFallback className="rounded-lg">
                          P
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                        {session?.user.name}
                        </span>
                        <span className="truncate text-xs">
                          {session?.user.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Sparkles />
                      Upgrade to Premium
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <BadgeCheck />
                      My Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut />
                    <button onClick={handleSignout}  disabled={isSigningOut}>
                        {isSigningOut ? "Signing Out" : "Sign Out"}
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Health Summary</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main>
          <Component />
        </main>
      </SidebarInset>
    </SidebarProvider></>
  )
}