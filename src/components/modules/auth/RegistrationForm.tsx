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
import { Link } from "react-router"
import PasswordField from "./PasswordField"
import { useForm } from "react-hook-form"
import type { RegistrationFormData } from "@/types"
import { useCreateUserMutation } from "@/redux/features/auth/authApi"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

const RegistrationForm = () => {
    const { register, handleSubmit } = useForm<RegistrationFormData>()

    const [createUser, { isLoading }] = useCreateUserMutation()


    const handleFormSubmit = async (data: RegistrationFormData) => {
        try {
            const registrationRes = await createUser(data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Sign up Parcel D.</CardTitle>
                <CardDescription>
                    We just need a few details to get you started.
                </CardDescription>
                <CardAction>
                    <Link to="/login">
                        <Button variant="link" className="cursor-pointer">
                            Login
                        </Button>
                    </Link>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                    <div className="flex flex-col gap-6">
                        <RadioGroup defaultValue="option-one">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="option-one" id="option-one" />
                                <Label htmlFor="option-one">Option One</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="option-two" id="option-two" />
                                <Label htmlFor="option-two">Option Two</Label>
                            </div>
                        </RadioGroup>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Ariyan Rahman Anas"
                                {...register("name", { required: true })}
                            />
                        </div>

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
                            showForgotPassword={false}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Creating account..." : "Registration"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default RegistrationForm