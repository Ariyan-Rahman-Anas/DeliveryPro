import { Package } from 'lucide-react'
import { NavLink } from 'react-router'

const Logo = () => {
    return (
        <NavLink to="/" className="flex items-center gap-1.5">
            {() => (
                <>
                    <div className="bg-primary p-2 rounded-lg">
                        <Package className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">DeliveryPro</h1>
                        <p className="text-sm text-gray-300/95">Fast & Secure</p>
                    </div>
                </>
            )}
        </NavLink>
    )
}
export default Logo