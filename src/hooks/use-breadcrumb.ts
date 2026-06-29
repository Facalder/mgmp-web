import { usePathname } from 'next/navigation'

const formatSegment = (segment: string) => {
    return segment
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase())
}

export interface BreadcrumbItemData {
    href: string
    label: string
    isLast: boolean
}

export function useBreadcrumb(): BreadcrumbItemData[] {
    const pathname = usePathname()
    const segments = pathname.split('/').filter(Boolean)

    return segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join('/')}`
        const label = formatSegment(segment)
        const isLast = index === segments.length - 1
        return { href, label, isLast }
    })
}
