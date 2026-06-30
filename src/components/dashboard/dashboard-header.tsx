'use client'

import Link from 'next/link'
import { Fragment } from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useBreadcrumb } from '@/hooks/use-breadcrumb'

export function DashboardHeader() {
    const breadcrumbs = useBreadcrumb()

    return (
        <header className='sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator
                orientation='vertical'
                className='mr-2 data-vertical:h-4 data-vertical:self-auto'
            />
            <Breadcrumb>
                <BreadcrumbList>
                    {breadcrumbs.map(item => (
                        <Fragment key={item.href}>
                            <BreadcrumbItem>
                                {item.isLast ? (
                                    <BreadcrumbPage>
                                        {item.label}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink
                                        render={<Link href={item.href} />}
                                    >
                                        {item.label}
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!item.isLast && <BreadcrumbSeparator />}
                        </Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </header>
    )
}
