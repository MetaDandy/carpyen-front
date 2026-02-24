export const breadcrumb = {
    dashboard: { label: 'Dashboard', path: '/dashboard' },
    users: { label: 'Usuarios', path: '/users' },
    user: (userId: string, userName: string) => ({ label: userName, path: `/users/${userId}` }),
    inventory:{
        materials: { label: 'Materiales', path: '/inventory/materials' },
        material: (materialId: string, materialName: string) => ({ label: materialName, path: `/inventory/materials/${materialId}` }),
    }
}