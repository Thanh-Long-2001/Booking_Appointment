export const adminMenu = [
    { 
        name: 'Hệ thống người dùng',
        menus: [

            {
                name: 'Quản lý người dùng', link: '/system/user-manage',
            },
            {
                name: 'Quản lý thông tin bác sĩ', link: '/system/manage-doctor',
               
            },

            { //quản lý kế hoạch khám bệnh bác sĩ
                name: 'Thống kê', link: '/system/manage-statistical',
            }
        ]
    },
    { 
        name: 'Phòng khám',
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic',
            },
        ]
    },
    { 
        name: 'Dịch vụ chăm sóc',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty',
            },
        ]
    },
    { 
        name: 'Cẩm nang',
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook',
            },
        ]
    },
];

export const doctorMenu = [
    {
        name: 'menu.doctor.manage-doctor',
        menus: [
            { 
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule',
            },
            { 
                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient',
            }
        ]
    }
];

export const userMenu = [
    {
        name: 'Quản lý người dùng',
        menus: [
            { 
                name: 'Quản lý thông tin người dùng', link: '/user/manage-info',
            },
            { //quản lý đơn khám
                name: 'Quản lý thông tin lịch khám', link: '/user/manage-booking',
            }
        ]
    }
];