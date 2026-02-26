export const breadcrumb = {
    dashboard: { label: 'Dashboard', path: '/dashboard' },
    users: { label: 'Usuarios', path: '/users' },
    user: (userId: string, userName: string) => ({ label: userName, path: `/users/${userId}` }),
    inventory: {
        
        products: { label: 'Productos', path: '/inventory/products' },
        product: (productId: string, productName: string) => ({ label: productName, path: `/inventory/products/${productId}` }),

        materials: { label: 'Materiales', path: '/inventory/materials' },
        material: (materialId: string, materialName: string) => ({ label: materialName, path: `/inventory/materials/${materialId}` }),
    }
}