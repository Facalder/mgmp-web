import {
    BookOpenIcon,
    CodeIcon,
    HammerIcon,
    StackIcon,
    UsersIcon
} from '@phosphor-icons/react'

export const sidebarNavData = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg'
    },
    versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
    navMain: [
        {
            title: 'Getting Started',
            url: '#',
            icon: BookOpenIcon,
            items: [
                {
                    title: 'Installation',
                    url: '#'
                },
                {
                    title: 'Project Structure',
                    url: '#'
                }
            ]
        },
        {
            title: 'Build Your Application',
            url: '#',
            icon: HammerIcon,
            items: [
                {
                    title: 'Routing',
                    url: '#'
                },
                {
                    title: 'Data Fetching',
                    url: '#',
                    isActive: true
                },
                {
                    title: 'Rendering',
                    url: '#'
                },
                {
                    title: 'Caching',
                    url: '#'
                },
                {
                    title: 'Styling',
                    url: '#'
                },
                {
                    title: 'Optimizing',
                    url: '#'
                },
                {
                    title: 'Configuring',
                    url: '#'
                },
                {
                    title: 'Testing',
                    url: '#'
                },
                {
                    title: 'Authentication',
                    url: '#'
                },
                {
                    title: 'Deploying',
                    url: '#'
                },
                {
                    title: 'Upgrading',
                    url: '#'
                },
                {
                    title: 'Examples',
                    url: '#'
                }
            ]
        },
        {
            title: 'API Reference',
            url: '#',
            icon: CodeIcon,
            items: [
                {
                    title: 'Components',
                    url: '#'
                },
                {
                    title: 'File Conventions',
                    url: '#'
                },
                {
                    title: 'Functions',
                    url: '#'
                },
                {
                    title: 'next.config.js Options',
                    url: '#'
                },
                {
                    title: 'CLI',
                    url: '#'
                },
                {
                    title: 'Edge Runtime',
                    url: '#'
                }
            ]
        },
        {
            title: 'Architecture',
            url: '#',
            icon: StackIcon,
            items: [
                {
                    title: 'Accessibility',
                    url: '#'
                },
                {
                    title: 'Fast Refresh',
                    url: '#'
                },
                {
                    title: 'Next.js Compiler',
                    url: '#'
                },
                {
                    title: 'Supported Browsers',
                    url: '#'
                },
                {
                    title: 'Turbopack',
                    url: '#'
                }
            ]
        },
        {
            title: 'Community',
            url: '#',
            icon: UsersIcon,
            items: [
                {
                    title: 'Contribution Guide',
                    url: '#'
                }
            ]
        }
    ]
}
