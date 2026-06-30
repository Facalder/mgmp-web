'use client'

import { CaretRightIcon, CommandIcon } from '@phosphor-icons/react'
import Link from 'next/link'
import type * as React from 'react'
import { NavUser } from '@/components/dashboard/nav-user'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '@/components/ui/collapsible'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail
} from '@/components/ui/sidebar'
import { sidebarNavData } from '@/constants/sidebar-data'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            className='data-[slot=sidebar-menu-button]:p-1.5!'
                            render={
                                <Link href='/dashboard'>
                                    <CommandIcon className='size-5!' />
                                    <span className='text-base font-semibold'>
                                        Acme Inc.
                                    </span>
                                </Link>
                            }
                        />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className='gap-0'>
                {sidebarNavData.navMain.map(item => (
                    <Collapsible
                        key={item.title}
                        title={item.title}
                        defaultOpen
                        className='group/collapsible'
                    >
                        <SidebarGroup>
                            <SidebarGroupLabel
                                className='group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                                render={<CollapsibleTrigger />}
                            >
                                {item.icon && (
                                    <item.icon className='mr-2 h-4 w-4' />
                                )}
                                <span>{item.title}</span>
                                <CaretRightIcon className='ml-auto transition-transform group-data-open/collapsible:rotate-90' />
                            </SidebarGroupLabel>
                            <CollapsibleContent>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {item.items.map(item => (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton
                                                    isActive={item.isActive}
                                                    render={
                                                        <a href={item.url}>
                                                            {item.title}
                                                        </a>
                                                    }
                                                />
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={sidebarNavData.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
