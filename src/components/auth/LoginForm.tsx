import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUserLoginMutation } from "@/redux/features/auth/authApi"
import { Link } from "react-router"
import { useForm } from "react-hook-form"
import PasswordField from "./PasswordField"

interface LoginFormData {
    email: string
    password: string
}

const LoginForm = () => {
    const { register, handleSubmit } = useForm<LoginFormData>()

    const [userLogin, { isLoading }] = useUserLoginMutation()

    const handleFormSubmit = async (data: LoginFormData) => {
        console.log(data) // Now this will include both email and password
        // userLogin(data) // Uncomment when ready to use

        try {
            const loginRes = await userLogin(data).unwrap()
            console.log({ loginRes })
        } catch (error) {
            console.log({ error })
        }
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
                <CardAction>
                    <Link to="/registration">
                        <Button variant="link" className="cursor-pointer">
                            Registration
                        </Button>
                    </Link>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                {...register("email", { required: true })}
                            />
                        </div>

                        <PasswordField
                            id="password"
                            name="password"
                            register={register}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default LoginForm