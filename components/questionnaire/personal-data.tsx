"use client"

import {useState} from "react"
import {Card} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {ChevronRight, User} from "lucide-react"
import {saveUser} from "@/app/actions/saveUser"

export interface PersonalData {
    firstName: string
    lastName: string
    email: string
    phone: string
    age: number
    school: string
    year: string
}

interface PersonalDataProps {
    onComplete: (data: PersonalData) => void
    sessionId: string
}

export function PersonalDataForm({onComplete, sessionId}: PersonalDataProps) {
    const [data, setData] = useState<PersonalData>({
        firstName: "",
        lastName: "",
        age: 0,
        email: "",
        phone: "",
        school: "",
        year: "",
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (field: keyof PersonalData, value: string) => {
        setData((prev) => ({...prev, [field]: value}))
    }

    const isValid = data.firstName && data.lastName && data.email && data.phone && data.age && data.school && data.year

    const handleSubmit = async () => {
        if (isValid && !loading) {
            setLoading(true)
            try {
                const savedUser = await saveUser({
                    sessionId,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    age: data.age,
                    school: data.school,
                    schoolYear: data.year,
                    email: data.email,
                    phoneNumber: data.phone
                })

                // Save user ID to localStorage
                if (savedUser?.id) {
                    localStorage.setItem('userId', savedUser.id.toString())
                }

                onComplete(data)
            } catch (error) {
                console.error('Error saving user data:', error)
                // Optionally, show an error message to the user
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <div
            className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background px-4">
            <Card className="w-full max-w-md p-6 sm:p-8">
                <div className="space-y-6">
                    {/* Header */}
                    <div className="space-y-2 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <User className="h-6 w-6 text-primary"/>
                        </div>
                        <h2 className="text-xl font-bold text-foreground sm:text-2xl">Tus datos</h2>
                        <p className="text-sm text-muted-foreground">Completá tus datos para comenzar</p>
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1.5">
                                <Label htmlFor="firstName" className="text-sm">Nombre</Label>
                                <Input
                                    id="firstName"
                                    placeholder="Juan"
                                    value={data.firstName}
                                    onChange={(e) => handleChange("firstName", e.target.value)}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="lastName" className="text-sm">Apellido</Label>
                                <Input
                                    id="lastName"
                                    placeholder="Pérez"
                                    value={data.lastName}
                                    onChange={(e) => handleChange("lastName", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="email" className="text-sm">Correo electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="juan@ejemplo.com"
                                value={data.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="phone" className="text-sm">Teléfono</Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="+54 11 1234-5678"
                                value={data.phone}
                                onChange={(e) => handleChange("phone", e.target.value)}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="age" className="text-sm">Edad</Label>
                            <Input
                                id="age"
                                type="number"
                                placeholder="17"
                                min={14}
                                max={99}
                                value={data.age}
                                onChange={(e) => handleChange("age", e.target.value)}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="school" className="text-sm">Colegio</Label>
                            <Input
                                id="school"
                                placeholder="Nombre del colegio"
                                value={data.school}
                                onChange={(e) => handleChange("school", e.target.value)}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="year" className="text-sm">Año</Label>
                            <Select value={data.year} onValueChange={(value) => handleChange("year", value)}>
                                <SelectTrigger id="year">
                                    <SelectValue placeholder="Seleccionar año"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="4to">4to año</SelectItem>
                                    <SelectItem value="5to">5to año</SelectItem>
                                    <SelectItem value="6to">6to año</SelectItem>
                                    <SelectItem value="egresado">Egresado</SelectItem>
                                    <SelectItem value="otro">Otro</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Submit */}
                    <Button onClick={handleSubmit} disabled={!isValid || loading} className="w-full gap-2">
                        {loading ? "Guardando..." : "Continuar"}
                        <ChevronRight className="h-4 w-4"/>
                    </Button>
                </div>
            </Card>
        </div>
    )
}
