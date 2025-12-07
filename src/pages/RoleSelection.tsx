import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Stethoscope } from "lucide-react";

const RoleSelection = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background diagonal-lines">
            <div className="container mx-auto flex flex-col items-center justify-center p-6">
                <h1 className="mb-12 text-4xl font-semibold tracking-wide text-foreground">
                    Sign in as a...
                </h1>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
                    <Link to="/dashboard/patient">
                        <Card className="glass-card transform-gpu cursor-pointer p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-2 hover:ring-primary/50">
                            <CardHeader>
                                <User className="mx-auto h-16 w-16 text-primary" />
                                <CardTitle className="mt-4 text-2xl font-semibold">
                                    Patient
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Access your health records, book appointments, and consult with doctors.</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link to="/dashboard/doctor">
                        <Card className="glass-card transform-gpu cursor-pointer p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-2 hover:ring-accent/50">
                            <CardHeader>
                                <Stethoscope className="mx-auto h-16 w-16 text-accent" />
                                <CardTitle className="mt-4 text-2xl font-semibold">Doctor</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Manage your schedule, conduct consultations, and issue e-prescriptions.</p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RoleSelection;