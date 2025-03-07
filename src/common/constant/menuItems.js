import { BookOpenText, CircleEllipsis, BedDouble, CarFront, LayoutDashboard, GraduationCap, UtensilsCrossed } from "lucide-react";

export const getMenuItems =  (t) => {
    return  [
        {
            title: t('Dashboard'),
            type: '',
            href: '/home',
            icon: <LayoutDashboard size={18} />,
            tooltip: t('Dashboard')
        },
        {
            title: t('Restaurant'),
            type: 'Restaurant',
            href: '#',
            icon: <UtensilsCrossed size={18} />,
            tooltip: t('Restaurant')
        },
        {
            title: t('Hotel'),
            type: 'Hotel',
            href: '#',
            icon: <BedDouble size={18} />,
            tooltip: t('Hotel')
        },
        {
            title: t('CarShowroom'),
            type: 'Car Showroom',
            href: '#',
            icon:<CarFront size={18} />,
            tooltip: t('CarShowroom')
        },
        {
            title: t('Teacher'),
            type: 'Teacher',
            href: '#',
            icon: <BookOpenText size={18} />,
            tooltip: t('Teacher')
        },
        {
            title: t('Student'),
            type: 'Student',
            href: '#',
            icon: <GraduationCap size={18} />,
            tooltip: t('Student')
        },
        {
            title: t('SeeMore'),
            href: '/category/see-more',
            icon: <CircleEllipsis size={18} />,
            tooltip: t('SeeMore')
        },
        // {
        //     title: t('Settings'),
        //     href: '/settings',
        //     icon: <Settings size={18} />,
        //     tooltip: t('Settings')
        // }
    ]
}